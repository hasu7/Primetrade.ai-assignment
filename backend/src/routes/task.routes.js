import express from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getAllTasks
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

router.get(
  "/all",
  protect,
  authorize("admin"),
  getAllTasks
);

export default router;