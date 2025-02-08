import type React from "react"
import { differenceInDays } from "date-fns"
import type { Event } from "./types"
import { TIMELINE_ZONES } from "@/config/config"

interface TimelineEventsProps {
  events: Event[]
  centerDate: Date
  scale: number
  zoomLevelsScale: number
  onEventClick: (event: Event) => void
  timelineHeight: number
}

export function TimelineEvents({
  events,
  centerDate,
  scale,
  zoomLevelsScale,
  onEventClick,
  timelineHeight,
}: TimelineEventsProps) {
  // Calculate zone heights (same logic as in TimelineZones)
  const calculateZoneOffset = (zonePosition: number): number => {
    if (zonePosition === 0) return 50 // Legacy events at center
    
    const sortedZones = [...TIMELINE_ZONES].sort((a, b) => b.position - a.position)
    const aboveZones = sortedZones.filter(zone => zone.position > 0)
    const belowZones = sortedZones.filter(zone => zone.position < 0)
    
    const availableHeight = (timelineHeight - 5) / 2 // Same as in TimelineZones
    const zoneHeight = availableHeight / (zonePosition > 0 ? aboveZones.length : belowZones.length)
    
    if (zonePosition > 0) {
      const zonesAbove = aboveZones.filter(z => z.position > zonePosition).length
      return 50 - (zonesAbove * zoneHeight + zoneHeight / 2)
    } else {
      const zonesAbove = belowZones.filter(z => z.position < zonePosition).length
      return 50 + (zonesAbove * zoneHeight + zoneHeight / 2)
    }
  }

  return (
    <>
      {events.map((event) => {
        const startDate = new Date(event.start_date)
        const endDate = new Date(event.end_date)
        const startPosition = differenceInDays(startDate, centerDate) * 100 * scale * zoomLevelsScale
        const duration = (differenceInDays(endDate, startDate) + 1) * 100 * scale * zoomLevelsScale

        // Skip legacy events with zone 0
        if (event.zone === 0) return null

        const verticalPosition = calculateZoneOffset(event.zone)

        const eventStyle: React.CSSProperties = {
          left: `calc(50% + ${startPosition}px)`,
          width: `${duration}px`,
          backgroundColor: event.color,
          top: `${verticalPosition}%`,
          transform: 'translateY(-50%)',
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }

        if (event.is_crayon) {
          eventStyle.borderRadius = "8px"
          eventStyle.boxShadow = `0 0 0 4px var(--background), 0 0 0 6px ${event.color}`
          eventStyle.border = `2px solid ${event.color}`
        }

        return (
          <div
            key={event.id}
            className="absolute h-8 flex items-center justify-center text-xs text-white cursor-pointer"
            style={eventStyle}
            onClick={() => onEventClick(event)}
          >
            {event.name}
          </div>
        )
      })}
    </>
  )
}

