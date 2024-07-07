import { Router } from "express";
import { login } from "../controller/loginController.js";

export const loginRouter = Router();

loginRouter.post('/', login)