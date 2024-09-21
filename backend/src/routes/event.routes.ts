import { Router } from "express";
import {
  createEvent,
  editEvent,
  getEvents,
  deleteEvent,
} from "../controllers/event.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", verifyJWT, getEvents);
router.post("/", verifyJWT, createEvent);
router.put("/:id", verifyJWT, editEvent);
router.delete("/:id", verifyJWT, deleteEvent);

export default router;
