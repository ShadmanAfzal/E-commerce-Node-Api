import multer from 'multer';

export const uploadAvatarHandler = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if(/\.(jpeg|png|webp|jpg)$/i.test(file.originalname)){
            return callback(null, true);
        }

        return callback(new Error('Only image files are allowed'));
    },
})