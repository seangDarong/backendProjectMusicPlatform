import jwt from "jsonwebtoken"

const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader || ! authHeader.startWith("Bearer")) {
        return res.status(401).json({message : "No token provided."});
    }
}