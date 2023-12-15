import { useCallback, useEffect, useState } from 'react'

import { RangeEnums } from '@/lib/utils'

export function useRangeFilter({ type }) {
  const [items, setItems] = useState([])
  const [range, setRange] = useState(RangeEnums.LONG)
  const [isLoading, setIsLoading] = useState(false)

  const setFilter = useCallback(range => _ => setRange(range), [])

  useEffect(() => {
    const getFilteredResults = async () => {
      setIsLoading(true)
      setItems([])
      try {
        const data = await fetch(`/api/${type}?time_range=${range}`).then(res =>
          res.json()
        )
        setItems(_ => data)
      } catch {
      } finally {
        setIsLoading(false)
      }
    }

    getFilteredResults()
  }, [type, range])

  return {
    items,
    range,
    setFilter,
    isLoading
  }
}
