'use client'

import { EntityEnums } from '@/lib/utils'
import { useRangeFilter } from '@/hooks/use-range-filter'
import { Filters } from '@/components/ui/filters'
import { Loader } from '@/components/ui/loader'
import { Track } from '@/components/ui/track'

export default function Tracks() {
  const { items, range, setFilter, isLoading } = useRangeFilter({
    type: EntityEnums.TRACKS
  })

  return (
    <>
      <header className="relative flex flex-col items-center justify-between gap-5 md:flex-row">
        <h2 className="text-2xl font-extrabold">Top Tracks</h2>
        <Filters range={range} setFilter={setFilter} />
      </header>

      <div className="mt-10">
        {isLoading ? (
          <Loader />
        ) : (
          items.map(track => <Track key={track.id} {...track} />)
        )}
      </div>
    </>
  )
}
