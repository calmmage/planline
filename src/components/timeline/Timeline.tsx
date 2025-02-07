"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  addDays,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  addYears,
  differenceInDays,
} from "date-fns"
import { createClient } from "@supabase/supabase-js"
import AddEventButton from "../AddEventButton"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { TimelineMarkers } from "./TimelineMarkers"
import { TimelineEvents } from "./TimelineEvents"
import { DevSettingsOverlay } from "./DevSettingsOverlay"
import type { Event, TimeUnit } from "./types"
import { MIN_SCALE, MAX_SCALE, DEFAULT_NUM_TICKS } from "@/config/config"
import { CalendarDays } from "lucide-react"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function Timeline() {
  const [events, setEvents] = useState<Event[]>([])
  const [scale, setScale] = useState(0.01)
  const [centerDate, setCenterDate] = useState(new Date())
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("month")
  const [showDevSettings, setShowDevSettings] = useState(false)
  const [zoomLevelsScale, setZoomLevelsScale] = useState(1)
  const [numTicks, setNumTicks] = useState(DEFAULT_NUM_TICKS)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [timelineHeight, setTimelineHeight] = useState(75)
  const [selectionStart, setSelectionStart] = useState<Date | null>(null)
  const [selectionEnd, setSelectionEnd] = useState<Date | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    const { data, error } = await supabase.from("events").select("*")
    if (error) console.error("Error fetching events:", error)
    else setEvents(data || [])
  }

  function handleWheel(e: React.WheelEvent) {
    if (e.ctrlKey) {
      e.preventDefault()
      const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * (1 - e.deltaY * 0.001)))
      setScale(newScale)
    } else {
      const newCenterDate = addDays(centerDate, e.deltaY * 0.1)
      setCenterDate(newCenterDate)
    }
  }

  function getDateRange(date: Date, unit: TimeUnit): [Date, Date] {
    switch (unit) {
      case "day":
        return [startOfDay(date), endOfDay(date)]
      case "week":
        return [startOfWeek(date), endOfWeek(date)]
      case "month":
        return [startOfMonth(date), endOfMonth(date)]
      case "quarter":
        const quarterStart = new Date(date.getFullYear(), Math.floor(date.getMonth() / 3) * 3, 1)
        const quarterEnd = new Date(quarterStart.getFullYear(), quarterStart.getMonth() + 3, 0)
        return [quarterStart, quarterEnd]
      case "year":
        return [startOfYear(date), endOfYear(date)]
      case "decade":
        const startDecade = new Date(Math.floor(date.getFullYear() / 10) * 10, 0, 1)
        return [startDecade, addYears(startDecade, 10)]
    }
  }

  function handleEventClick(event: Event) {
    console.log("Event clicked:", event)
    // todo: open edit event details dialog
  }

  function handleZoomChange(value: number[]) {
    setScale(value[0])
  }

  function handleTimeUnitChange(unit: TimeUnit) {
    setTimeUnit(unit)
  }

  function calculateVisibleTimeRange(): string {
    if (!timelineRef.current) return "Unknown"

    const timelineWidth = timelineRef.current.clientWidth
    const pixelsPerDay = 100 * scale * zoomLevelsScale
    const visibleDays = timelineWidth / pixelsPerDay

    if (visibleDays < 1) return `${Math.round(visibleDays * 24)} hours`
    if (visibleDays < 7) return `${Math.round(visibleDays)} days`
    if (visibleDays < 30) return `${Math.round(visibleDays / 7)} weeks`
    if (visibleDays < 365) return `${Math.round(visibleDays / 30)} months`
    return `${Math.round(visibleDays / 365)} years`
  }

  function handleTodayClick() {
    setCenterDate(new Date())
  }

  function handleTimelineMouseDown(e: React.MouseEvent) {
    if (!timelineRef.current) return
    const rect = timelineRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const totalWidth = rect.width
    const daysFromCenter = (x - totalWidth / 2) / (100 * scale * zoomLevelsScale)
    setSelectionStart(addDays(centerDate, daysFromCenter))
    setSelectionEnd(null)
  }

  function handleTimelineMouseMove(e: React.MouseEvent) {
    if (!selectionStart || !timelineRef.current) return
    const rect = timelineRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const totalWidth = rect.width
    const daysFromCenter = (x - totalWidth / 2) / (100 * scale * zoomLevelsScale)
    setSelectionEnd(addDays(centerDate, daysFromCenter))
  }

  function handleTimelineMouseUp() {
    if (selectionStart && selectionEnd) {
      // Open AddEventButton dialog with pre-filled dates
      console.log("Selection:", selectionStart, selectionEnd)
    }
    setSelectionStart(null)
    setSelectionEnd(null)
  }

  return (
    <div 
      className={`w-full relative`} 
      style={{ height: `${timelineHeight}vh` }}
    >
      <div className={`w-full h-full flex flex-col`}>
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-2 bg-background/80">
          <div className="flex space-x-2">
            {(["day", "week", "month", "quarter", "year", "decade"] as TimeUnit[]).map((unit) => (
              <Button
                key={unit}
                onClick={() => handleTimeUnitChange(unit)}
                variant={timeUnit === unit ? "default" : "outline"}
                size="sm"
              >
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </Button>
            ))}
            <Button onClick={handleTodayClick} variant="outline" size="sm" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Today
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setShowDevSettings(!showDevSettings)} size="sm">
              {showDevSettings ? "Hide Dev Settings" : "Show Dev Settings"}
            </Button>
          </div>
        </div>
        {showDevSettings && (
          <DevSettingsOverlay
            zoomLevelsScale={zoomLevelsScale}
            setZoomLevelsScale={setZoomLevelsScale}
            numTicks={numTicks}
            setNumTicks={setNumTicks}
            timelineHeight={timelineHeight}
            setTimelineHeight={setTimelineHeight}
            onClose={() => setShowDevSettings(false)}
          />
        )}
        <div
          className="flex-grow overflow-hidden relative"
          onWheel={handleWheel}
          ref={timelineRef}
          onMouseDown={handleTimelineMouseDown}
          onMouseMove={handleTimelineMouseMove}
          onMouseUp={handleTimelineMouseUp}
          onMouseLeave={handleTimelineMouseUp}
        >
          <div className="absolute top-0 left-1/2 h-full border-l border-border"></div>
          <div className="absolute top-1/2 left-0 w-full border-t border-border"></div>
          <TimelineMarkers
            centerDate={centerDate}
            timeUnit={timeUnit}
            scale={scale}
            zoomLevelsScale={zoomLevelsScale}
            numTicks={numTicks}
            getDateRange={getDateRange}
          />
          <TimelineEvents
            events={events}
            centerDate={centerDate}
            scale={scale}
            zoomLevelsScale={zoomLevelsScale}
            onEventClick={handleEventClick}
          />
          {selectionStart && selectionEnd && (
            <div
              className="absolute bg-blue-200 opacity-50"
              style={{
                left: `calc(50% + ${differenceInDays(selectionStart, centerDate) * 100 * scale * zoomLevelsScale}px)`,
                width: `${Math.abs(differenceInDays(selectionEnd, selectionStart)) * 100 * scale * zoomLevelsScale}px`,
                top: 0,
                bottom: 0,
              }}
            />
          )}
          <AddEventButton onAddEvent={fetchEvents} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between p-2 bg-background/80">
          <div className="text-sm">Visible time range: {calculateVisibleTimeRange()}</div>
          <Slider
            min={MIN_SCALE}
            max={MAX_SCALE}
            step={0.0001}
            value={[scale]}
            onValueChange={handleZoomChange}
            className="w-64"
          />
        </div>
      </div>
    </div>
  )
}

