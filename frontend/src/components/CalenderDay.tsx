import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Event, EventForm as EventFormType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { format, isToday } from "date-fns";
import { Plus } from "lucide-react";
import { useState } from "react";
import { EventForm } from "./EventForm";
import { EventList } from "./EventList";
import { Button } from "./ui/button";

interface CalendarDayProps {
  date: Date;
  events: Event[];
  isCurrentMonth: boolean;
  viewMode: "month" | "week";
  onCreateEvent: (event: EventFormType) => void;
  onEditEvent: (id: string, event: EventFormType) => void;
  onDeleteEvent: (id: string) => void;
}

export function CalendarDay({
  date,
  events,
  isCurrentMonth,
  viewMode,
  onCreateEvent,
  onEditEvent,
  onDeleteEvent,
}: CalendarDayProps) {
  const { isLoggedIn, setIsDialogOpen } = useAuthStore();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNewEvent = () => {
    setSelectedEvent(null);
    setIsEditing(false);
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    setIsSheetOpen(false);
    onDeleteEvent(id);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <div>
        <div
          className={cn(
            `border p-2 overflow-y-auto cursor-pointer`,
            isCurrentMonth ? "bg-white" : "bg-gray-100",
            viewMode === "month" ? "h-[110px]" : "h-[400px]",
            isToday(date) ? "bg-gray-700" : ""
          )}
          onClick={(e) => {
            e.stopPropagation();
            if (!isLoggedIn) {
              setIsDialogOpen(true);
            } else {
              setIsEditing(false);
              setIsSheetOpen(true);
              setSelectedEvent(null);
            }
          }}
        >
          <div
            className={cn(
              `text-right`,
              isCurrentMonth ? "text-gray-900" : "text-gray-400",
              isToday(date) ? "text-white" : ""
            )}
          >
            {format(date, "d")}
          </div>
          {events.map((event) => (
            <div
              key={event.id}
              className="text-xs bg-blue-100 p-1 mb-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEvent(event);
                setIsSheetOpen(true);
                setIsEditing(false);
              }}
            >
              {event.title}
            </div>
          ))}
        </div>
      </div>
      <SheetContent>
        <SheetHeader>
          <div className="flex justify-between items-center mt-7">
            <SheetTitle>
              {events.length && !isCreating ? "Events" : "Create Event"}
            </SheetTitle>
            {events.length > 0 && !isCreating && !isEditing && (
              <Button size={"sm"} onClick={handleCreateNewEvent}>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            )}
          </div>
          <SheetDescription>{format(date, "MMMM d, yyyy")}</SheetDescription>
        </SheetHeader>
        {events.length > 0 && !isCreating && !isEditing ? (
          <EventList
            events={events}
            onEdit={(event) => {
              setSelectedEvent(event);
              setIsEditing(true);
              setIsCreating(false);
            }}
            onDelete={handleDelete}
          />
        ) : (
          <EventForm
            event={isEditing ? selectedEvent : null}
            date={date}
            onSubmit={(event) => {
              if (isEditing && selectedEvent?.id) {
                onEditEvent(selectedEvent.id, event);
              } else {
                onCreateEvent(event);
              }

              setIsSheetOpen(false);
              setIsCreating(false);
              setIsEditing(false);
            }}
            onCancel={() => {
              if (events.length > 0) {
                setIsCreating(false);
                setIsEditing(false);
              } else {
                setIsSheetOpen(false);
              }
            }}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
