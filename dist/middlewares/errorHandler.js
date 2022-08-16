"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    const message = err.message || 'Internal Server Error';
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ success: false, message: message });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorHandler.js.map