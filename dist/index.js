"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const productsRoutes_js_1 = __importDefault(require("./routes/productsRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const sellerRoutes_js_1 = __importDefault(require("./routes/sellerRoutes.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use('/api/v1/product', productsRoutes_js_1.default);
app.use('/api/v1/user', userRoutes_js_1.default);
app.use('/api/v1/seller', sellerRoutes_js_1.default);
app.get('/', (req, res) => {
    res.json({ 'success': true });
});
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map