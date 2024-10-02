// backend/src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from '../server/src/routes/authRoutes.ts';
import propertyRoutes from '../server/src/routes/propertyRoutes.ts';
import bookingRoutes from '../server/src/routes/bookingRoutes.ts';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);

// Error Handling Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;
