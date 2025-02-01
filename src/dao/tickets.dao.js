import TicketModel from "./models/ticket.model.js";

export default class TicketDAO {
    async create(ticketData) {
        return await TicketModel.create(ticketData);
    }

    async getById(id) {
        return await TicketModel.findById(id);
    }
}
