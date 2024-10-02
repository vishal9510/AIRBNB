import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create Property
export const createProperty = async (req: Request, res: Response) => {
  const { title, description, price, location } = req.body;
  const userId = req.user.id;

  try {
    const property = await prisma.property.create({
      data: {
        title,
        description,
        price,
        location,
        ownerId: userId,
      },
    });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property' });
  }
};

// Get All Properties
export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const properties = await prisma.property.findMany({
      include: { owner: { select: { name,  } } },
    });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties' });
  }
};

// Get Property by ID
export const getPropertyById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: { owner: { select: { name,  } }, bookings: true },
    });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property' });
  }
};

// Update Property
export const updateProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, price, location } = req.body;
  const userId = req.user.id;
  const property = await prisma.property.

  try {
    // Check if property exists and belongs to user
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.ownerId !== userId) return res.status(403).json({ message: 'Unauthorized' });

    const updatedProperty = await prisma.property.update({
      where: { id },
      data: { title, description, price, location },
    });
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: 'Error updating property' });
  }
};

// Delete Property
export const deleteProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // Check if property exists and belongs to user
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.ownerId !== userId) return res.status(403).json({ message: 'Unauthorized' });

    await prisma.property.delete({ where: { id } });
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property' });
  }
};
