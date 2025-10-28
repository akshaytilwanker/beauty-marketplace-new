const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Create booking
const createBooking = async (req, res) => {
  try {
    const { user_id, service_id, provider_id, booking_date, special_requests } = req.body;

    // Validate required fields
    if (!user_id || !service_id || !provider_id || !booking_date) {
      return res.status(400).json({
        error: 'Missing required fields: user_id, service_id, provider_id, booking_date'
      });
    }

    // Get service price
    const { data: service, error: serviceError } = await supabase
      .from('services')
      .select('price')
      .eq('id', service_id)
      .single();

    if (serviceError) {
      return res.status(400).json({
        error: 'Service not found'
      });
    }

    // Create booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert([
        {
          user_id,
          service_id,
          provider_id,
          booking_date: new Date(booking_date).toISOString(),
          amount: service.price,
          special_requests,
          status: 'pending'
        }
      ])
      .select(`
        *,
        services:service_id (
          name,
          duration,
          price
        ),
        providers:provider_id (
          business_name
        )
      `);

    if (error) {
      return res.status(400).json({
        error: 'Failed to create booking',
        details: error.message
      });
    }

    res.status(201).json({
      message: 'Booking created successfully',
      booking: booking[0]
    });

  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Get user bookings
const getUserBookings = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({
        error: 'user_id is required'
      });
    }

    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        *,
        services:service_id (
          name,
          category,
          duration,
          price
        ),
        providers:provider_id (
          business_name,
          business_type
        )
      `)
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({
        error: 'Failed to fetch bookings',
        details: error.message
      });
    }

    res.json({
      message: 'Bookings fetched successfully',
      bookings: bookings
    });

  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

module.exports = {
  createBooking,
  getUserBookings
};