import Image from 'next/image'
import Link from 'next/link'

import { Routes } from '@/lib/routes'
import { InformationIcon } from '@/components/core/icons'

export function Track({ id, album, name, artists, duration_ms }) {
  const duration = new Date(duration_ms ?? 0).toISOString().substr(14, 5)
  const path = `${Routes.TRACK}/${id}`

  return (
    <Link
      href={path}
      className="group mb-5 grid grid-cols-[auto,_1fr] items-center md:mb-[30px]"
    >
      <div className="relative mr-5 w-[50px]">
        {!!album.images.length && (
          <Image
            src={album.images[2].url}
            alt="Album Artwork"
            width={50}
            height={50}
          />
        )}
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-[rgba(0,_0,_0,_0.5)] text-white opacity-0 transition-all group-hover:opacity-100">
          <InformationIcon className="w-[25px]" />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_max-content] gap-2.5">
        <div className="truncate pr-px">
          {name && (
            <div className="mb-[5px] w-fit border-b border-transparent group-hover:border-white group-focus:border-white">
              {name}
            </div>
          )}
          {artists && album && (
            <div className="mt-[3px] truncate pr-px text-sm text-gray-200">
              {artists.map((artist, i) => (
                <span key={artist.id}>
                  {artist.name}
                  {!!artists.length && i === artists.length - 1 ? '' : ','}
                  &nbsp;
                </span>
              ))}
              &nbsp;&middot;&nbsp;&nbsp;
              {album.name}
            </div>
          )}
        </div>
        <div className="text-sm text-gray-200">{duration}</div>
      </div>
    </Link>
  )
}
