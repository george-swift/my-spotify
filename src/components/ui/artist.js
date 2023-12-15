import Link from 'next/link'

import { Routes } from '@/lib/routes'

import { Avatar } from '../core/avatar'

export function Artist({ artist }) {
  const path = `${Routes.ARTIST}/${artist.id}`

  return (
    <Link
      href={path}
      className="isolate flex h-full w-full flex-1 select-none flex-col gap-2.5 rounded-md bg-[#282828] p-2 transition-colors hover:bg-[#242424] md:p-4"
    >
      <Avatar
        src={artist.images[2]?.url}
        alt="Artist's picture"
        width={125}
        height={125}
        imageClasses="shadow-md"
        wrapperClasses="mx-auto"
      />
      <div>
        <p className="mb-1 font-bold">{artist.name}</p>
        <p className="text-xs uppercase tracking-[1px] text-gray-200">
          Profile
        </p>
      </div>
    </Link>
  )
}
