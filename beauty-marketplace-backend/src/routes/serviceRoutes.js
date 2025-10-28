const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  createService,
  updateService
} = require('../controllers/serviceController');

// Public routes
router.get('/', getAllServices);
router.get('/:id', getServiceById);

// Protected routes (will add auth middleware later)
router.post('/', createService);
router.put('/:id', updateService);

module.exports = router;