import express from "express";
import { AuthRoute } from "../modules/auth/auth.routes";
import { userRoute } from "../modules/user/user.route";
import { BookRoutes } from "../modules/book/book.route";
import { ReviewRoutes } from "../modules/review/review.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoute.router,
  },
  {
    path: "/auth",
    route: AuthRoute.router,
  },

  {
    path: "/book",
    route: BookRoutes.router,
  },
  {
    path: "/reviews",
    route: ReviewRoutes.router,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
