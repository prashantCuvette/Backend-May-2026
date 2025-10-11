import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// uploading image to cloudinary
export const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return result;
    } catch (error) {
        throw new Error("Error uploading image to Cloudinary");
    }
};

// deleting image from cloudinary
export const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error("Error deleting image from Cloudinary");
    }
};
