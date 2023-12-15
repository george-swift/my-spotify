import { cn, RangeEnums } from '@/lib/utils'
import { Button } from '@/components/core/button'

export function Filters({ range, setFilter }) {
  return (
    <div className="mt-[30px] flex justify-around md:mt-0 md:justify-normal">
      <Button
        size="sm"
        variant="transparent"
        className={cn('text-sm md:text-base', {
          'text-gray-200': range === RangeEnums.LONG
        })}
        onClick={setFilter(RangeEnums.LONG)}
      >
        <span
          className={cn(
            'whitespace-nowrap pb-0.5 border-b border-transparent',
            { 'border-white': range === RangeEnums.LONG }
          )}
        >
          All Time
        </span>
      </Button>

      <Button
        size="sm"
        variant="transparent"
        className={cn('text-sm md:text-base', {
          'text-gray-200': range === RangeEnums.MEDIUM
        })}
        onClick={setFilter(RangeEnums.MEDIUM)}
      >
        <span
          className={cn(
            'whitespace-nowrap pb-0.5 border-b border-transparent',
            { 'border-white': range === RangeEnums.MEDIUM }
          )}
        >
          Last 6 months
        </span>
      </Button>

      <Button
        size="sm"
        variant="transparent"
        className={cn('text-sm md:text-base', {
          'text-gray-200': range === RangeEnums.SHORT
        })}
        onClick={setFilter(RangeEnums.SHORT)}
      >
        <span
          className={cn(
            'whitespace-nowrap pb-0.5 border-b border-transparent',
            { 'border-white': range === RangeEnums.SHORT }
          )}
        >
          Last 4 weeks
        </span>
      </Button>
    </div>
  )
}
