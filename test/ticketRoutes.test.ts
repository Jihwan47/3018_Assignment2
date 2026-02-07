import request from "supertest";
import * as ticketController from "../src/api/v1/controllers/ticketController";
import * as healthController from "../src/api/v1/controllers/healthController";
import app from "../src/app";
import { Priority, Status, Ticket, TicketUrgency, calculateDay } from "../src/api/v1/services/ticketService";

// set this controller function to return 200 default, so that i can check whether 
// the router correctly calls the controller without testing the actual logic or using API
jest.mock("../src/api/v1/controllers/ticketController", () => ({
    createTicket: jest.fn((req, res) => res.status(200).send()),
    getAllTickets: jest.fn((req, res) => res.status(201).send()),
    getTicketById: jest.fn((req, res) => res.status(200).send()),
    updateTicket: jest.fn((req, res) => res.status(200).send()),
    deleteTicket: jest.fn((req, res) => res.status(200).send()),
    getUrgentTicketById: jest.fn((req, res) => res.status(200).send())
}));
jest.mock("../src/api/v1/controllers/healthController", () => ({
    healthCheck: jest.fn((req,res) => res.status(200).send())
}));

// Main test suite for routes using Mock
describe("Mock healthRoutes/ticketRoutes testing", () => {

    // Reset mock before each time
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // test health endpoint
	describe("GET /api/v1/health", () => {
		it("should call healthCheck function from healthController", async () => {
            // Arrange

            // Act: send GET request to health endpoint
			await request(app).get("/api/v1/health");

            // Assert: ensure that controller function was called
			expect(healthController.healthCheck).toHaveBeenCalled();
		});
	});

    // test retrieve all tickets
	describe("Get /api/v1/tickets", () => {
		it("should call getAllTickets function from ticketController", async () => {
			// Arrange

            // Act: send GET request to tickets endpoint
			await request(app).get("/api/v1/tickets");

            // Assert: ensure that controller function was called
			expect(ticketController.getAllTickets).toHaveBeenCalled();
		});
	});

    // test retrieve ticket by id
    describe("GET /api/v1/tickets/:id", () => {
		it("should call getTicketById function from ticketController", async () => {
			// Arrange: create a mock ticket item
            const mockItem: Ticket = {
                id: 2, 
                title: "Profile picture upload slow", 
                description: "Upload takes 30+ seconds", 
                priority: Priority.Medium,
                status: Status.Open, 
                createdAt: calculateDay(2)
            }

            // Act: send Get reqeust to the ticket id endpoint
            await request(app).get("/api/v1/tickets/2").send(mockItem);

            // Assert: ensure that controller function was called
			expect(ticketController.getTicketById).toHaveBeenCalled();
		});
	});

    // test create ticket
    describe("POST /api/v1/tickets", () => {
		it("should call createTicket from ticketController", async () => {
            // Arrange: create a mock ticket item
            const mockItem = {
                "title": "Testing on createTicket function with Mock item",
                "description": "Mocking fake item to test codes' behavior",
                "priority": Priority.Medium
            };

            // Act: send POST reqeust to the ticket endpoint
            await request(app).post("/api/v1/tickets").send(mockItem);

            // Assert: ensure that controller function was called
			expect(ticketController.createTicket).toHaveBeenCalled();
		});
	});
    
    // test update ticket
    describe("PUT /api/v1/tickets/:id", () => {
		it("should call updateTicket from ticketController", async () => {
            // Arrange: create a mock ticket item
            const mockItem = {
                "id": 1,
                "priority": Priority.Critical,
                "status": Status.Resolved
            };
            
            // Act: send PUT reqeust to the ticket id endpoint
            await request(app).put("/api/v1/tickets/1").send(mockItem);

            // Assert: ensure that controller function was called
			expect(ticketController.updateTicket).toHaveBeenCalled();
		});
	});

    // test delete ticket
    describe("DELETE /api/v1/tickets/:id", () => {
		it("should call updateTicket from ticketController", async () => {
            // Arrange
            
            // Act: send DELETE request to the ticket id endpoint
            await request(app).delete("/api/v1/tickets/5");

            // Assert: ensure that controller function was called
			expect(ticketController.deleteTicket).toHaveBeenCalled();
		});
	});
    // test get urgentTicket 
    describe("GET /api/v1/tickets/:id/urgency", () => {
		it("should call getUrgentTicketById function from ticketController", async () => {
			// Arrange: create a mock ticket item
            const mockItem: TicketUrgency = {
                id: 4, 
                title: "Password reset email delayed", 
                priority: Priority.High, 
                status: Status.Open, 
                createdAt: calculateDay(5),
                ticketAge: 5,
                urgencyScore: 55,
                urgencyLevel: "High urgency, Prioritize resolution."
            }

            // Act: send GET reqeust to the ticket id urgency endppoint
            await request(app).get("/api/v1/tickets/4/urgency").send(mockItem);

            // Assert: ensure that controller function was called
			expect(ticketController.getUrgentTicketById).toHaveBeenCalled();
		});
	});
});