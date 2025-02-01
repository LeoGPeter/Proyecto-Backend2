import CartRepository from "../repositories/cart.repository.js";
import CartDAO from "../dao/carts.dao.js";

const cartRepository = new CartRepository(new CartDAO());

export default class CartService {
    async getCartById(id) {
        return await cartRepository.getById(id);
    }

    async createCart(cartData) {
        return await cartRepository.create(cartData);
    }

    async updateCart(id, cartData) {
        return await cartRepository.update(id, cartData);
    }

    async deleteCart(id) {
        return await cartRepository.delete(id);
    }
}
