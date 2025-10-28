const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Enhanced User Registration with role-based logic
const registerUser = async (req, res) => {
  try {
    const { email, password, full_name, phone, role = 'customer' } = req.body;

    console.log('Registration attempt:', { email, role });

    // Validate input
    if (!email || !password || !full_name) {
      return res.status(400).json({
        error: 'Missing required fields: email, password, full_name'
      });
    }

    // Validate role
    if (!['customer', 'provider'].includes(role)) {
      return res.status(400).json({
        error: 'Invalid role. Must be customer or provider'
      });
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          phone,
          role
        }
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      return res.status(400).json({
        error: 'Registration failed',
        details: authError.message
      });
    }

    // Create user profile in our users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          auth_id: authData.user.id,
          email: authData.user.email,
          full_name,
          phone,
          role
        }
      ])
      .select();

    if (userError) {
      console.error('User profile error:', userError);
      return res.status(400).json({
        error: 'User profile creation failed',
        details: userError.message
      });
    }

    // If provider, create basic provider profile
    if (role === 'provider') {
      const { error: providerError } = await supabase
        .from('providers')
        .insert([
          {
            user_id: userData[0].id,
            business_name: `${full_name}'s Business`,
            status: 'pending', // Will require subscription later
            services_offered: []
          }
        ]);

      if (providerError) {
        console.error('Provider profile error:', providerError);
        // Don't fail registration if provider profile fails
        console.log('Provider profile creation failed, but user was created');
      }
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: userData[0].id,
        email: userData[0].email,
        full_name: userData[0].full_name,
        role: userData[0].role
      },
      redirectTo: role === 'provider' ? '/provider/setup' : '/dashboard'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({
        error: 'Login failed',
        details: error.message
      });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: data.user.id,
        email: data.user.email,
        role: data.user.user_metadata?.role || 'customer'
      },
      session: data.session
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return res.status(401).json({
        error: 'Unauthorized'
      });
    }

    // Get user profile from our users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', user.id)
      .single();

    if (userError) {
      return res.status(404).json({
        error: 'User profile not found'
      });
    }

    res.json({
      user: userData
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};