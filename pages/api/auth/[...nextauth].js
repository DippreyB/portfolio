import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { signIn } from 'next-auth/react'
import connectDB from '../../../config/db'
import User from '../../../models/userModel'

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET
          })
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
        async jwt({token, account}) {
            if(account) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
            }
            return token
        },
        async session(session, user){
            session.user = user
            return session
        }
    },
   
})
