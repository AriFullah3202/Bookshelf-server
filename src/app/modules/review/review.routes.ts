// reviewRoutes.js

import express from "express";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post("/", ReviewController.createReview);
router.get("/:id", ReviewController.getAllReview);

export const ReviewRoutes = { router };
