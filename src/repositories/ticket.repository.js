export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async create(ticketData) {
        return await this.dao.create(ticketData);
    }

    async getById(id) {
        return await this.dao.getById(id);
    }
}
