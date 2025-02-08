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

export const TIMELINE_ZONES = [
  { id: 2, name: "Active (Trips)", color: "bg-blue-50/50 dark:bg-blue-950/30", position: 2 },
  { id: 1, name: "Passive+ (Guests)", color: "bg-green-50/50 dark:bg-green-950/30", position: 1 },
  { id: -1, name: "Passive- (Sick)", color: "bg-red-50/50 dark:bg-red-950/30", position: -1 },
  { id: -2, name: "Events", color: "bg-purple-50/50 dark:bg-purple-950/30", position: -2 },
]

