'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserIcon } from '@heroicons/react/20/solid'

import { Routes } from '@/lib/routes'
import { cn } from '@/lib/utils'
import {
  GithubIcon,
  MicrophoneIcon,
  MusicIcon,
  PlaylistIcon,
  SpotifyIcon,
  TimeIcon
} from '@/components/core/icons'

const items = [
  {
    href: Routes.HOME,
    icon: UserIcon,
    text: 'Profile'
  },
  {
    href: Routes.ARTISTS,
    icon: MicrophoneIcon,
    text: 'Top Artists'
  },
  {
    href: Routes.TRACKS,
    icon: MusicIcon,
    text: 'Top Tracks'
  },
  {
    href: Routes.RECENTLY_PLAYED,
    icon: TimeIcon,
    text: 'Recent'
  },
  {
    href: Routes.PLAYLISTS,
    icon: PlaylistIcon,
    text: 'Playlists'
  }
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 right-0 top-auto z-10 flex h-[70px] w-full flex-row items-center justify-between bg-black-200 text-center shadow-card md:left-0 md:top-0 md:min-h-[100vh] md:w-[100px] md:flex-col">
      <Link
        href={Routes.HOME}
        className="mt-[30px] hidden h-[50px] w-[50px] text-green-200 transition-all hover:text-green-100 focus:text-green-100 md:block"
      >
        <SpotifyIcon />
      </Link>

      <ul className="m-0 flex h-full w-full list-none flex-row items-end p-0 md:h-auto md:flex-col md:items-stretch">
        {items.map(item => (
          <li
            key={item.text}
            className="h-full grow basis-full text-[11px] text-gray-200 md:h-auto md:grow-0 md:basis-0"
          >
            <Link
              href={item.href}
              className={cn(
                'w-full h-full flex flex-col justify-center items-center text-gray-200 group transition-all p-0 border-[transparent] border-t-[3px] md:py-4 md:border-t-0 md:border-l-[5px] hover:text-white hover:bg-black-100 hover:border-green-100 focus:border-green-100 focus:bg-black-100 focus:text-white',
                {
                  'border-green-100 bg-black-100 text-white':
                    item.href === pathname
                }
              )}
            >
              <item.icon className="mb-[7px] h-5 w-5" />
              {item.text}
            </Link>
          </li>
        ))}
      </ul>

      <a
        href="https://github.com/george-swift"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-[30px] hidden h-11 w-11 text-gray-200 hover:text-[#509bf5] focus:text-[#509bf5] md:flex md:items-center md:justify-center"
      >
        <GithubIcon />
      </a>
    </nav>
  )
}
