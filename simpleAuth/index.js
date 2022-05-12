import express from 'express'
import mongoose from "mongoose";
import router from './authRouter.js'

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/auth', router)

const start = () => {
    try {
        mongoose.connect('mongodb+srv://Viktoriia:FnbdSqQ4Z8ivecx@cluster0.z4tex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            () => console.log('db connected'))
        app.listen(PORT, () => console.log("server started on port " + PORT))
    } catch (e) {
        console.log(e)
    }
}

start()