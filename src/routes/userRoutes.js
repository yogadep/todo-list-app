import { Router } from "express";
import { getUser, addUser } from "../controller/userController.js";

export const userRouter = Router();

userRouter
    .get('/', getUser)
    .post('/', addUser);