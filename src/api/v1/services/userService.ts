enum Priority{ 
    Low = "low",
    Medium = "medium",
    High = "high",
    Critical = "critical"
};

enum Status{
    Open = "open",
    Close = "close",
    Resolved = "resolved"
};

//Interface of ticket
interface Ticket {
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
type TicketUrgency = Omit<Ticket, "description"> & {
    ticketAge: number;
    urgencyScore: number;
    urgencyLevel: string;
};

// Tickets
const tickets: Ticket[] = [
    {id: 1, title: "Update footer copyright year", description: "Footer still shows 2024", priority: Priority.Low, status: Status.Open, createdAt: new Date()},
    {id: 2, title: "Profile picture upload slow", description: "Upload takes 30+ seconds", priority: Priority.Medium, status: Status.Open, createdAt: new Date()},
    {id: 3, title: "Dashboard loading slowly", description: "Dashboard takes 10+ seconds to load", priority: Priority.Medium, status: Status.Open, createdAt: new Date()},
    {id: 4, title: "Password reset email delayed", description: "Reset emails taking over 30 minutes", priority: Priority.High, status: Status.Open, createdAt: new Date()},
    {id: 5, title: "Export to PDF not working", description: "PDF export fails silently", priority: Priority.High, status: Status.Open, createdAt: new Date()},
    {id: 6, title: "Login page not loading", description: "Users report blank screen on login", priority: Priority.Critical, status: Status.Open, createdAt: new Date()},
    {id: 7, title: "Dark mode toggle broken", description: "Dark mode doesn't persist after refresh", priority: Priority.Medium, status: Status.Resolved, createdAt: new Date()},

];

export const createTicket = (id: number, title: string, description: string, priority: Priority, status: Status,createdAt: Date): Ticket => {

    return { id: id, title: title, description: description, priority: priority, status: status, createdAt: createdAt };

};

