export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getById(id) {
        return await this.dao.getById(id);
    }

    async getByEmail(email) {
        return await this.dao.getByEmail(email);
    }

    async create(userData) {
        return await this.dao.create(userData);
    }
}
