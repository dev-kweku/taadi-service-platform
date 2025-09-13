    import { z } from 'zod';
    import { UserRole, BookingStatus } from '@prisma/client';

    // User validations
    export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.nativeEnum(UserRole).default(UserRole.CLIENT),
    });

    export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    });

    // Service validations
    export const createServiceSchema = z.object({
    name: z.string().min(2, 'Service name must be at least 2 characters'),
    description: z.string().optional(),
    price: z.number().positive('Price must be a positive number'),
    duration: z.number().int().positive('Duration must be a positive integer'),
    categoryId: z.string().min(1, 'Category is required'),
    });

    export const updateServiceSchema = createServiceSchema.partial().extend({
    id: z.string().min(1, 'Service ID is required'),
    });

    // Booking validations
    export const createBookingSchema = z.object({
    serviceId: z.string().min(1, 'Service ID is required'),
    startTime: z.date(),
    notes: z.string().optional(),
    address: z.string().min(1, 'Address is required'),
    });

    export const updateBookingSchema = z.object({
    status: z.nativeEnum(BookingStatus),
    });

    // Review validations
    export const createReviewSchema = z.object({
    bookingId: z.string().min(1, 'Booking ID is required'),
    serviceId: z.string().min(1, 'Service ID is required'),
    rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
    comment: z.string().optional(),
    });

    // Category validations
    export const createCategorySchema = z.object({
    name: z.string().min(2, 'Category name must be at least 2 characters'),
    description: z.string().optional(),
    icon: z.string().optional(),
    });

    export const updateCategorySchema = createCategorySchema.partial().extend({
    id: z.string().min(1, 'Category ID is required'),
    });