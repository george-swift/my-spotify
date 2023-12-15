import Link from 'next/link'

import { Routes } from '@/lib/routes'
import { getCurrentUser } from '@/lib/session'
import { getPlaylist, getRecommendations } from '@/lib/spotify'
import { RecommendedPlaylistButton } from '@/components/ui/buttons'
import { Track } from '@/components/ui/track'

import { createPlaylistAction } from '../actions'

export default async function Recommendations({ params: { slug } }) {
  const user = await getCurrentUser()

  if (!user) redirect(Routes.LOGIN)

  const token = user.accessToken

  const playlist = await getPlaylist(slug, token).then(res => res.json())

  const topFourTrackIds = playlist.tracks.items
    .slice(0, 4)
    .map(({ track }) => track.id)

  const recommendations = await getRecommendations(topFourTrackIds, token).then(
    res => res.json()
  )

  const createPlaylist = createPlaylistAction.bind(null, {
    playlistName: playlist.name,
    recommendations,
    token
  })

  return (
    <>
      <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between">
        <h2 className="text-2xl font-extrabold">
          Recommended Tracks Based On{' '}
          <Link
            href={`${Routes.PLAYLISTS}/${playlist.id}`}
            className="text-green-100"
          >
            Current Playlist
          </Link>
        </h2>

        <RecommendedPlaylistButton createPlaylist={createPlaylist} />
      </div>

      <div className="mt-[50px]">
        {recommendations?.tracks.map(track => (
          <Track key={track.id} {...track} />
        ))}
      </div>
    </>
  )
}
