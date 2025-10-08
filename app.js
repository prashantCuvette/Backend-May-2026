import express from "express";
import { connectDatabase } from "./src/configs/db.js";
import dotenv from "dotenv";

// load env variables
dotenv.config();

// initialize app and connect to db
const app = express();
connectDatabase();

// global middlware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


import User from "./src/models/user.model.js";
import bcrypt from "bcryptjs";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })


app.post("/users", upload.single("profileImage"), async (req, res) => {
    try {
        console.log(req.file);
        const { fullName, email, password } = req.body;
        

        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: "fields are missing" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ fullName, email, password: hashedPassword, profileImage });
        await newUser.save(); //it will save into mongodb

        res.status(201).json({ success: true, message: "User Created Successfully", user: newUser })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log(error.message);
    }
});

app.delete("/users", async (req, res) => {
    try {
        const {email} = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is Missing" });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "Email Does Not Exists" });
        }

        await User.deleteOne()

        res.status(204).json({ success: true, message: "User Deleted Successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log(error.message);
    }

});



// start the server
app.listen(3000, () => {
    console.log("Server Running on Port 3000")
});
