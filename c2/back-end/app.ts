import express from "express";
import cors from "cors";
import connectionToDB from "./connection-to-db";
import env from "dotenv";
import userRouter from "./Routes/users-route";
import questionRouter from "./Routes/question-route";
import answerRouter from "./Routes/answer-route";
env.config();

const startServer = () => {
  const app = express();

  app.use(express.json());

  app.use(cors());
  app.use("/api/questions", questionRouter);
  app.use("/api/answers", answerRouter);
  app.use("/api/users", userRouter);
  connectionToDB()
    .then(() => {
      console.log("Connected to database");

      app.on("error", (err: any) => {
        console.log(`Error Connecting to http://localhost:${process.env.PORT}`);
        console.log(err.message);
      });

      app.listen(process.env.PORT, () => {
        console.log(`Server Running at http://localhost:${process.env.PORT}`);
      });
    })
    .catch((err: any) => {
      console.log(err.message);
    });
};

startServer();
