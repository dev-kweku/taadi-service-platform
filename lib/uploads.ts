    import { put } from '@vercel/blob';
    import { NextRequest } from 'next/server';

    export async function uploadImage(file: File, folder: string = 'uploads'): Promise<string> {
    try {
        const blob = await put(`${folder}/${Date.now()}-${file.name}`, file, {
        access: 'public',
        });

        return blob.url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image');
    }
    }

    export async function deleteImage(url: string): Promise<void> {
    try {
        // Extract blob ID from URL
        const blobId = url.split('/').pop()?.split('?')[0];
        if (!blobId) throw new Error('Invalid image URL');

        await fetch(`https://vercel.com/api/v2/blob/delete/${blobId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${process.env.VERCEL_BLOB_READ_WRITE_TOKEN}`,
        },
        });
    } catch (error) {
        console.error('Error deleting image:', error);
        throw new Error('Failed to delete image');
    }
    }

    export function validateImage(file: File): { isValid: boolean; error?: string } {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
        return { isValid: false, error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' };
    }

    if (file.size > maxSize) {
        return { isValid: false, error: 'File size exceeds 5MB limit.' };
    }

    return { isValid: true };
    }