'use server'

import { addTracksToPlaylist, createPlaylist, getProfile } from '@/lib/spotify'

export async function createPlaylistAction({
  playlistName,
  recommendations,
  token
}) {
  try {
    const profile = await getProfile(token).then(res => res.json())
    const newPlaylist = await createPlaylist({
      userId: profile.id,
      playlistName,
      refresh_token: token
    }).then(res => res.json())

    const uris = recommendations.tracks.map(({ uri }) => uri).join(',')
    await addTracksToPlaylist({
      newPlaylistId: newPlaylist.id,
      uris,
      refresh_token: token
    })
    return { playlistId: newPlaylist.id, userId: profile.id }
  } catch {
    throw new Error('Failed to create playlist')
  }
}
