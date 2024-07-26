import User from "../models/user.js";
import { successRes, errorRes } from "../middleware/responseHelper.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        // return res.status(200).json(users)
        return successRes(res, 200, "Users retrieved successfully", users);
    } catch (error) {
        next(error)
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            // return res.status(404).json({ message: "User not found" })
            return errorRes(res, 404, "User not found")
        }
        // return res.status(200).json(user)
        return successRes(res, 200, "Users successfully showing", user);
    } catch (error) {
        next(error)
    }
};

export const addUser = async (req, res, next) => {
    const { name, username, password } = req.body;
    if(!name || !username || !password){
        // return res.status(400).json({ error: "Name, username and password are required" });
        return errorRes(res, 400, "Name, username and password are required");
    }
    try {
        const newUser = new User({
            name,
            username,
            password
        });
        const addUser = await newUser.save();
        // return res.status(201).json({ message: "Successfully added user", addUser })
        return successRes(res, 200, "Successfully added user", addUser);
    } catch (error) {
        next(error)
    }
};

export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, username, password } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { name, username, password },
            { new: true }
        );
        if(!updateUser){
            // return res.status(404).json({ message: "User not found" });
            return errorRes(res, 404, "User not found");
        }
        // return res.status(200).json({ message: "Successfully updated user", updatedUser })
        return successRes(res, 200, "Successfully updated user", updatedUser);
    } catch (error) {
        next(error)
    }
};

export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const delUser = await User.findOneAndDelete({ _id: id });
        if(!delUser){
            // return res.status(404).json({ message: "User not found" });
            return errorRes(res, 404, "User not found");
        }
        // return res.status(200).json({ message: "Successfully deleted user", delUser })
        return successRes(res, 200, "Successfully deleted user", delUser);
    } catch (error) {
        next(error)   
    }
};
