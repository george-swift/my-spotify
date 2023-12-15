import { redirect } from 'next/navigation'

import { Routes } from '@/lib/routes'
import { getCurrentUser } from '@/lib/session'
import { getRecentlyPlayed } from '@/lib/spotify'
import { Track } from '@/components/ui/track'

export default async function RecentlyPlayed() {
  const user = await getCurrentUser()

  if (!user) redirect(Routes.LOGIN)

  const { items: recentlyPlayed } = await getRecentlyPlayed(
    user.accessToken
  ).then(res => res.json())

  return (
    <>
      <h2 className="text-2xl font-extrabold">Recently Played Tracks</h2>
      <div className="mt-10">
        {recentlyPlayed.map(({ track }) => (
          <Track key={track.id} {...track} />
        ))}
      </div>
    </>
  )
}
