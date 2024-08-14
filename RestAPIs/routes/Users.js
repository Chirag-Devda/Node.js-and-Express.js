import express from "express";

import {
  createUsers,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/Users.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/", createUsers);

router.get("/:id", getUser);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);

export default router;
