"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

interface Event {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  color: string;
  type: string;
  zone: number;
  is_crayon?: boolean;
}

interface EventType {
  id: string;
  name: string;
  color: string;
}

interface EventDetailsProps {
  event: Event | null;
  onClose: () => void;
  onUpdate: () => void;
}

export default function EventDetails({
  event,
  onClose,
  onUpdate,
}: EventDetailsProps) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [color, setColor] = useState("#000000");
  const [zone, setZone] = useState("1");
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [isCrayon, setIsCrayon] = useState(false);

  useEffect(() => {
    fetchEventTypes();
  }, []);

  useEffect(() => {
    if (event) {
      setName(event.name);
      setStartDate(event.start_date);
      setEndDate(event.end_date);
      setColor(event.color);
      setZone(event.zone.toString());
      setIsCrayon(event.is_crayon || false);

      // Find and set event type based on name
      const matchingType = eventTypes.find((type) => type.name === event.type);
      if (matchingType) {
        setEventType(matchingType.id);
      }
    }
  }, [event, eventTypes]);

  async function fetchEventTypes() {
    const { data, error } = await supabase.from("event_types").select("*");
    if (error) {
      console.error("Error fetching event types:", error);
      setEventTypes([{ id: "default", name: "Event", color: "#000000" }]);
    } else {
      setEventTypes(data || []);
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
    if (!event) return;

    const { error } = await supabase
      .from("events")
      .update({
        name,
        start_date: startDate,
        end_date: endDate,
        type: eventTypes.find((type) => type.id === eventType)?.name || "",
        color,
        zone: Number.parseInt(zone),
        is_crayon: isCrayon,
      })
      .eq("id", event.id);

    if (error) console.error("Error updating event:", error);
    else {
      onUpdate();
    }
  }

  async function handleDelete() {
    if (!event) return;

    const { error } = await supabase.from("events").delete().eq("id", event.id);

    if (error) console.error("Error deleting event:", error);
    else {
      onUpdate();
    }
  }

  if (!event) return null;

  return (
    <Dialog open={!!event} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
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
          <div className="flex justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={handleDelete}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              Delete Event
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
