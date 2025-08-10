import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.routes.js";
import { adminRoutes } from "./app/modules/admin/admin.routes.js";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

export default app;
