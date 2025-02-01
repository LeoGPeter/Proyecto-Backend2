import TicketRepository from "../repositories/ticket.repository.js";
import TicketDAO from "../dao/tickets.dao.js";

const ticketRepository = new TicketRepository(new TicketDAO());

export default class TicketService {
    async createTicket(ticketData) {
        return await ticketRepository.create(ticketData);
    }

    async getTicketById(id) {
        return await ticketRepository.getById(id);
    }
}
