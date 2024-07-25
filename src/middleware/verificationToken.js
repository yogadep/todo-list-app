import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if(!token){
            return res.status(400).json({error: "token not found"})
        }
        
        const decoded = jwt.verify(token, process.env.secret); 
        req.user = decoded; 
        next(); 
    } catch (error) {
        // res.status(401).json({ error: "Token is invalid or expired" });
        next(error)
    }
};