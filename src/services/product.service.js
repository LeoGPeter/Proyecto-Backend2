import ProductRepository from "../repositories/product.repository.js";
import ProductDAO from "../dao/products.dao.js";

const productRepository = new ProductRepository(new ProductDAO());

export default class ProductService {
    async getAllProducts() {
        return await productRepository.getAll();
    }

    async getProductById(id) {
        return await productRepository.getById(id);
    }

    async createProduct(productData) {
        return await productRepository.create(productData);
    }

    async updateProductStock(productId, quantity) {
        try {
            const product = await Product.findById(productId);
            if (!product) throw new Error("Producto no encontrado");

            product.stock -= quantity; // Descontar el stock del producto
            if (product.stock < 0) throw new Error("Stock insuficiente");

            await product.save();
            return product;
        } catch (error) {
            throw new Error(`Error actualizando el stock: ${error.message}`);
        }
    }

    async deleteProduct(id) {
        return await productRepository.delete(id);
    }
}
