    import { type ClassValue, clsx } from 'clsx';
    import { twMerge } from 'tailwind-merge';

    export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
    }

    export function formatApiResponse(
    data: unknown,
    message: string = 'Success',
    status: number = 200
    ) {
    return new Response(JSON.stringify({ data, message }), {
        status,
        headers: {
        'Content-Type': 'application/json',
        },
    });
    }

    export function formatApiError(
    error: string,
    status: number = 400,
    details?: unknown
    ) {
    return new Response(JSON.stringify({ error, details }), {
        status,
        headers: {
        'Content-Type': 'application/json',
        },
    });
    }

    export async function handleApiError(error: unknown) {
    console.error('API Error:', error);
    
    if (error instanceof Error) {
        return formatApiError(error.message, 500);
    }
    
    if (typeof error === 'string') {
        return formatApiError(error, 500);
    }
    
    return formatApiError('An unknown error occurred', 500);
    }

    export function getPaginationParams(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    return { page, limit, skip };
    }

    export function createPaginationResponse<T>(
    data: T[],
    total: number,
    page: number,
    limit: number
    ) {
    const totalPages = Math.ceil(total / limit);
    
    return {
        data,
        pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
        },
    };
    }