import express from 'express'
import mongoose from "mongoose";
import Post from "./Post.js";
import router from "./router.js";
import fileUpload from 'express-fileupload'

const PORT = 5000;
const DB_URL = 'mongodb+srv://Viktoriia:FnbdSqQ4Z8ivecx@cluster0.z4tex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express();

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {}, () => console.log('db connected'))
        app.listen(PORT, () => console.log('server started on port ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp().catch(e => console.log(e))
