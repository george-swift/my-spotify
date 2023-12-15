import { Routes } from '@/lib/routes'
import { getCurrentUser } from '@/lib/session'
import { getIsFollowingPlaylist } from '@/lib/spotify'

export async function GET(request) {
  const user = await getCurrentUser()

  if (!user) redirect(Routes.LOGIN)

  const { searchParams } = request.nextUrl
  const playlistId = searchParams.get('playlistId')
  const userId = searchParams.get('userId')
  const data = await getIsFollowingPlaylist({
    playlistId,
    userId,
    refresh_token: user.accessToken
  }).then(res => res.json())

  return Response.json(data)
}
