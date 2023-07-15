import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { Server } from "http";

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("connect successful");

    server = app.listen(config.port, () => {
      console.log(`the application is running on port ${config.port}`);
    });
  } catch (error: any) {
    console.error(`failed to connect database ${error.message}`);
  }
  process.on("unhandledRejection", (error) => {
    console.log("unhandle rejection");
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();
process.on("SIGTERM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});
