// backend/src/routes/propertyRoutes.ts
import express from 'express';
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Public Routes
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

// Protected Routes
router.post('/', authenticate, createProperty);
router.put('/:id', authenticate, updateProperty);
router.delete('/:id', authenticate, deleteProperty);

export default router;
