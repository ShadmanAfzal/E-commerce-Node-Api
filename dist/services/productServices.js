"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchViaTag = exports.updateProduct = exports.myProducts = exports.deleteProduct = exports.getProduct = exports.getProductById = exports.addProduct = void 0;
const queries_js_1 = __importDefault(require("./queries.js"));
async function addProduct(product, user) {
    if (!product.tag) {
        product.tag = [];
    }
    const query = `INSERT INTO products (title,short_desc,description,photo_url, tag, seller_id) VALUES('${product.title}', '${product.short_desc}', '${product.description}', '${product.image_url}', '{${product.tag.join(',')}}', '${user.id}');`;
    const result = await queries_js_1.default.query(query);
    if (result.rowCount >= 1) {
        return { 'success': true, 'message': 'product added successfully' };
    }
    return { 'status': 'product can\'t be added' };
}
exports.addProduct = addProduct;
async function getProductById(id) {
    const query = `SELECT * FROM products WHERE id = '${id}';`;
    const result = await queries_js_1.default.query(query);
    if (result.rowCount >= 1) {
        return { 'success': true, 'data': result.rows[0] };
    }
    return { 'status': `No product found with id ${id}` };
}
exports.getProductById = getProductById;
async function getProduct() {
    const result = await queries_js_1.default.query(`SELECT * FROM products;`);
    return result.rows;
}
exports.getProduct = getProduct;
async function deleteProduct(productId, user_id) {
    const query = `SELECT * FROM products where id='${productId}'`;
    const productResult = await queries_js_1.default.query(query);
    if (productResult.rowCount === 0) {
        return { success: false, message: 'No products found' };
    }
    const product = productResult.rows[0];
    if (user_id !== product.seller_id) {
        return { 'success': false, 'message': `unauthorized to delete products with id ${productId}` };
    }
    const result = await queries_js_1.default.query(`DELETE FROM products WHERE id = '${productId}';`);
    if (result.rowCount >= 1) {
        return { 'success': true, 'message': 'product deleted successfully' };
    }
    return { 'success': false, 'message': `No product found with id ${productId}` };
}
exports.deleteProduct = deleteProduct;
async function myProducts(seller_id) {
    const query = `SELECT * FROM products WHERE seller_id = '${seller_id}';`;
    const result = await queries_js_1.default.query(query);
    if (result.rowCount >= 1) {
        return { 'success': true, 'data': result.rows };
    }
    return { 'status': `No product found` };
}
exports.myProducts = myProducts;
const updateProduct = async (productInfo, seller_id) => {
    const product_id = productInfo.id;
    const query = `SELECT * FROM products where id='${product_id}'`;
    const productResult = await queries_js_1.default.query(query);
    if (productResult.rowCount === 0) {
        return { success: false, message: 'no products found' };
    }
    const product = productResult.rows[0];
    if (seller_id !== product.seller_id) {
        return { 'success': false, 'message': `unauthorized to update products with id ${productInfo.id}` };
    }
    if (productInfo.title) {
        product.title = productInfo.title;
    }
    if (productInfo.short_desc) {
        product.short_desc = productInfo.short_desc;
    }
    if (productInfo.description) {
        product.description = productInfo.description;
    }
    if (productInfo.image_url) {
        product.photo_url = productInfo.image_url;
    }
    if (productInfo.tag) {
        product.tag = productInfo.tag;
    }
    const updateQuery = `UPDATE products set title='${product.title}', short_desc='${product.short_desc}', description='${product.description}', photo_url='${product.photo_url}', tag='{${product.tag.join(',')}}' where id='${product_id}'`;
    await queries_js_1.default.query(updateQuery);
    return { success: true, message: 'product updated successfully' };
};
exports.updateProduct = updateProduct;
const searchViaTag = async (tag) => {
    const formattedTag = tag.map(t => `"${t}"`).join(',');
    const searchQuery = `SELECT * FROM products WHERE tag && '{${formattedTag}}'`;
    const searchQueryResult = await queries_js_1.default.query(searchQuery);
    return { success: true, data: searchQueryResult.rows };
};
exports.searchViaTag = searchViaTag;
//# sourceMappingURL=productServices.js.map