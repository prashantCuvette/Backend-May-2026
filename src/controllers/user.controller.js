import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadImage } from "../utils/cloudinary.js";

// CREATE USER
export const signUpUser = async (req, res) => {
    try {

        const { fullName, email, password } = req.body;
        const profilePicture = req.file;

        if (!fullName || !email || !password || !profilePicture) {
            return res.status(400).json({ success: false, message: "fields are missing" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profilePictureResult = await uploadImage(profilePicture.path);

        const newUser = new User({ fullName, email, password: hashedPassword, profileImage: profilePictureResult.secure_url });
        await newUser.save();

        res.status(201).json({ success: true, message: "User Created Successfully", user: newUser })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log(error.message);
    }
}

// LOGIN USER
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "fields are missing" });
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
        return res.status(400).json({ success: false, message: "Email does not exists" });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    // generate a token
    const token = jwt.sign({ _id: findUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    console.log(token)


    res.status(200).json({ success: true, message: "Login Successful", user: findUser, token });
}

// UPDATE USER
export const updateUser = async (req, res) => {
    const { _id } = req.user;
    const { fullName, password } = req.body;

    if (!fullName || !password) {
        return res.status(400).json({ success: false, message: "fields are missing" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.updateOne({ _id }, { fullName, password: hashedPassword });

    res.status(200).json({ success: true, message: "User Updated Successfully" });
};

// DELETE USER
export const deleteUser = async (req, res) => {
    try {
        const { _id } = req.user;

        if (!_id) {
            return res.status(400).json({ success: false, message: "User ID is Missing" });
        }

        const existingUser = await User.findOne({ _id });
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "User Does Not Exists" });
        }

        await User.deleteOne({ _id });

        res.status(204).json({ success: true, message: "User Deleted Successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log(error.message);
    }

}

// GET SINGLE USER
export const getSingleUser = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log(error.message);
    }
};