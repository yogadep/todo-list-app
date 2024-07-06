import User from "../models/user.js";

export const getUser = async (req, res, next) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        
    }
}

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
        return res.status(200).json({ message: "Successfully added activity", addUser })
    } catch (error) {
        next(error)
    }
}