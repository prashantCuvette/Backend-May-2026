import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
}, {timestamps: true});

const User = mongoose.model("Users", userSchema);

export default User;

