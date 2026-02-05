// importing router
import { Router } from "express";
//import * as userController from "../controllers/userController"
import { createTicket, 
    getAllTickets,
    getTicketById, 
    updateTicket, 
    deleteTicket, 
    getUrgentTicketById} from "../controllers/userController"

// initializing express router 
const router: Router = Router();

// get All tickets
router.get("/tickets", getAllTickets);
// get Tickets by id
router.get("/tickets/:id", getTicketById);
// create ticket
router.post("/tickets", createTicket);
// UpdateTicket
router.put("/tickets/:id", updateTicket);
// deleteTicket
router.delete("/tickets/:id", deleteTicket);
// get urgent ticket
router.get("/tickets/:id/urgency", getUrgentTicketById);

export default router;

