    import { User, Service, Booking, Review, ServiceCategory } from '@prisma/client';

    export type UserWithRole = User & {
    role: 'CLIENT' | 'PROVIDER' | 'ADMIN';
    };

    export type ServiceWithDetails = Service & {
    provider: User;
    category: ServiceCategory;
    _count: {
        reviews: number;
        bookings: number;
    };
    reviews?: Review[];
    averageRating?: number;
    };

    export type BookingWithDetails = Booking & {
    client: User;
    service: ServiceWithDetails;
    review?: Review;
    };

    export type ReviewWithDetails = Review & {
    client: User;
    service: Service;
    };

    export type CategoryWithCount = ServiceCategory & {
    _count: {
        services: number;
    };
    };

    export type BookingStats = {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
    completed: number;
    cancelled: number;
    };

    export type AnalyticsData = {
    totalUsers: number;
    totalServices: number;
    totalBookings: number;
    totalRevenue: number;
    recentBookings: number;
    pendingBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    topCategories: {
        name: string;
        count: number;
    }[];
    topProviders: {
        name: string;
        bookings: number;
        revenue: number;
    }[];
    };