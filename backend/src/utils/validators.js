import { z } from 'zod';

export const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  email: z.string().email('Invalid email address'),
  serviceInterest: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const callbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  category: z.string().min(2, 'Category is required'),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters'),
  fullDescription: z.string().min(20, 'Full description must be at least 20 characters'),
  location: z.string().optional(),
  isFeatured: z.boolean().optional(),
  displayOrder: z.number().optional(),
});

export const gallerySchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  projectId: z.string().uuid().optional(),
  displayOrder: z.number().optional(),
  isActive: z.boolean().optional(),
});
