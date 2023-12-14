import { Routes } from '@/lib/routes'
import { getCurrentUser } from '@/lib/session'
import { getTopTracks } from '@/lib/spotify'

export async function GET(request) {
  const user = await getCurrentUser()

  if (!user) redirect(Routes.LOGIN)

  const { searchParams } = request.nextUrl
  const time_range = searchParams.get('time_range')
  const data = await getTopTracks(user.accessToken, time_range).then(res =>
    res.json()
  )

  return Response.json(data.items)
}
