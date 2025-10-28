const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Get all services
const getAllServices = async (req, res) => {
  try {
    const { category, provider_id } = req.query;
    
    let query = supabase
      .from('services')
      .select(`
        *,
        providers:provider_id (
          business_name,
          business_type,
          address
        )
      `)
      .eq('is_active', true);

    // Apply filters if provided
    if (category) {
      query = query.eq('category', category);
    }
    
    if (provider_id) {
      query = query.eq('provider_id', provider_id);
    }

    const { data: services, error } = await query;

    if (error) {
      return res.status(400).json({
        error: 'Failed to fetch services',
        details: error.message
      });
    }

    res.json({
      message: 'Services fetched successfully',
      services: services,
      count: services.length
    });

  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
};

// Get single service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: service, error } = await supabase
      .from('services')
      .select(`
        *,
        providers:provider_id (
          business_name,
          business_type,
          address,
          amenities
        )
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      return res.status(404).json({
        error: 'Service not found',
        details: error.message
      });
    }

    res.json({
      message: 'Service fetched successfully',
      service: service
    });

  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Create new service (for providers)
const createService = async (req, res) => {
  try {
    const { name, category, description, price, duration, image_url, provider_id } = req.body;

    // Validate required fields
    if (!name || !category || !price || !provider_id) {
      return res.status(400).json({
        error: 'Missing required fields: name, category, price, provider_id'
      });
    }

    const { data: service, error } = await supabase
      .from('services')
      .insert([
        {
          name,
          category,
          description,
          price: parseFloat(price),
          duration: duration ? parseInt(duration) : null,
          image_url,
          provider_id,
          is_active: true
        }
      ])
      .select(`
        *,
        providers:provider_id (
          business_name
        )
      `);

    if (error) {
      return res.status(400).json({
        error: 'Failed to create service',
        details: error.message
      });
    }

    res.status(201).json({
      message: 'Service created successfully',
      service: service[0]
    });

  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
};

// Update service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data: service, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({
        error: 'Failed to update service',
        details: error.message
      });
    }

    res.json({
      message: 'Service updated successfully',
      service: service[0]
    });

  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService
};