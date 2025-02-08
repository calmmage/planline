import { TIMELINE_ZONES } from "@/config/config"

interface TimelineZonesProps {
  className?: string
}

export function TimelineZones({ className = "" }: TimelineZonesProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Zone background stripes */}
      <div className="absolute inset-0 flex flex-col">
        {TIMELINE_ZONES.map((zone) => (
          <div
            key={zone.id}
            className={`flex-1 ${zone.color} transition-colors duration-200`}
          />
        ))}
      </div>

      {/* Zone labels */}
      <div className="absolute left-2 inset-y-0 flex flex-col pointer-events-none">
        {TIMELINE_ZONES.map((zone) => (
          <div
            key={zone.id}
            className="flex-1 flex items-center"
          >
            <span className="text-xs text-gray-500 dark:text-gray-400 opacity-60">
              {zone.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 