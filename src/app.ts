import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import router from "./app/routes/index.js";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import HttpStatus from "http-status";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Healthcare API");
});

app.use("/api/v1/", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response) => {
  console.log("req:", req);
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    error: {
      path: req.originalUrl,
      message: "The requested resource could not be found",
    },
  });
});

export default app;
