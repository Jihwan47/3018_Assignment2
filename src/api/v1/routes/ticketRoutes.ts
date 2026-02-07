// importing router
import { Router } from "express";
//import * as userController from "../controllers/userController"
import { createTicket, 
    getAllTickets,
    getTicketById, 
    updateTicket, 
    deleteTicket, 
    getUrgentTicketById} from "../controllers/ticketController"

// initializing express router 
const router: Router = Router();

// get All tickets
router.get("/tickets", getAllTickets);
// get a ticket by id
router.get("/tickets/:id", getTicketById);
// create a ticket
router.post("/tickets", createTicket);
// Update an existing ticket
router.put("/tickets/:id", updateTicket);
// delete an existing ticket
router.delete("/tickets/:id", deleteTicket);
// get an urgency ticket
router.get("/tickets/:id/urgency", getUrgentTicketById);

export default router;

