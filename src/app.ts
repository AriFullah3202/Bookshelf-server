import express, { Application, NextFunction, Request, Response } from "express";

import cors from "cors";
import router from "./app/routes";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
//import ApiError from './error/ApiError'

const app: Application = express();
app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookies parser
app.use(cookieParser());
// Application run

app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to our online cow selling and buying Hut!");
});

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not found",
    errorMessage: [
      {
        path: req.originalUrl,
        message: "API not found",
      },
    ],
  });
  next();
});

export default app;
