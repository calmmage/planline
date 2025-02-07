import { format, addDays, differenceInDays } from "date-fns"
import type { TimeUnit } from "./types"

interface TimelineMarkersProps {
  centerDate: Date
  timeUnit: TimeUnit
  scale: number
  zoomLevelsScale: number
  numTicks: number
  getDateRange: (date: Date, unit: TimeUnit) => [Date, Date]
}

export function TimelineMarkers({
  centerDate,
  timeUnit,
  scale,
  zoomLevelsScale,
  numTicks,
  getDateRange,
}: TimelineMarkersProps) {
  const markers = []
  const [startDate, endDate] = getDateRange(centerDate, timeUnit)
  const daysToShow = differenceInDays(endDate, startDate) * numTicks
  const startShowDate = addDays(startDate, -daysToShow / 2)
  const endShowDate = addDays(endDate, daysToShow / 2)

  const timeUnits: TimeUnit[] = ["day", "week", "month", "quarter", "year", "decade"]
  const currentUnitIndex = timeUnits.indexOf(timeUnit)
  const lowerUnit = currentUnitIndex > 0 ? timeUnits[currentUnitIndex - 1] : null
  const higherUnit = currentUnitIndex < timeUnits.length - 1 ? timeUnits[currentUnitIndex + 1] : null

  let currentDate = startShowDate
  while (currentDate <= endShowDate) {
    const position = differenceInDays(currentDate, centerDate) * 100 * scale * zoomLevelsScale

    // Main unit ticks
    let label = ""
    let showTick = false

    switch (timeUnit) {
      case "day":
        showTick = true
        label = format(currentDate, "d")
        break
      case "week":
        showTick = currentDate.getDay() === 0
        label = `Week ${format(currentDate, "w")}`
        break
      case "month":
        showTick = currentDate.getDate() === 1
        label = format(currentDate, "MMM")
        break
      case "quarter":
        showTick = currentDate.getDate() === 1 && currentDate.getMonth() % 3 === 0
        label = `Q${Math.floor(currentDate.getMonth() / 3) + 1}`
        break
      case "year":
        showTick = currentDate.getMonth() === 0 && currentDate.getDate() === 1
        label = format(currentDate, "yyyy")
        break
      case "decade":
        showTick = currentDate.getFullYear() % 10 === 0 && currentDate.getMonth() === 0 && currentDate.getDate() === 1
        label = `${format(currentDate, "yyyy")}'s`
        break
    }

    if (showTick) {
      markers.push(
        <div
          key={`${currentDate.toISOString()}-main`}
          className="absolute flex flex-col items-center"
          style={{ left: `calc(50% + ${position}px)`, top: "50%", transform: "translateY(-50%)" }}
        >
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
          <div className="text-xs mt-1">{label}</div>
          {currentDate.getMonth() === 0 &&
            currentDate.getDate() === 1 &&
            timeUnit !== "year" &&
            timeUnit !== "decade" && <div className="text-xs mt-1 font-bold">{format(currentDate, "yyyy")}</div>}
        </div>,
      )
    }

    // Lower unit ticks
    if (lowerUnit) {
      let showLowerTick = false
      switch (lowerUnit) {
        case "day":
          showLowerTick = true
          break
        case "week":
          showLowerTick = currentDate.getDay() === 0
          break
        case "month":
          showLowerTick = currentDate.getDate() === 1
          break
        case "quarter":
          showLowerTick = currentDate.getDate() === 1 && currentDate.getMonth() % 3 === 0
          break
        case "year":
          showLowerTick = currentDate.getMonth() === 0 && currentDate.getDate() === 1
          break
      }

      if (showLowerTick) {
        markers.push(
          <div
            key={`${currentDate.toISOString()}-lower`}
            className="absolute flex flex-col items-center"
            style={{ left: `calc(50% + ${position}px)`, top: "50%", transform: "translateY(-50%)" }}
          >
            <div className="h-2 w-px bg-gray-200 dark:bg-gray-600"></div>
          </div>,
        )
      }
    }

    // Higher unit ticks
    if (higherUnit) {
      let showHigherTick = false
      switch (higherUnit) {
        case "week":
          showHigherTick = currentDate.getDay() === 0
          break
        case "month":
          showHigherTick = currentDate.getDate() === 1
          break
        case "quarter":
          showHigherTick = currentDate.getDate() === 1 && currentDate.getMonth() % 3 === 0
          break
        case "year":
          showHigherTick = currentDate.getMonth() === 0 && currentDate.getDate() === 1
          break
        case "decade":
          showHigherTick =
            currentDate.getFullYear() % 10 === 0 && currentDate.getMonth() === 0 && currentDate.getDate() === 1
          break
      }

      if (showHigherTick) {
        markers.push(
          <div
            key={`${currentDate.toISOString()}-higher`}
            className="absolute flex flex-col items-center"
            style={{ left: `calc(50% + ${position}px)`, top: "50%", transform: "translateY(-50%)" }}
          >
            <div className="h-6 w-px bg-gray-400 dark:bg-gray-500"></div>
            <div className="text-xs mt-1 font-bold">
              {format(currentDate, higherUnit === "decade" ? "yyyy" : "MMM yyyy")}
            </div>
          </div>,
        )
      }
    }

    currentDate = addDays(currentDate, 1)
  }

  return <>{markers}</>
}

