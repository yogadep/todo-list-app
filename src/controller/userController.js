import User from "../models/user.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({ message: "User not found" })
        }
        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
};

export const addUser = async (req, res, next) => {
    const { name, username, password } = req.body;
    if(!name || !username || !password){
        return res.status(400).json({ error: "Name, username and password are required" });
    }
    try {
        const newUser = new User({
            name,
            username,
            password
        });
        const addUser = await newUser.save();
        return res.status(200).json({ message: "Successfully added user", addUser })
    } catch (error) {
        next(error)
    }
};

export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, username, password } = req.body;
    try {
        const user = {
            name,
            username,
            password
        };
        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $set: user },
            { new: true }
        );
        return res.status(200).json({ message: "Successfully added user", updatedUser })
    } catch (error) {
        next(error)
    }
};

export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const delUser = await User.findOneAndDelete({ _id: id });
        return res.status(200).json({ message: "Successfully deleted user", delUser })
    } catch (error) {
        next(error)   
    }
};
