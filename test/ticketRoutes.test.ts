import request from "supertest";
import express from "express";
import ticketRoutes from "../src/api/v1/routes/ticketRoutes";
import * as controller from "../src/api/v1/controllers/ticketController";
import app from "../src/app";

jest.mock("../src/api/v1/controllers/ticketController", () => ({
    createTicket: jest.fn((req, res) => res.status(200).send()),
    getAllTickets: jest.fn((req, res) => res.status(201).send()),
    getTicketById: jest.fn((req, res) => res.status(200).send()),
    updateTicket: jest.fn((req, res) => res.status(200).send()),
    deleteTicket: jest.fn((req, res) => res.status(200).send()),
    getUrgentTicketById: jest.fn((req, res) => res.status(200).send())
}));

describe("Mock healthRoutes/ticketRoutes testing", () => {

	describe("GET /api/v1/health", () => {
		it("should call health", async () => {
			await request(app).get("/api/v1/health");
			expect(controller.getAll).toHaveBeenCalled();
		});
	});

	describe("POST /api/v1/resource", () => {
		it("should call create controller", async () => {
			await request(app).post("/api/v1/resource").send({
				/* mock data */
			});
			expect(controller.create).toHaveBeenCalled();
		});
	});

});