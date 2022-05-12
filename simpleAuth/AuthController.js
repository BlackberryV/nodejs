import User from "./models/User.js";
import bcrypt from 'bcryptjs'
import Role from "./models/Role.js";
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import {secret} from "./config.js";

const generateAccessToken = (id, roles) => {
    const payload = {id, roles}
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class AuthController {
    async register(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({message: 'Wrong email or password', errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                res.status(400).json({message: 'Such a user already exists'})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: 'User registered!'})
        } catch (e) {
            console.log(e.message)
            res.status(400).json({message: 'Register error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username: username})
            if (!user) {
                res.status(400).json({message: "Such a user does not exit"})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                res.status(400).json({message: "Wrong password"})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e.message)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.status(200).json(users)
        } catch (e) {
            console.log(e.message)
        }
    }
}

export default new AuthController();