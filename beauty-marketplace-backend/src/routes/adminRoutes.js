const express = require('express');
const router = express.Router();
const {
  getProviders,
  updateProviderStatus,
  getUsers,
  getAnalytics
} = require('../controllers/adminController');

// Admin routes
router.get('/providers', getProviders);
router.put('/providers/:id/status', updateProviderStatus);
router.get('/users', getUsers);
router.get('/analytics', getAnalytics);

module.exports = router;