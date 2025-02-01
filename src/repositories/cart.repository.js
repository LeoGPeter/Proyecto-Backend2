export default class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getById(id) {
        return await this.dao.getById(id);
    }

    async create(cartData) {
        return await this.dao.create(cartData);
    }

    async update(id, cartData) {
        return await this.dao.update(id, cartData);
    }

    async delete(id) {
        return await this.dao.delete(id);
    }
}

