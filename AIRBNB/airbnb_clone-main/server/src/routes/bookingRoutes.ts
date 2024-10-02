// backend/src/routes/bookingRoutes.ts
import express from 'express';
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  deleteBooking,
} from '../controllers/bookingController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Protected Routes
router.post('/', authenticate, createBooking);
router.get('/user', authenticate, getUserBookings);
router.get('/', authenticate, getAllBookings); // Ideally, restrict to admin
router.delete('/:id', authenticate, deleteBooking);

export default router;
