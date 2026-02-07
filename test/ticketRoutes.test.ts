import request from "supertest";
import * as ticketController from "../src/api/v1/controllers/ticketController";
import * as healthController from "../src/api/v1/controllers/healthController";
import app from "../src/app";
import { Priority, Status, Ticket, TicketUrgency, calculateDay } from "../src/api/v1/services/ticketService";

jest.mock("../src/api/v1/controllers/ticketController", () => ({
    healthCheck: jest.fn((req,res) => res.status(200).send()),
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

describe("Mock healthRoutes/ticketRoutes testing", () => {

	describe("GET /api/v1/health", () => {
		it("should call healthCheck function from healthController", async () => {
            // Arrange

            // Act
			await request(app).get("/api/v1/health");

            // Assert
			expect(healthController.healthCheck).toHaveBeenCalled();
		});
	});

	describe("Get /api/v1/tickets", () => {
		it("should call getAllTickets function from ticketController", async () => {
			// Arrange

            // Act
			await request(app).get("/api/v1/tickets");

            // Assert
			expect(ticketController.getAllTickets).toHaveBeenCalled();
		});
	});

    describe("GET /api/v1/tickets/:id", () => {
		it("should call getTicketById function from ticketController", async () => {
			// Arrange
            const mockItem: Ticket = {
                id: 2, 
                title: "Profile picture upload slow", 
                description: "Upload takes 30+ seconds", 
                priority: Priority.Medium,
                status: Status.Open, 
                createdAt: calculateDay(2)
            }

            // Act
            await request(app).get("/api/v1/tickets/2").send(mockItem);

            // Assert
			expect(ticketController.getTicketById).toHaveBeenCalled();
		});
	});


    describe("POST /api/v1/tickets", () => {
		it("should call createTicket from ticketController", async () => {
            // Arrange
            const mockItem = {
                "title": "Testing on createTicket function with Mock item",
                "description": "Mocking fake item to test codes' behavior",
                "priorty": Priority.Medium
            };

            // Act
            await request(app).post("/api/v1/tickets").send(mockItem);

            // Assert
			expect(ticketController.createTicket).toHaveBeenCalled();
		});
	});

});