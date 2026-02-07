/**
 * Represents enumeration of Priority of a ticket
 * Low - Low level or priority
 * Medium - Medium level or priority
 * High - High level or priority
 * Critical - Critical level or priority
 */
export enum Priority{ 
    Low = "low",
    Medium = "medium",
    High = "high",
    Critical = "critical"
};

/**
 * Represents enumeration of status of a ticket
 * Open - Ticket is open and currently in-progres 
 * Resolved - Ticket has been resolved
 */
export enum Status{
    Open = "open",
    Resolved = "resolved"
};

/**
 * Represents a Ticket interface
 * @param id - unique identifier of a ticket
 * @param title - title of a ticket
 * @param description - description of a ticket
 * @param priority - priority of a ticket
 * @param status - status of a ticket
 * @param createdAt - date when the ticket was created 
 */
export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    createdAt: Date;
}

/**
 * Represents a extended version of Ticket type 
 * exclude description from Ticket 
 * include TicketAge, Urgency score and level 
 * @param ticketAge - date difference between current date and creation date
 * @param urgencyScore - number representation of urgency
 * @param urgencyLevel - message representation of urgency
 */
export type TicketUrgency = Omit<Ticket, "description"> & {
    ticketAge: number;
    urgencyScore: number;
    urgencyLevel: string;
};

/**
 * Calculate the day when the ticket was created based on the ticketAge
 * @param days: number - represent ticket age.
 */
export const calculateDay = (days: number) => new Date(Date.now() - days * 1000 * 60 * 60 * 24);

// Ticket array that represent ticket information
const tickets: Ticket[] = [
    {id: 1, title: "Update footer copyright year", description: "Footer still shows 2024", priority: Priority.Low, status: Status.Open, createdAt: calculateDay(3)},
    {id: 2, title: "Profile picture upload slow", description: "Upload takes 30+ seconds", priority: Priority.Medium, status: Status.Open, createdAt: calculateDay(2)},
    {id: 3, title: "Dashboard loading slowly", description: "Dashboard takes 10+ seconds to load", priority: Priority.Medium, status: Status.Open, createdAt: calculateDay(6)},
    {id: 4, title: "Password reset email delayed", description: "Reset emails taking over 30 minutes", priority: Priority.High, status: Status.Open, createdAt: calculateDay(5)},
    {id: 5, title: "Export to PDF not working", description: "PDF export fails silently", priority: Priority.High, status: Status.Open, createdAt: calculateDay(9)},
    {id: 6, title: "Login page not loading", description: "Users report blank screen on login", priority: Priority.Critical, status: Status.Open, createdAt: calculateDay(6)},
    {id: 7, title: "Dark mode toggle broken", description: "Dark mode doesn't persist after refresh", priority: Priority.Medium, status: Status.Resolved, createdAt: calculateDay(10)},
    {id: 8, title: "Threshold Testing", description: "To find out where the threshold is", priority: Priority.Medium, status: Status.Open, createdAt: calculateDay(3)}
];

/**
 * Create ticket 
 * @param title - ticket title of an issue
 * @param description - detail description of an issue
 * @param priority - priority level of an issue
 * returns ticket variable include id with input parameter, 
 * status of new ticket will always be open until resolved and date when ticket was created
 */
export const createTicket = (title: string, description: string, priority: Priority): Ticket => {

    // increment the ticket array by 1
    const newId = tickets.length + 1;

    // validate if required fields are provided
    if(!title || !description || !priority){
        throw new Error("Missing required fields")
    }

    // create new ticket
    const newTicket: Ticket = 
    {
        id: newId,
        title,
        description,
        priority,
        status: Status.Open,
        createdAt: new Date()
    }

    // push the ticket information to the array
    tickets.push(newTicket);
    return newTicket;
};

/**
 * Retrieve all tickets in the ticket array
 * returns all tickets in the array
 * with total number of tickets in the array (will be handled in controller)
 */
export const getAllTicket = (): Ticket[] =>{

    return tickets;
};

/**
 * retrieve a ticket by id
 * @param id: number - unique identifier of a ticket 
 * returns ticket if the id is valid 
 * throws an error if id is invalid
 */
export const getTicketById = (id: number): Ticket | undefined => {

    // search the ticket array and return the first item that matches with the id
    const ticket = tickets.find(t => t.id === id);

    // ticket validation
    if(!ticket){
        throw new Error("Ticket not found");
    }

    return ticket;
};

/**
 * update a specific ticket with the id
 * @param id: number - unique identifier of a ticket 
 * @param data: any - receive any type of data that updates the ticket
 * return Ticket varaible with updated information
 * throw an error if the id is invalid
 */
export const updateTicket = (id: number, data: any): Ticket | undefined => {

    // get specific ticket with id paramter
    const ticket = getTicketById(id);

    // validate if ticket is available
    if(!ticket){
        throw new Error("Ticket not found");
    }

    // validate if date is title data
    if(data.title !== undefined){
        ticket.title = data.title;
    }

    // validate if date is description data
    if(data.description !== undefined){
        ticket.description = data.description;
    }

    // validate if date is priority data
    if(data.priority !== undefined){
        ticket.priority = data.priority;
    }

    // validate if date is status data
    if(data.status !== undefined){
        ticket.status = data.status;
    }

    return ticket;
};

/**
 * delete specific ticket
 * @param id: number - unique identifier of a ticket
 * return N/A
 * Remove specific existing data with the id
 * throw an error when the id is invalid
 */
export const deleteTicket = (id: number): void => {

    // find the index position of a ticket with the id 
    const index: number = tickets.findIndex(ticket => ticket.id === id);

    // validate if index is available
    if(index === -1){
        throw new Error("Ticket not found");
    };

    // splice 1 item in index position
    tickets.splice(index, 1);
};

/**
 * retrieve a ticket by id with urgency information
 * @param id: number - unique identifier of a ticket
 * returns ticketUrgency variable of a ticket
 * thorw an error if id is invalid
 */
export const getUrgentTicketById = (id: number): TicketUrgency => {

    // find ticket by id
    const ticket = getTicketById(id);

    // validate if ticket exists or not
    if(!ticket){
        throw new Error("Ticket not found");
    }

    // calculate age of a ticket in days (diffInDays)
    const diffInDays: number = 1000 * 60 * 60 * 24;
    let ticketAge: number = Math.round((Date.now() - ticket.createdAt.getTime())/diffInDays);

    // assign baseScore value based on the priority level
    let baseScore: number = 0;
    if(ticket.priority === Priority.Critical){
        baseScore = 50;
    }else if(ticket.priority === Priority.High){
        baseScore = 30;
    }else if(ticket.priority === Priority.Medium){
        baseScore = 20;
    }else{
        baseScore = 10;
    }

    // calculate urgency score 
    const multiplier: number = 5;
    let urgencyScore: number = Math.round(baseScore + (ticketAge * multiplier));

    //initialize empty string
    let urgencyLevel: string = "";

    // assign urgency level with appropriate message based on the urgency score
    if(ticket.status === Status.Resolved){
        urgencyLevel = "Minimal. Ticket resolved";
        urgencyScore = 0;
    }else if(urgencyScore >= 80){
        urgencyLevel = "Critical. Immediate attention required.";
    }else if(urgencyScore > 51){
        urgencyLevel = "High urgency. Prioritize resolution.";
    }else if(urgencyScore >= 30){
        urgencyLevel = "Moderate. Schedule for attention.";
    }else{
        urgencyLevel = "Low urgency. Address when capacity allows.";
    }

    // return ticket with urgency information
    return{
        id: ticket.id,
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        createdAt: ticket.createdAt,
        ticketAge,
        urgencyScore,
        urgencyLevel
    };
}

