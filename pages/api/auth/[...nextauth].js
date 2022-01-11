import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import GoogleProvider from 'next-auth/providers/google'
import { signIn } from 'next-auth/react'


export default NextAuth({
    providers: [
        SpotifyProvider({
            authorization: {params: {scope:'user-read-email playlist-modify-public playlist-modify-private'}},
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET
          }),
          GoogleProvider({
              clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
              clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET
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
