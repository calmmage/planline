import { TIMELINE_ZONES } from "@/config/config"

interface TimelineZonesProps {
  className?: string
  timelineHeight: number // vh units
  events: Array<{ zone: number }>
}

export function TimelineZones({ className = "", timelineHeight, events }: TimelineZonesProps) {
  // Sort zones by position to ensure correct rendering order
  const sortedZones = [...TIMELINE_ZONES].sort((a, b) => b.position - a.position)
  
  // Split zones into above and below axis
  const aboveZones = sortedZones.filter(zone => zone.position > 0)
  const belowZones = sortedZones.filter(zone => zone.position < 0)

  // Calculate zone heights
  const calculateZoneHeights = (zones: typeof TIMELINE_ZONES) => {
    // For now, each zone gets equal weight of 1
    const totalWeight = zones.length
    // Reserve 5vh for top and bottom bars (2.5vh each)
    const availableHeight = (timelineHeight - 5) / 2 // Divide by 2 as we have above and below sections
    return zones.map(zone => ({
      ...zone,
      height: `${availableHeight / totalWeight}vh`
    }))
  }

  const aboveZonesWithHeight = calculateZoneHeights(aboveZones)
  const belowZonesWithHeight = calculateZoneHeights(belowZones)
  
  return (
    <div className={`absolute inset-x-0 ${className}`} style={{ top: '2.5rem', bottom: '2.5rem' }}>
      {/* Center line for reference */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-border/50" />
      
      {/* Above axis zones */}
      <div className="absolute left-0 right-0 bottom-1/2 flex flex-col-reverse">
        {aboveZonesWithHeight.map((zone) => (
          <div
            key={zone.id}
            className={`${zone.color} transition-colors duration-200 border-t border-border/20`}
            style={{ height: zone.height }}
          >
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <span className="text-xs text-gray-500 dark:text-gray-400 opacity-60 whitespace-nowrap">
                {zone.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Below axis zones */}
      <div className="absolute left-0 right-0 top-1/2 flex flex-col">
        {belowZonesWithHeight.map((zone) => (
          <div
            key={zone.id}
            className={`${zone.color} transition-colors duration-200 border-b border-border/20`}
            style={{ height: zone.height }}
          >
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <span className="text-xs text-gray-500 dark:text-gray-400 opacity-60 whitespace-nowrap">
                {zone.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 