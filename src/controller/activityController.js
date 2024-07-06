import Activity from "../models/activity.js";

export const getActivities = async (req, res, next) => {
    try {
        const activities = await Activity.find()
        return res.status(200).json({ message: "Success fetched activities", activities })
    } catch (error) {
        // return res.status(400).json({ message: "fatal error", error: error.message })
        next(error)
    }
}


export const getActivity = async (req, res, next) => {
    try {
        const activity = await Activity.findById(req.params.id);
        return res.status(200).json({ message: "Success fetched activity", activity })
    } catch (error) {
        // return res.status(400).json({ message: "fatal error", error: error.message })
        next(error)
    }
}

export const addActivity = async (req, res, next) => {
    const { name, status } = req.body;
    if(!name){
        return res.status(400).json({ error: "error" })
    }
    try {
        const activity = new Activity({ name, status });
        const addActivity = await activity.save()
        return res.status(200).json({ message: "Success created activity", addActivity})
    } catch (error) {
        // return res.status(400).json({ error: error.message })
        next(error)
    }
}

export const updateActivity = async (req, res, next) => {
    const { id } = req.params;
    const { name, status } = req.body;

    try {
        const updActivity = {
            name,
            status
        }
        const updatedActivity = await Activity.findOneAndUpdate(
            { _id: id },
            { $set: updActivity },
            { new: true }
        );
        return res.status(200).json({ message: "Success updated activity", updatedActivity})
    } catch (error) {
        // return res.status(400).json({ message: "fatal error", error: error.message })   
        next(error)
    }
}

export const deleteActivity = async (req, res, next) => {
    const { id } = req.params;
    try {
        const delActivity = await Activity.findOneAndDelete({ _id: id })
        return res.status(200).json({ message: "Success deleted activity", delActivity })
    } catch (error) {
        // return res.status(400).json({ message: "fatal error", error: error.message });
        next(error)
    }
}


