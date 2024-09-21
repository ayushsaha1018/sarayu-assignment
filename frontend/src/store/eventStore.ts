import { Event } from "@/lib/types";
import { create } from "zustand";

interface EventState {
  events: Event[];
  setEvents: (events: Event[]) => void;
}

export const useEventStore = create<EventState>()((set) => ({
  events: [],
  setEvents: (events) => set(() => ({ events })),
}));
