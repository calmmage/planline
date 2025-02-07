import type { TimeUnit } from "@/components/timeline/types"

export interface ZoomLevel {
  scale: number
  unit: TimeUnit
}

export const ZOOM_LEVELS: ZoomLevel[] = [
  { scale: 0.0001, unit: "decade" },
  { scale: 0.001, unit: "year" },
  { scale: 0.003, unit: "quarter" },
  { scale: 0.01, unit: "month" },
  { scale: 0.1, unit: "week" },
  { scale: 1, unit: "day" },
]

export const DEFAULT_EVENT_TYPES = [
  { name: "Vacation", color: "#4CAF50" },
  { name: "Trip", color: "#2196F3" },
  { name: "Sick", color: "#F44336" },
  { name: "Guests", color: "#FFC107" },
  { name: "Event", color: "#9C27B0" },
]

// todo: rework to logarithmic scale
// MIN_SCALE = -4 -> 10^-4 = 0.0001
// MAX_SCALE = 0 -> 10^0 = 1
export const MIN_SCALE = 0.0001
export const MAX_SCALE = 1
export const DEFAULT_NUM_TICKS = 50

