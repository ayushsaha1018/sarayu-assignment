import cors from "cors";
import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// routers
import eventRouter from "./routes/event.routes";
import userRouter from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.get("/", (req, res) => {
  return res.send("API is working....");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/events", eventRouter);

const startServer = async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}...`);
  });
};

startServer();
