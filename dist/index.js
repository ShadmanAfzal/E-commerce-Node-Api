"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const productsRoutes_js_1 = __importDefault(require("./routes/productsRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const sellerRoutes_js_1 = __importDefault(require("./routes/sellerRoutes.js"));
const pg_1 = __importDefault(require("pg"));
const errorHandler_js_1 = require("./middlewares/errorHandler.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
exports.client = new pg_1.default.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
exports.client.connect();
app.use('/api/v1/product', productsRoutes_js_1.default);
app.use('/api/v1/user', userRoutes_js_1.default);
app.use('/api/v1/seller', sellerRoutes_js_1.default);
app.use(errorHandler_js_1.errorMiddleware);
app.get('/api/v1/health-check', (req, res) => {
    res.json({ success: true, message: 'server running ok' });
});
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map