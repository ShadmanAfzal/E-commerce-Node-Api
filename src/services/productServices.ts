import User from '../model/user.js';
import UserType from '../enum/userType.js';
import Product from '../model/product.js';
import { client } from '../index.js';
import ErrorHandler from '../utils/error.js';

export async function addProduct(product: Product, user: User) {

    if (!product.tag) {
        product.tag = []
    }

    const query = `INSERT INTO products (title,short_desc,description,photo_url, tag, seller_id) VALUES('${product.title}', '${product.short_desc}', '${product.description}', '${product.image_url}', '{${product.tag.join(',')}}', '${user.id}');`;

    const result = await client.query(query);

    if (result.rowCount >= 1) {
        return { 'success': true, 'message': 'product added successfully' };
    }

    throw new ErrorHandler(400, `Product can\'t be added`);
}

export async function getProductById(id: string) {
    const query = `SELECT * FROM products WHERE id = '${id}';`;

    const result = await client.query(query);

    if (result.rowCount >= 1) {
        return { 'success': true, 'data': result.rows[0] };
    }

    throw new ErrorHandler(404, `No product found with id ${id}`);
}

export async function getProduct() {
    const result = await client.query(`SELECT * FROM products;`);

    return result.rows;
}

export async function deleteProduct(productId: string, user_id: string) {

    const query = `SELECT * FROM products where id='${productId}'`;

    const productResult = await client.query(query);

    if (productResult.rowCount === 0) {
        return { success: false, message: 'No products found' };
    }

    const product = productResult.rows[0];

    if (user_id !== product.seller_id) {
        throw new ErrorHandler(401, `unauthorized to delete products with id ${productId}`);
    }

    const result = await client.query(`DELETE FROM products WHERE id = '${productId}';`);

    if (result.rowCount >= 1) {
        return { 'success': true, 'message': 'product deleted successfully' };
    }

    throw new ErrorHandler(404, `No product found with id ${productId}`);
}

export async function myProducts(seller_id: string) {

    const query = `SELECT * FROM products WHERE seller_id = '${seller_id}';`;

    const result = await client.query(query);

    if (result.rowCount >= 1) {
        return { 'success': true, 'data': result.rows };
    }

    throw new ErrorHandler(404, `No product found`);
}

export const updateProduct = async (productInfo: Product, seller_id: string) => {

    const product_id = productInfo.id;

    const query = `SELECT * FROM products where id='${product_id}'`;

    const productResult = await client.query(query);

    if (productResult.rowCount === 0) {
        throw new ErrorHandler(404, `No product found`);
    }

    const product = productResult.rows[0];

    if (seller_id !== product.seller_id) {
        throw new ErrorHandler(404, `unauthorized to update products with id ${productInfo.id}`);
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

    await client.query(updateQuery);

    return { success: true, message: 'product updated successfully' };
}

export const searchViaTag = async (tag: string[]) => {

    const formattedTag = tag.map(t => `"${t}"`).join(',');

    const searchQuery = `SELECT * FROM products WHERE tag && '{${formattedTag}}'`;

    const searchQueryResult = await client.query(searchQuery);

    return { success: true, data: searchQueryResult.rows };
}