import TicketService from "../services/ticket.service.js";

const ticketService = new TicketService();

export const createTicket = async (req, res) => {
    try {
        const ticket = await ticketService.createTicket(req.body);
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: "Error creando ticket" });
    }
};

export const getTicketById = async (req, res) => {
    try {
        const ticket = await ticketService.getTicketById(req.params.id);
        if (!ticket) return res.status(404).json({ message: "Ticket no encontrado" });

        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo ticket" });
    }
};
