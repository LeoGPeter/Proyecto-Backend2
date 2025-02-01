import ProductService from "../services/product.service.js";

const productService = new ProductService();

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo productos" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error interno" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error creando producto" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        if (!updatedProduct) return res.status(404).json({ message: "Producto no encontrado" });

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error actualizando producto" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deleted = await productService.deleteProduct(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });

        res.json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error eliminando producto" });
    }
};

