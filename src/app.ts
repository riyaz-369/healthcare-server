import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import router from "./app/routes/index.js";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Healthcare API");
});

app.use("/api/v1/", router);

export default app;
