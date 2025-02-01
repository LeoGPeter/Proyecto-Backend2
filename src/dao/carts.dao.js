import CartModel from "./models/cart.model.js";

export default class CartDAO {
    async getById(id) {
        return await CartModel.findById(id).populate("products.product");
    }

    async create(cartData) {
        return await CartModel.create(cartData);
    }

    async update(id, cartData) {
        return await CartModel.findByIdAndUpdate(id, cartData, { new: true });
    }

    async delete(id) {
        return await CartModel.findByIdAndDelete(id);
    }
}
