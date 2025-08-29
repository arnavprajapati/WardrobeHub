import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error('File path is missing');
        }

        if (!fs.existsSync(filePath)) {
            throw new Error(`File does not exist: ${filePath}`);
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const uploadResult = await cloudinary.uploader.upload(filePath, {
            folder: 'shopCart',
            resource_type: 'image',
        });

        fs.unlinkSync(filePath);
        // console.log(`Uploaded to Cloudinary: ${uploadResult.secure_url}`);
        return uploadResult.secure_url;
    } catch (error) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        // console.error('Cloudinary upload error:', error.message, error.stack);
        throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
};

export default uploadOnCloudinary;