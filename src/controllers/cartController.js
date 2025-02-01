import CartService from "../services/cart.service.js";
import Ticket from '../dao/models/ticket.model.js';
import  Cart  from '../dao/models/cart.model.js';  // Asegúrate de que el modelo esté bien importado
import  User  from '../dao/models/user.model.js';  // Si se relaciona con el usuario, este es un ejemplo de cómo hacerlo
import Product from '../dao/models/product.model.js'; // Asegúrate de tener la ruta correcta al archivo del modelo
import { v4 as uuidv4 } from 'uuid';

const cartService = new CartService();

export const getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        res.json(cart);
    } catch (error) {
        console.error("Error obteniendo carrito:", error);
        res.status(500).json({ message: "Error obteniendo carrito" });
    }
};


export const createCart = async (req, res) => {
    try {
        const userId = req.user.id;  // Asegúrate de que el ID del usuario esté bien en el req.user
        const cart = new Cart({
            user: userId,
            items: []  // El carrito inicialmente está vacío, pero puedes agregar productos luego
        });

        await cart.save();  // Guardamos el carrito en la base de datos
        res.status(201).json({ message: 'Carrito creado', cartId: cart._id });
    } catch (error) {
        console.error("Error al crear el carrito:", error);
        res.status(500).json({ message: 'Error al crear el carrito', error: error.message });
    }
};

export const updateCart = async (req, res) => {
    try {
        const updatedCart = await cartService.updateCart(req.params.cid, req.body);
        if (!updatedCart) return res.status(404).json({ message: "Carrito no encontrado" });

        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Error actualizando carrito" });
    }
};

export const deleteCart = async (req, res) => {
    try {
        const deleted = await cartService.deleteCart(req.params.cid);
        if (!deleted) return res.status(404).json({ message: "Carrito no encontrado" });

        res.json({ message: "Carrito eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error eliminando carrito" });
    }
};

export const purchaseCart = async (req, res) => {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate('items.productId'); // Esto debería poblar los productos

    console.log(cart); // Verifica si los productos están siendo poblados correctamente

    if (!cart) {
        return res.status(404).json({ message: "Carrito no encontrado" });
    }

    let totalAmount = 0;
    const productsNotPurchased = [];

    for (const item of cart.items) {
        const product = item.productId;  // Aquí obtenemos el producto completo
        const requestedQuantity = item.quantity;

        // Verifica si el producto está correctamente poblado con stock
        if (!product) {
            productsNotPurchased.push({
                productId: item.productId,  // En caso de que no se haya poblado correctamente
                message: "Producto no encontrado",
            });
            continue;
        }

        console.log("Producto:", product); // Revisa si el producto tiene la información completa (stock, precio, etc.)

        if (product.stock < requestedQuantity) {
            productsNotPurchased.push({
                productId: product._id,
                productName: product.title,
                requestedQuantity,
                availableStock: product.stock,
            });
        } else {
            product.stock -= requestedQuantity;
            totalAmount += product.price * requestedQuantity;
            await product.save(); // Guardamos el producto con el stock actualizado
        }
    }

    const ticket = {
        code: "b342kjd823",
        purchase_datetime: new Date().toISOString(),
        amount: totalAmount,
        purchaser: req.user.email,
    };

    res.json({
        message: "Compra realizada con éxito",
        ticket,
        productsNotPurchased,
    });
};



export const addProductToCart = async (req, res) => {
    try {
        const { cid } = req.params;  // Obtenemos el ID del carrito desde la URL
        const { productId, quantity } = req.body;  // Obtenemos el ID del producto y la cantidad a añadir
        const userId = req.user.id;  // Usamos el ID del usuario para obtener su carrito

        // Verificar si el carrito existe
        const cart = await Cart.findById(cid);

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        // Verificamos si el producto existe en la base de datos
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Verificamos si hay suficiente stock
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'No hay suficiente stock' });
        }

        // Verificamos si el producto ya está en el carrito
        const productIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (productIndex === -1) {
            // Producto no existe en el carrito, lo agregamos
            cart.items.push({ product: productId, quantity });
        } else {
            // Producto ya existe, actualizamos la cantidad
            cart.items[productIndex].quantity += quantity;
        }

        // Reducimos el stock del producto
        product.stock -= quantity;
        await product.save();

        // Guardamos el carrito actualizado
        await cart.save();

        res.status(200).json({ message: "Producto agregado al carrito", cart });
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        res.status(500).json({ message: "Error al agregar producto al carrito", error: error.message });
    }
};