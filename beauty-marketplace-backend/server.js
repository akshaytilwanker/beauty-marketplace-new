// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(morgan('combined'));
app.use(express.json());

// Import routes
const userRoutes = require('./src/routes/userRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

console.log('✅ All routes mounted');

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Beauty Marketplace Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

    const { data, error } = await supabase.from('users').select('count');

    if (error) {
      return res.status(500).json({
        status: 'Database Error',
        error: error.message
      });
    }

    res.json({
      status: 'Database Connected!',
      message: 'Supabase connection successful',
      data: data
    });
  } catch (error) {
    res.status(500).json({
      status: 'Connection Failed',
      error: error.message
    });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Beauty Marketplace API',
    version: '1.0.0',
    endpoints: {
      users: {
        register: 'POST /api/users/register',
        login: 'POST /api/users/login',
        profile: 'GET /api/users/profile'
      },
      services: {
        list: 'GET /api/services',
        get: 'GET /api/services/:id'
      },
      bookings: {
        create: 'POST /api/bookings',
        list: 'GET /api/bookings'
      },
      admin: {
        providers: 'GET /api/admin/providers',
        analytics: 'GET /api/admin/analytics'
      },
      health: 'GET /health',
      test_db: 'GET /test-db'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎯 Backend Server started on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`👤 User API: http://localhost:${PORT}/api/users`);
  console.log(`💅 Services API: http://localhost:${PORT}/api/services`);
  console.log(`📅 Bookings API: http://localhost:${PORT}/api/bookings`);
  console.log(`👨‍💼 Admin API: http://localhost:${PORT}/api/admin`);
  console.log(`📚 API Docs: http://localhost:${PORT}/`);
});