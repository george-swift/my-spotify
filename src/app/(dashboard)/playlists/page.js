import { redirect } from 'next/navigation'

import { Routes } from '@/lib/routes'
import { getCurrentUser } from '@/lib/session'
import { getPlaylists } from '@/lib/spotify'
import { Playlist } from '@/components/ui/playlist'

export default async function Playlists() {
  const user = await getCurrentUser()

  if (!user) redirect(Routes.LOGIN)

  const { items: playlists } = await getPlaylists(user.accessToken).then(res =>
    res.json()
  )

  return (
    <>
      <h2 className="text-2xl font-extrabold">Your Playlists</h2>
      <div className="mt-10 grid grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] gap-5 md:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
        {playlists.map(playlist => (
          <Playlist key={playlist.id} {...playlist} />
        ))}
      </div>
    </>
  )
}
