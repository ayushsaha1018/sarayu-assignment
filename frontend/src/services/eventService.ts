import { EventForm } from "@/lib/types";
import { getToken } from "@/lib/utils";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const axios_ = axios.create({
  baseURL: API_URL,
});
axios_.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class EventService {
  // Create an event
  static async createEvent(eventData: EventForm) {
    const response = await axios_.post("/events/", eventData);
    return response.data;
  }

  // Get events for a specific user
  static async getUserEvents() {
    const response = await axios_.get("/events/");
    return response.data;
  }

  // Update an event
  static async updateEvent(eventId: string, eventData: EventForm) {
    const response = await axios_.put(
      `${API_URL}/events/${eventId}`,
      eventData
    );
    return response.data;
  }

  // Delete an event
  static async deleteEvent(eventId: string) {
    const response = await axios_.delete(`${API_URL}/events/${eventId}`);
    return response.data;
  }
}

export default EventService;
