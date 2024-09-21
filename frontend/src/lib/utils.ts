import EventService from "@/services/eventService";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const getAllEvents = async () => {
  try {
    const res = await EventService.getUserEvents();
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
