export function Stat({ count, label }) {
  return (
    <div className="flex items-center gap-x-1">
      <span className="text-[18px] font-bold text-green-200">
        {count ?? '--'}
      </span>
      <span className="mt-0.5 text-xs uppercase tracking-[1px] text-gray-200">
        {label}
      </span>
    </div>
  )
}
