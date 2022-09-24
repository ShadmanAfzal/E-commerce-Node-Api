"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatarHandler = void 0;
const multer_1 = __importDefault(require("multer"));
exports.uploadAvatarHandler = (0, multer_1.default)({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if (/\.(jpeg|png|webp|jpg)$/i.test(file.originalname)) {
            return callback(null, true);
        }
        return callback(new Error('Only image files are allowed'));
    },
});
//# sourceMappingURL=uploadAvatarHandler.js.map