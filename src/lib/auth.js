import SpotifyProvider from 'next-auth/providers/spotify'

import { env } from '@/env.mjs'

import { Routes } from './routes'
import { scope } from './spotify'

export const authOptions = {
  pages: {
    signIn: Routes.LOGIN
  },
  providers: [
    SpotifyProvider({
      authorization: `${env.SPOTIFY_ACCOUNT_URL}/authorize?scope=${scope}`,
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET
    })
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        token.accessToken = account.refresh_token
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = { ...token }
      }
      return session
    }
  }
}
