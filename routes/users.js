import express from "express";
import { getUsersController, addUserController, loginUserController } from "../controllers/userController.js"

const router = express.Router();

router.get("/register", getUsersController);

router.post("/register", addUserController);

router.post("/login", loginUserController);

export default router;