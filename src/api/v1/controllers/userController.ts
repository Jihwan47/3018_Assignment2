import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as userService from "../services/userService";
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

    if(priorityLevel.includes(priority)){
        res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid priority. Must be one of: critical, high, medium, low",
        });
        return
    }

    try{
        const newTicket = userService.createTicket(title, description, priority);

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
        const tickets = userService.getAllTicket();
        res.status(HTTP_STATUS.OK).json({
            message: "All tickets retrieved successfully",
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
    const idParam = req.params.id;

    //convert it into number
    const id = Number(idParam)

    if(!isNaN(id)){
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid ticket id",
        });
        return;
    }

    try{
        const ticket = userService.getTicketById(id);

        if(!ticket){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Ticket not found",
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message:"Specific ticket retrieved succesfully",
            data: ticket
        });
    } catch {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Ticket not found",
        });
    }
};


