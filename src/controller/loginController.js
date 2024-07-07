import Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export const login = async (req, res, next) => {
    // const { id } = req.params;
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });

        if(user && bcrypt.compareSync(password, user.password)){
            const token = Jwt.sign(
                {
                    userId: user._id,
                    username: user.username,
                },
                process.env.secret,
                { expiresIn: '1h' }
            );
            return res.status(200).json({ token })
        }
        return res.status(400).json({ error: "username/password salah" });  
    } catch (error) {
        next(error)
    }
}