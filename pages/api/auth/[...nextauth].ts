import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { adminDb } from '../../../firebase.config';

export const authOptions: NextAuthOptions  = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,            
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        })
        // ADD MORE PROVIDERS
    ],
    adapter: FirestoreAdapter(adminDb),
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    session: {
        strategy: "jwt"
    },
    debug: true,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    callbacks: {
        async session({session, user, token}) {
            if(typeof session.user !== 'undefined'){
                session.user.sub = token.sub;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        }
    }
}

export default NextAuth(authOptions);