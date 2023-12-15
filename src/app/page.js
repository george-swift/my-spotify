import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Routes } from '@/lib/routes'
import { getCurrentUser } from '@/lib/session'
import {
  getFollowedArtists,
  getPlaylists,
  getProfile,
  getTopArtists,
  getTopTracks
} from '@/lib/spotify'
import { Avatar } from '@/components/core/avatar'
import { Artist } from '@/components/ui/artist'
import { LogoutButton } from '@/components/ui/buttons'
import { Dashboard } from '@/components/ui/dashboard'
import { Stat } from '@/components/ui/stat'
import { Track } from '@/components/ui/track'

async function getProfileSummary(token) {
  const data = await Promise.all([
    getProfile(token),
    getFollowedArtists(token),
    getPlaylists(token),
    getTopArtists(token),
    getTopTracks(token)
  ]).then(responses => Promise.all(responses.map(response => response.json())))

  return data
}

export default async function Profile() {
  const user = await getCurrentUser()

  if (!user) redirect(Routes.LOGIN)

  const [profile, followed, playlists, topArtists, topTracks] =
    await getProfileSummary(user.accessToken)

  return (
    <Dashboard>
      <div className="min-h-screen w-full max-w-[1400px] overflow-auto px-6 py-[30px] md:h-full md:px-10 xl:px-[50px] 2xl:p-20">
        <header className="relative flex flex-col items-center justify-center gap-5 md:flex-row md:justify-normal">
          <Avatar
            src={profile.images[1]?.url ?? profile.images[0]?.url}
            alt="Profile picture"
          />

          <div className="flex flex-col items-center gap-2 text-center md:items-start md:gap-2.5 md:text-start">
            <div className="text-gray-200">
              <p className="mb-1 text-xs uppercase tracking-[1px] md:ml-1">
                Profile
              </p>
              <a
                href={profile.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-100 focus:text-green-100 md:flex-row"
              >
                <h1 className="text-[10vw] font-extrabold tracking-tight text-inherit md:text-[40px] lg:text-[50px] xl:text-6xl">
                  {profile.display_name}
                </h1>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-[30px] md:ml-1">
              <Stat count={profile.followers.total} label="Followers" />
              {!!followed && (
                <Stat count={followed.artists.items.length} label="Following" />
              )}
              {!!playlists && (
                <Link href={Routes.PLAYLISTS}>
                  <Stat count={playlists.total} label="Playlists" />
                </Link>
              )}
            </div>

            <LogoutButton />
          </div>
        </header>

        <div className="mt-14 flex flex-col gap-8">
          <section>
            <div className="mb-2.5 flex items-center justify-between">
              <h3 className="text-lg font-extrabold">Top Tracks of All Time</h3>
              <Link
                href={Routes.TRACKS}
                className="font-bold text-gray-200 hover:text-white hover:underline"
              >
                Show all
              </Link>
            </div>
            <div>
              {topTracks.items.slice(0, 5).map(track => (
                <Track key={track.id} {...track} />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-2.5 flex items-center justify-between">
              <h3 className="text-lg font-extrabold">
                Top Artists of All Time
              </h3>
              <Link
                href={Routes.ARTISTS}
                className="font-bold text-gray-200 hover:text-white hover:underline"
              >
                Show all
              </Link>
            </div>
            <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(150px,_165px))] gap-6 overflow-auto md:auto-rows-[0] md:grid-rows-[1fr]">
              {topArtists.items.slice(0, 5).map(artist => (
                <Artist key={artist.id} artist={artist} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </Dashboard>
  )
}
