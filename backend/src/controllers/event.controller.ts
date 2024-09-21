import { Request, Response } from "express";
import { db } from "../utils/db";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const { title, date, description, reminder, reminderTime } = req.body;
  // @ts-ignore
  const userId = req?.user?.id;

  const event = await db.event.create({
    data: {
      title,
      date,
      description,
      reminder,
      reminderTime,
      userId,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(200, event, "Event Created successfully"));
});

// Read Events
const getEvents = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req?.user?.id;

  const events = await db.event.findMany({
    where: { userId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, events, "Events fetched successfully"));
});

const editEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  // @ts-ignore
  const userId = req?.user?.id;

  const event = await db.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.userId !== userId) {
    throw new ApiError(403, "You do not have permission to edit this event");
  }

  const updatedEvent = await db.event.update({
    where: { id },
    data: req.body,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedEvent, "Event updated fetched successfully")
    );
});

// Delete Event
const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  // @ts-ignore
  const userId = req?.user?.id;

  const event = await db.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.userId !== userId) {
    throw new ApiError(403, "You do not have permission to delete this event");
  }

  await db.event.delete({
    where: { id },
  });

  return res
    .status(204)
    .json(new ApiResponse(204, {}, "Event deleted successfully"));
});

export { createEvent, getEvents, editEvent, deleteEvent };
