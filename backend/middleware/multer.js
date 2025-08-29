import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Ensure the ./public directory exists
const uploadDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    // console.log('Created public directory:', uploadDir);
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(`Saving file to: ${uploadDir}`);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileName = `${uniqueSuffix}-${file.originalname}`;
        // console.log(`Generated file name: ${fileName}`);
        cb(null, fileName);
    },
});

let upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG and PNG images are allowed'));
        }
    },
});

export default upload;