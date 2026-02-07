
export enum Priority{ 
    Low = "low",
    Medium = "medium",
    High = "high",
    Critical = "critical"
};

export enum Status{
    Open = "open",
    Resolved = "resolved"
};

//Interface of ticket
export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    createdAt: Date;
}

// extending Ticket interface using Type
// Remove description from the original Ticket interface using Omit
// and add urgent variables
export type TicketUrgency = Omit<Ticket, "description"> & {
    ticketAge: number;
    urgencyScore: number;
    urgencyLevel: string;
};

// generate dates relative to now
export const calculateDay = (days: number) => new Date(Date.now() - days * 1000 * 60 * 60 * 24);

// Tickets
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

export const createTicket = (title: string, description: string, priority: Priority): Ticket => {

    const newId = tickets.length + 1;

    if(!title || !description || !priority){
        throw new Error("Missing required fields")
    }

    const newTicket: Ticket = 
    {
        id: newId,
        title,
        description,
        priority,
        status: Status.Open,
        createdAt: new Date()
    }

    tickets.push(newTicket);
    return newTicket;
};

// return all tickets in the array.
export const getAllTicket = (): Ticket[] =>{

    return tickets;
};

export const getTicketById = (id: number): Ticket | undefined => {

    const ticket = tickets.find(t => t.id === id);

    if(!ticket){
        throw new Error("Ticket not found");
    }

    return ticket;
};

export const updateTicket = (id: number, data: any): Ticket | undefined => {

    const ticket = getTicketById(id);

    if(!ticket){
        throw new Error("Ticket not found");
    }

    if(data.title !== undefined){
        ticket.title = data.title;
    }

    if(data.description !== undefined){
        ticket.description = data.description;
    }

    if(data.priority !== undefined){
        ticket.priority = data.priority;
    }

    if(data.status !== undefined){
        ticket.status = data.status;
    }

    return ticket;
};

export const deleteTicket = (id: number): void => {

    const index: number = tickets.findIndex(ticket => ticket.id === id);

    if(index === -1){
        throw new Error("Ticket not found");
    };

    // slice 1 item in index position
    tickets.splice(index, 1);
};

export const getUrgentTicketById = (id: number): TicketUrgency => {

    const ticket = getTicketById(id);

    if(!ticket){
        throw new Error("Ticket not found");
    }

    const diffInDays: number = 1000 * 60 * 60 * 24;
    let ticketAge: number = Math.round((Date.now() - ticket.createdAt.getTime())/diffInDays);

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

    const multiplier: number = 5;
    let urgencyScore: number = Math.round(baseScore + (ticketAge * multiplier));

    let urgencyLevel: string = "";

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

