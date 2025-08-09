import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.routes.js";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/api/v1/user", userRoutes);

export default app;
