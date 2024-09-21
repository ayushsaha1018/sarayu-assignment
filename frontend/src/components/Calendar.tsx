import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventForm } from "@/lib/types";
import EventService from "@/services/eventService";
import { useEventStore } from "@/store/eventStore";
import { addDays, addMonths, format, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CalendarGrid } from "./CalenderGrid";

export default function CalendarComponent() {
  const { events, setEvents } = useEventStore();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week">("month");

  const handleCreateEvent = async (newEvent: EventForm) => {
    try {
      const res = await EventService.createEvent(newEvent);
      console.log(res.data);
      setEvents([...events, res.data]);
      toast("Event Has Been Created");
    } catch (error) {
      console.log(error);
      toast("Something went wrong!");
    }
  };

  const handleEditEvent = async (eventId: string, updatedEvent: EventForm) => {
    try {
      if (eventId) {
        const res = await EventService.updateEvent(eventId, updatedEvent);
        console.log(res.data);
        setEvents(events.map((e) => (e.id === res.data.id ? res.data : e)));
        toast("Event Has Been Updated");
      } else {
        console.log("No event id");
        toast("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong!");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      const res = await EventService.deleteEvent(id);
      console.log(res.data);
      setEvents(events.filter((e) => e.id !== id));
      toast("Event Has Been Deleted");
    } catch (error) {
      console.log(error);
      toast("Something went wrong!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setSelectedDate(
                viewMode === "month"
                  ? subMonths(selectedDate, 1)
                  : addDays(selectedDate, -7)
              )
            }
            aria-label={
              viewMode === "month" ? "Previous month" : "Previous week"
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {format(
              selectedDate,
              viewMode === "month" ? "MMMM yyyy" : "MMMM d, yyyy"
            )}
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setSelectedDate(
                viewMode === "month"
                  ? addMonths(selectedDate, 1)
                  : addDays(selectedDate, 7)
              )
            }
            aria-label={viewMode === "month" ? "Next month" : "Next week"}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-end mb-4">
          <Select
            value={viewMode}
            onValueChange={(value: "month" | "week") => setViewMode(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CalendarGrid
          selectedDate={selectedDate}
          viewMode={viewMode}
          events={events}
          onCreateEvent={handleCreateEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      </div>
    </div>
  );
}
