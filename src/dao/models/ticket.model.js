import mongoose from 'mongoose';
import { nanoid } from "nanoid";

const ticketSchema = new mongoose.Schema({
    code: { type: String, default: () => nanoid() },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;




