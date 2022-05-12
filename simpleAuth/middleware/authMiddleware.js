import jwt from "jsonwebtoken";
import {secret} from "../config.js";

export function authMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.status(403).json({message: "User is not authorized"})
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e.message)
        return res.status(403).json({message: "User is not authorized"})
    }
}