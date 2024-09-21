import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";

// routers
import userRouter from "./routes/user.routes";
import eventRouter from "./routes/event.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

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
