import Activity from "../models/activity.js";
import { successRes, errorRes } from "../middleware/responseHelper.js";

export const getActivities = async (req, res, next) => {
    try {
        const activities = await Activity.find()
        // return res.status(200).json(activities)
        return successRes(res, 200, "Activities retrieved successfully", activities )
    } catch (error) {
        next(error)
    }
};


export const getActivity = async (req, res, next) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            // return res.status(404).json({ message: "Activity not found" });
            return errorRes(res, 404, "Activity not found")
        }
        // return res.status(200).json(activity)
        return successRes(res, 200, "Activity successfully showing", activity)
    } catch (error) { 
        next(error)
    }
};

export const addActivity = async (req, res, next) => {
    const { title, description , status } = req.body;
    if (!title || !description) {
        // return res.status(400).json({ error: "Title and description are required" });
        return errorRes(res, 400, "Title and description are required")
    }
    try {
        const activity = new Activity({ 
            title,
            description,
            status
        });
        const addActivity = await activity.save()
        // return res.status(201).json({ message: "Successfully created activity", addActivity})
        return successRes(res, 200, "Successfully created activity", addActivity)
    } catch (error) {
        next(error)
    }
};

export const updateActivity = async (req, res, next) => {
    const { id } = req.params;
    const { title, description , status } = req.body;

    try {
        const updActivity = {
            title,
            description,
            status
        }
        const updatedActivity = await Activity.findOneAndUpdate(
            { _id: id },
            { $set: updActivity },
            { new: true }
        );
        if(!updatedActivity){
            // return res.status(404).json({ message: "Activity not found" });
            return errorRes(res, 404, "Activity not found");
        }
        // return res.status(200).json({ message: "Successfully updated activity", updatedActivity})
        return successRes(res, 200, "Successfully updated activity", updatedActivity)
    } catch (error) {  
        next(error)
    }
};

export const deleteActivity = async (req, res, next) => {
    const { id } = req.params;
    try {
        const delActivity = await Activity.findOneAndDelete({ _id: id })
        if(!delActivity){
            // return res.status(404).json({ message: "Activity not found" });
            return errorRes(res, 404, "Activity not found");
        }
        // return res.status(200).json({ message: "Successfully deleted activity", delActivity })
        return successRes(res, 200, "Successfully deleted activity", delActivity);
    } catch (error) {
        next(error)
    }
};


