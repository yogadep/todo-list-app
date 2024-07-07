import Activity from "../models/activity.js";

export const getActivities = async (req, res, next) => {
    try {
        const activities = await Activity.find()
        return res.status(200).json(activities)
    } catch (error) {
        // return res.status(400).json({ message: "fatal error", error: error.message })
        next(error)
    }
}


export const getActivity = async (req, res, next) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
        }
        return res.status(200).json(activity)
    } catch (error) {
        // return res.status(400).json({ message: "fatal error", error: error.message })
        next(error)
    }
}

export const addActivity = async (req, res, next) => {
    const { title, description , status } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: "title and description are required" });
    }
    try {
        const activity = new Activity({ 
            title,
            description,
            status
        });
        const addActivity = await activity.save()
        return res.status(201).json({ message: "Successfully created activity", addActivity})
    } catch (error) {
        // return res.status(400).json({ error: error.message })
        next(error)
    }
}

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
            return res.status(404).json({ message: "Activity not found" });
        }
        return res.status(200).json({ message: "Successfully updated activity", updatedActivity})
    } catch (error) {
        // return res.status(400).json({ message: "fatal error", error: error.message })   
        next(error)
    }
}

export const deleteActivity = async (req, res, next) => {
    const { id } = req.params;
    try {
        const delActivity = await Activity.findOneAndDelete({ _id: id })
        if(!delActivity){
            return res.status(404).json({ message: "Activity not found" });
        }
        return res.status(200).json({ message: "Successfully deleted activity", delActivity })
    } catch (error) {
        // return res.status(400).json({ message: "fatal error", error: error.message });
        next(error)
    }
}


