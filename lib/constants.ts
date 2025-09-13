    export const BOOKING_STATUSES = {
        PENDING: 'pending',
        ACCEPTED: 'accepted',
        REJECTED: 'rejected',
        COMPLETED: 'completed',
        CANCELLED: 'cancelled',
    } as const;
    
    export const USER_ROLES = {
        CLIENT: 'client',
        PROVIDER: 'provider',
        ADMIN: 'admin',
    } as const;
    
    export const SERVICE_CATEGORIES = [
        { id: 'plumbing', name: 'Plumbing', icon: 'wrench' },
        { id: 'electrical', name: 'Electrical', icon: 'zap' },
        { id: 'carpentry', name: 'Carpentry', icon: 'hammer' },
        { id: 'cleaning', name: 'Cleaning', icon: 'sparkles' },
        { id: 'gardening', name: 'Gardening', icon: 'tree-pine' },
        { id: 'painting', name: 'Painting', icon: 'paint-bucket' },
        { id: 'appliance-repair', name: 'Appliance Repair', icon: 'settings' },
        { id: 'moving', name: 'Moving', icon: 'truck' },
        { id: 'tutoring', name: 'Tutoring', icon: 'graduation-cap' },
        { id: 'personal-training', name: 'Personal Training', icon: 'dumbbell' },
    ] as const;