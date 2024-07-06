import { Router } from "express";
import { addActivity,
         deleteActivity,
         getActivities,
         getActivity,
         updateActivity }
from "../controller/activityController.js";

export const activityRouter = Router();

activityRouter.get('/', getActivities)
              .post('/', addActivity)
activityRouter.get('/:id', getActivity)
              .put('/:id', updateActivity)
              .delete('/:id', deleteActivity)
