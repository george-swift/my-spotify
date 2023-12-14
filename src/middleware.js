import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

import { Routes } from '@/lib/routes'

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const { pathname, search } = req.nextUrl
    const isAuthPage = pathname.startsWith(Routes.LOGIN)

    if (isAuthPage) {
      if (Boolean(token)) {
        return NextResponse.redirect(new URL(Routes.HOME, req.url))
      }

      return null
    }

    if (!Boolean(token)) {
      let ref = pathname
      if (search) ref += search

      return NextResponse.redirect(
        new URL(
          `${Routes.LOGIN}${
            ref !== Routes.HOME ? `ref=${encodeURIComponent(ref)}` : ''
          }`,
          req.url
        )
      )
    }
  },
  {
    callbacks: {
      authorized: () => true
    }
  }
)
