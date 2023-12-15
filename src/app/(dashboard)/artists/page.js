'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Routes } from '@/lib/routes'
import { EntityEnums } from '@/lib/utils'
import { useRangeFilter } from '@/hooks/use-range-filter'
import { InformationIcon } from '@/components/core/icons'
import { Filters } from '@/components/ui/filters'
import { Loader } from '@/components/ui/loader'

export default function Artists() {
  const { items, range, setFilter, isLoading } = useRangeFilter({
    type: EntityEnums.ARTISTS
  })

  return (
    <>
      <header className="relative flex flex-col items-center justify-between gap-5 md:flex-row">
        <h2 className="text-2xl font-extrabold">Top Artists</h2>
        <Filters range={range} setFilter={setFilter} />
      </header>

      <div className="mt-10 grid grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] gap-5 md:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
        {isLoading ? (
          <Loader />
        ) : (
          items.map(item => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center"
            >
              <Link
                href={`${Routes.ARTIST}/${item.id}`}
                className="group relative h-[120px] w-[120px] md:h-[150px] md:w-[150px] lg:h-[200px] lg:w-[200px]"
              >
                {!!item.images.length && (
                  <Image
                    src={item.images[1].url}
                    alt="Artist's photo"
                    fill
                    className="rounded-full"
                  />
                )}
                <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-full bg-[rgba(0,_0,_0,_0.5)] text-white opacity-0 transition-all group-hover:opacity-100">
                  <InformationIcon className="w-[25px]" />
                </div>
              </Link>
              <a
                href={item.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 border-b border-transparent hover:border-white focus:border-white"
              >
                {item.name}
              </a>
            </div>
          ))
        )}
      </div>
    </>
  )
}
