import Image from 'next/image'
import Link from 'next/link'

import { Routes } from '@/lib/routes'
import { MusicIcon } from '@/components/core/icons'

export function Playlist({ id, images, name, tracks }) {
  const path = `${Routes.PLAYLISTS}/${id}`

  return (
    <div className="flex flex-col text-center">
      <Link
        href={path}
        className="group relative mb-5 min-h-[200px] w-full shadow-card lg:min-h-[232px]"
      >
        {images.length ? (
          <Image
            src={images[0].url}
            alt="Album Art"
            fill
            sizes="(max-width: 768px) 100vw, 300px"
          />
        ) : (
          <div className="relative flex w-full items-center justify-center bg-gray-400 pb-[100%]">
            <div className="absolute inset-0 flex items-center justify-center">
              <MusicIcon />
            </div>
          </div>
        )}
        <div className="absolute inset-0 h-full w-full bg-[rgba(0,_0,_0,_0.5)] text-[30px] opacity-0 transition-all group-hover:opacity-100" />
      </Link>

      <Link
        href={path}
        className="mx-auto w-fit border-b border-transparent hover:border-white focus:border-white"
      >
        {name}
      </Link>
      <div className="my-1.5 text-[12px] uppercase tracking-[1px] text-gray-200">
        {tracks.total} Tracks
      </div>
    </div>
  )
}
