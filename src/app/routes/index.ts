import express from "express";
import { userRoutes } from "../modules/user/user.routes.js";
import { adminRoutes } from "../modules/admin/admin.routes.js";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
