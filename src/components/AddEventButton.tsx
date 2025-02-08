"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import supabase from "@/lib/supabaseClient";
import { TIMELINE_ZONES } from "@/config/config";

interface AddEventButtonProps {
  onAddEvent: () => void;
}

interface EventType {
  id: string;
  name: string;
  color: string;
}

export default function AddEventButton({ onAddEvent }: AddEventButtonProps) {
  const [name, setName] = useState("New Event");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [color, setColor] = useState("#000000");
  const [zone, setZone] = useState("1");
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [isCrayon, setIsCrayon] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchEventTypes();
  }, []);

  async function fetchEventTypes() {
    const { data, error } = await supabase.from("event_types").select("*");
    if (error) {
      console.error("Error fetching event types:", error);
      setEventTypes([{ id: "default", name: "Event", color: "#000000" }]);
    } else {
      setEventTypes(data || []);
      const defaultEventType =
        data?.find((type) => type.name.toLowerCase() === "event") || data?.[0];
      if (defaultEventType) {
        setEventType(defaultEventType.id);
        setColor(defaultEventType.color);
      }
    }
  }

  useEffect(() => {
    const selectedType = eventTypes.find((type) => type.id === eventType);
    if (selectedType) {
      setColor(selectedType.color);
    }
  }, [eventType, eventTypes]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("events").insert([
      {
        name,
        start_date: startDate,
        end_date: endDate,
        type: eventTypes.find((type) => type.id === eventType)?.name || "",
        color,
        zone: Number.parseInt(zone),
        is_crayon: isCrayon,
      },
    ]);

    if (error) console.error("Error adding event:", error);
    else {
      onAddEvent();
      setName("New Event");
      setStartDate("");
      setEndDate("");
      setEventType("");
      setColor("#000000");
      setZone("1");
      setIsCrayon(false);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="absolute bottom-4 right-4">Add Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="eventType">Event Type</Label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger>
                <SelectValue placeholder="Select an event type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="zone">Zone</Label>
            <Select value={zone} onValueChange={setZone}>
              <SelectTrigger>
                <SelectValue placeholder="Select a zone" />
              </SelectTrigger>
              <SelectContent>
                {TIMELINE_ZONES.sort((a, b) => b.position - a.position).map(
                  (zone) => (
                    <SelectItem key={zone.id} value={zone.id.toString()}>
                      {zone.position}: {zone.name}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="isCrayon">Crayon Style</Label>
            <Input
              id="isCrayon"
              type="checkbox"
              checked={isCrayon}
              onChange={(e) => setIsCrayon(e.target.checked)}
            />
          </div>
          <Button type="submit">Add Event</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
