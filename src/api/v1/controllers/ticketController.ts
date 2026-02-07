import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as ticketService from "../services/ticketService";
//createTicket, retrieveAllTicket

// POST /api/v1/tickets
// create ticket
export const createTicket = (req: Request, res: Response): void => {
    const{title, description, priority} = req.body;

    // Title validation
    if(!title){
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Missing required field: title",
        });
        return;
    }

    // description validation
    if(!description){
        res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Missing required field: description",
        });
        return;
    }

    const priorityLevel = ["critical", "high", "medium", "low" ]

    if(!priorityLevel.includes(priority)){
        res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid priority. Must be one of: critical, high, medium, low",
        });
        return
    }

    try{
        const newTicket = ticketService.createTicket(title, description, priority);

        res.status(HTTP_STATUS.CREATED).json({
            message: "Ticket created successfully",
            data: newTicket
        });

    } catch {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to create ticket.",
        });
    }
};

//retrieve
export const getAllTickets = (req: Request, res: Response): void => {
    try{
        const tickets = ticketService.getAllTicket();

        const count = tickets.length;

        res.status(HTTP_STATUS.OK).json({
            message: "All tickets retrieved successfully",
            count: count,
            data: tickets
        });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve tickets",
        });
    }
};

//retrieve
export const getTicketById = (req: Request, res: Response): void => {
    //extract
    const id: number = Number(req.params.id);

    if(isNaN(id)){
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid ticket id",
        });
        return;
    }
    
    try{
        const ticket = ticketService.getTicketById(id);

        res.status(HTTP_STATUS.OK).json({
            message:"Specific ticket retrieved succesfully",
            data: ticket
        });
    } catch {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found",
        });
    }
};

export const updateTicket = (req: Request, res: Response): void => {

    const id: number = Number(req.params.id);

    if(isNaN(id)){
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid ticket id",
        });
        return;
    }
    try{
        const updateTicket = ticketService.updateTicket(id, req.body); 

        res.status(HTTP_STATUS.OK).json({
            message: "Ticket succesfully updated",
            data: updateTicket
        });
    } catch {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Failed to update the ticket",
        });
    }
};

export const deleteTicket = (req: Request, res: Response): void => {

    const id: number = Number(req.params.id);

    if(isNaN(id)){
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid ticket id",
        });
        return;
    }

    try{
        const deleteTicket = ticketService.deleteTicket(id); 

        res.status(HTTP_STATUS.OK).json({
            message: "Ticket succesfully deleted",
            data: deleteTicket
        });
    } catch {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found",
        });
    }
};

export const getUrgentTicketById = (req: Request, res: Response): void => {

    const id: number = Number(req.params.id);

    if(isNaN(id)){
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid ticket id",
        });
        return;
    }

    try{
        const urgentTicket = ticketService.getUrgentTicketById(id); 

        res.status(HTTP_STATUS.OK).json({
            message: "Ticket urgency retrieved successfully",
            data: urgentTicket
        });
    } catch {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found",
        });
    }
};
