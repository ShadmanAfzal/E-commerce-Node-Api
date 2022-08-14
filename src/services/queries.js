"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
var pool = new pg_1["default"].Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'shop_api',
    password: 'justin12345',
    port: 5432
});
exports["default"] = pool;
