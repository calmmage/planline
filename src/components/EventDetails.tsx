"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

interface Event {
  id: string
  name: string
  start_date: string
  end_date: string
  color: string
  type: string
}

interface EventDetailsProps {
  event: Event | null
  onClose: () => void
  onUpdate: () => void
}

export default function EventDetails({ event, onClose, onUpdate }: EventDetailsProps) {
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [color, setColor] = useState("")
  const [type, setType] = useState("")

  useEffect(() => {
    if (event) {
      setName(event.name)
      setStartDate(event.start_date)
      setEndDate(event.end_date)
      setColor(event.color)
      setType(event.type)
    }
  }, [event])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!event) return

    const { data, error } = await supabase
      .from("events")
      .update({ name, start_date: startDate, end_date: endDate, color, type })
      .eq("id", event.id)

    if (error) console.error("Error updating event:", error)
    else {
      onUpdate()
      onClose()
    }
  }

  async function handleDelete() {
    if (!event) return

    const { error } = await supabase.from("events").delete().eq("id", event.id)

    if (error) console.error("Error deleting event:", error)
    else {
      onUpdate()
      onClose()
    }
  }

  if (!event) return null

  return (
    <Dialog open={!!event} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="color">Color</Label>
            <Input id="color" type="color" value={color} onChange={(e) => setColor(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Input id="type" value={type} onChange={(e) => setType(e.target.value)} required />
          </div>
          <div className="flex justify-between">
            <Button type="submit">Update Event</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

