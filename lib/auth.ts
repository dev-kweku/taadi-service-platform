    
    import NextAuth, { DefaultSession, type NextAuthOptions, type Session, type User } from 'next-auth';
    import CredentialsProvider from 'next-auth/providers/credentials';
    import { PrismaAdapter } from '@next-auth/prisma-adapter';
    import { prisma } from './prisma';
    import bcrypt from 'bcryptjs';
    import type { JWT } from 'next-auth/jwt';

    // Extend built-in types to include custom properties
    declare module 'next-auth' {
    interface User {
        role?: string;
    }
    
    interface Session {
        user: {
        id: string;
        role?: string;
        } & DefaultSession['user'];
    }
    }

    declare module 'next-auth/jwt' {
    interface JWT {
        role?: string;
    }
    }

    interface Credentials {
    email?: string;
    password?: string;
    }

    export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
        name: 'credentials',
        credentials: {
            email: { label: 'Email', type: 'email' },
            password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials: Credentials | undefined) {
            if (!credentials?.email || !credentials?.password) {
            return null;
            }

            const user = await prisma.user.findUnique({
            where: {
                email: credentials.email,
            },
            });

            if (!user || !user.password) {
            return null;
            }

            const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
            );

            if (!isPasswordValid) {
            return null;
            }

            return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            };
        },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
        if (user?.role) {
            token.role = user.role;
        }
        return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
        if (token.sub) {
            session.user.id = token.sub;
        }
        if (token.role) {
            session.user.role = token.role;
        }
        return session;
        },
    },
    pages: {
        signIn: '/login',
        newUser: '/register',
    },
    };

    export default NextAuth(authOptions);