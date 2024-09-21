import {
  startOfWeek,
  startOfMonth,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";

import { Event, EventForm } from "@/lib/types";
import { CalendarDay } from "./CalenderDay";

interface CalendarGridProps {
  selectedDate: Date;
  viewMode: "month" | "week";
  events: Event[];
  onCreateEvent: (event: EventForm) => void;
  onEditEvent: (id: string, event: EventForm) => void;
  onDeleteEvent: (id: string) => void;
}

export function CalendarGrid({
  selectedDate,
  viewMode,
  events,
  onCreateEvent,
  onEditEvent,
  onDeleteEvent,
}: CalendarGridProps) {
  const days = viewMode === "month" ? 35 : 7;
  const startDate =
    viewMode === "month"
      ? startOfWeek(startOfMonth(selectedDate))
      : startOfWeek(selectedDate);

  return (
    <div className="grid grid-cols-7 gap-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="text-center font-semibold">
          {day}
        </div>
      ))}
      {Array.from({ length: days }).map((_, index) => {
        const date = addDays(startDate, index);
        const dayEvents =
          events.length > 0
            ? events?.filter((event) => isSameDay(event.date, date))
            : [];
        const isCurrentMonth = isSameMonth(date, selectedDate);
        return (
          <CalendarDay
            key={index}
            date={date}
            events={dayEvents}
            viewMode={viewMode}
            isCurrentMonth={isCurrentMonth}
            onCreateEvent={onCreateEvent}
            onEditEvent={onEditEvent}
            onDeleteEvent={onDeleteEvent}
          />
        );
      })}
    </div>
  );
}
