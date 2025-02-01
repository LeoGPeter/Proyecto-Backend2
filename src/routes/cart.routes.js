import express from "express";
import { getCartById, createCart, updateCart, purchaseCart, addProductToCart } from "../controllers/cartController.js";
import { checkAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/:cid", getCartById);
router.post('/', checkAuth, createCart);
router.put("/:cid", checkAuth, updateCart);
router.post("/:cid/purchase", checkAuth, purchaseCart);

// Esta es la ruta para agregar un producto al carrito, asegurándonos que el método sea POST
router.post("/:cid/add-product", checkAuth, addProductToCart);

export default router;

