import jwt from "jsonwebtoken";
import {secret} from "../config.js";

export function roleMiddleware(roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(" ")[1]
            if (!token) {
                return res.status(403).json({message: "User is not authorized"})
            }
            const {roles: userRoles} = jwt.verify(token, secret)
            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) hasRole = true
            })
            if (!hasRole) {
                res.status(403).json({message: 'You do not have a permission'})
            }
            next()
        } catch (e) {
            console.log(e.message)
            return res.status(403).json({message: "User is not authorized"})
        }
    }
}