import type React from "react"
import { differenceInDays } from "date-fns"
import type { Event } from "./types"

interface TimelineEventsProps {
  events: Event[]
  centerDate: Date
  scale: number
  zoomLevelsScale: number
  onEventClick: (event: Event) => void
}

export function TimelineEvents({
  events,
  centerDate,
  scale,
  zoomLevelsScale,
  onEventClick,
}: TimelineEventsProps) {
  return (
    <>
      {events.map((event) => {
        const startDate = new Date(event.start_date)
        const endDate = new Date(event.end_date)
        const startPosition = differenceInDays(startDate, centerDate) * 100 * scale * zoomLevelsScale
        const duration = (differenceInDays(endDate, startDate) + 1) * 100 * scale * zoomLevelsScale

        const eventStyle: React.CSSProperties = {
          left: `calc(50% + ${startPosition}px)`,
          width: `${duration}px`,
          backgroundColor: event.color,
          top: event.zone === 0 ? "50%" : `${50 + event.zone * 5}%`,
          transform: event.zone === 0 ? "translateY(-50%)" : "none",
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

