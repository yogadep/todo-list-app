import { Router } from "express";
import { addActivity,
         deleteActivity,
         getActivities,
         getActivity,
         updateActivity }
from "../controller/activityController.js";
import { verifyToken } from "../middleware/verificationToken.js";

export const activityRouter = Router();

activityRouter.get('/', verifyToken, getActivities)
              .post('/', verifyToken, addActivity)
activityRouter.get('/:id', verifyToken, getActivity)
              .put('/:id', verifyToken, updateActivity)
              .delete('/:id', verifyToken, deleteActivity)
