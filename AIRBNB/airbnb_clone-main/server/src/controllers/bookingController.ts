import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create Booking
export const createBooking = async (req: Request, res: Response) => {
  const { propertyId, startDate, endDate } = req.body;
  const userId = req.user.id;

  try {
    // Check if property exists
    const property = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) return res.status(404).json({ message: 'Property not found' });

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        propertyId,
        userId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
};

// Get User Bookings
export const getUserBookings = async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { property: true },
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

// Get All Bookings (Admin)
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { user: { select: { name, email } }, property: true },
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

// Delete Booking
export const deleteBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.userId !== userId) return res.status(403).json({ message: 'Unauthorized' });

    await prisma.booking.delete({ where: { id } });
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking' });
  }
};

