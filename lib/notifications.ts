    import { pusher } from './pusher';
    import { prisma } from './prisma';

    export interface NotificationData {
    id: string;
    type: 'BOOKING_REQUEST' | 'BOOKING_ACCEPTED' | 'BOOKING_REJECTED' | 'BOOKING_CANCELLED' | 'NEW_REVIEW';
    message: string;
    data: unknown;
    userId: string;
    }

    export async function sendNotification(data: NotificationData) {
    try {
        // Save notification to database
        await prisma.notification.create({
        data: {
            id: data.id,
            type: data.type,
            message: data.message,
            data: data.data,
            userId: data.userId,
            read: false,
        },
        });

        // Send real-time notification
        await pusher.trigger(`user-${data.userId}`, 'notification', {
        id: data.id,
        type: data.type,
        message: data.message,
        data: data.data,
        createdAt: new Date().toISOString(),
        read: false,
        });

        return true;
    } catch (error) {
        console.error('Error sending notification:', error);
        return false;
    }
    }

    export async function markNotificationAsRead(notificationId: string, userId: string) {
    try {
        await prisma.notification.updateMany({
        where: {
            id: notificationId,
            userId,
        },
        data: {
            read: true,
        },
        });

        return true;
    } catch (error) {
        console.error('Error marking notification as read:', error);
        return false;
    }
    }

    export async function markAllNotificationsAsRead(userId: string) {
    try {
        await prisma.notification.updateMany({
        where: {
            userId,
            read: false,
        },
        data: {
            read: true,
        },
        });

        return true;
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        return false;
    }
    }