"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const queries_1 = __importDefault(require("../services/queries"));
const create_table_products_query = `CREATE TABLE IF NOT EXISTS products(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    title TEXT NOT NULL,
    short_desc TEXT NOT NULL,
    description TEXT NOT NULL,
    photo_url TEXT,
    tag TEXT[],
    seller_id TEXT NOT NULL
);`;
const create_table_users_query = `CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email_id TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    user_profile TEXT NOT NULL,
    phone TEXT NOT NULL CHECK(length(phone) = 10),
    UNIQUE(email_id)
);`;
const create_table_seller_query = `CREATE TABLE IF NOT EXISTS seller_details(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    gst_number TEXT NOT NULL CHECK(length(gst_number) = 15),
    shop_address TEXT NOT NULL,
    mailing_address TEXT NOT NULL,
    pan_number TEXT NOT NULL CHECK(length(pan_number) = 10),
    aadhaar_number TEXT NOT NULL CHECK(length(aadhaar_number) = 12)
);`;
const migrate = async () => {
    await queries_1.default.query(create_table_products_query);
    await queries_1.default.query(create_table_users_query);
    await queries_1.default.query(create_table_seller_query);
    console.log("Migration done successfully");
    (0, process_1.exit)();
};
migrate();
//# sourceMappingURL=migrate.js.map