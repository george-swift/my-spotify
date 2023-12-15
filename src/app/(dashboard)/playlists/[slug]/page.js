import Image from 'next/image'
import Link from 'next/link'

import { Routes } from '@/lib/routes'
import { getCurrentUser } from '@/lib/session'
import { getPlaylist } from '@/lib/spotify'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/core/button'
import { Track } from '@/components/ui/track'

export default async function Playlist({ params: { slug } }) {
  const user = await getCurrentUser()

  if (!user) redirect(Routes.LOGIN)

  const playlist = await getPlaylist(slug, user.accessToken).then(res =>
    res.json()
  )

  const recommendationsPath = `${Routes.RECOMMENDATIONS}/${playlist.id}`

  return (
    <div className="block md:flex">
      <div className="w-full text-center md:w-[30%] md:min-w-[200px]">
        {!!playlist.images.length && (
          <div className="relative mx-auto mt-10 min-h-[300px] w-full max-w-[300px] md:mt-0">
            <Image
              src={playlist.images[0].url}
              alt="Playlist album art"
              fill
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        )}
        <h3 className="mt-5 text-[28px] font-bold">
          <a
            href={playlist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            {playlist.name}
          </a>
        </h3>
        <p className="text-sm text-gray-200">
          By {playlist.owner.display_name}
        </p>
        {playlist.description && (
          <p
            className="text-sm text-gray-200 [&_a]:border-b [&_a]:border-transparent [&_a]:text-white [&_a]:hover:border-white"
            dangerouslySetInnerHTML={{ __html: playlist.description }}
          />
        )}
        <p className="mt-5 text-sm text-white">
          {playlist.tracks.total} Tracks
        </p>
        <Link
          href={recommendationsPath}
          className={cn(
            buttonVariants({ variant: 'success', size: 'sm' }),
            'mt-5 text-[12px] tracking-[1px] px-6'
          )}
        >
          Get Recommendations
        </Link>
      </div>

      <div className="mt-[50px] grow md:ml-[50px] md:mt-0">
        {playlist.tracks.items.map(({ track }) => (
          <Track key={track.id} {...track} />
        ))}
      </div>
    </div>
  )
}
