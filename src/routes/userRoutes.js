import { Router } from "express";
import { getUsers,
         getUser,
         addUser,
         updateUser,
         deleteUser,
} from "../controller/userController.js";

export const userRouter = Router();

userRouter
    .get('/', getUsers)
    .post('/', addUser);
userRouter
    .get('/:id', getUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)