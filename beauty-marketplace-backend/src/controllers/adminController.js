const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Get all providers for admin approval
const getProviders = async (req, res) => {
  try {
    const { data: providers, error } = await supabase
      .from('providers')
      .select(`
        *,
        users:user_id (
          email,
          full_name,
          phone,
          created_at
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      message: 'Providers fetched successfully',
      providers: providers,
      count: providers.length
    });

  } catch (error) {
    console.error('Get providers error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
};

// Approve/Reject provider
const updateProviderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        error: 'Invalid status. Must be pending, approved, or rejected'
      });
    }

    const { data: provider, error } = await supabase
      .from('providers')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json({
      message: `Provider ${status} successfully`,
      provider: provider[0]
    });

  } catch (error) {
    console.error('Update provider status error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
};

// Get all users for admin
const getUsers = async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      message: 'Users fetched successfully',
      users: users,
      count: users.length
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
};

// Get platform analytics
const getAnalytics = async (req, res) => {
  try {
    const { count: usersCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    const { count: providersCount } = await supabase
      .from('providers')
      .select('*', { count: 'exact', head: true });

    const { count: bookingsCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true });

    const { data: revenueData } = await supabase
      .from('bookings')
      .select('amount');

    const totalRevenue = revenueData?.reduce((sum, booking) => sum + parseFloat(booking.amount), 0) || 0;

    res.json({
      message: 'Analytics fetched successfully',
      analytics: {
        totalUsers: usersCount,
        totalProviders: providersCount,
        totalBookings: bookingsCount,
        totalRevenue: totalRevenue
      }
    });

  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
};

module.exports = {
  getProviders,
  updateProviderStatus,
  getUsers,
  getAnalytics
};