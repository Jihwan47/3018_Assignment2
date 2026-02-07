import { getUrgentTicketById, TicketUrgency, Ticket, Priority, Status, calculateDay } from "../src/api/v1/services/ticketService"

describe("getUrgentTicketById", () => {
       it(`should return "low" urgency level, 25 urgency score and appropriate message`, () => {
              // Arrange
 
              // Act
              const result = getUrgentTicketById(1);
 
              // Assert
              expect(result.id).toBe(1);
              expect(result.title).toBe("Update footer copyright year");
              expect(result.priority).toBe("low");
              expect(result.status).toBe("open");
              expect(result.createdAt).toBeInstanceOf(Date);
              expect(result.ticketAge).toBe(3);
              expect(result.urgencyScore).toBe(25);
              expect(result.urgencyLevel).toBe("Low urgency. Address when capacity allows.");
            });
          });

describe("getUrgentTicketById", () => {
       it(`should return "medium" urgency level, 30 urgency score and appropriate message`, () => {
              // Arrange
 
              // Act
              const result = getUrgentTicketById(2);
 
              // Assert
              expect(result.id).toBe(2);
              expect(result.title).toBe("Profile picture upload slow");
              expect(result.priority).toBe("medium");
              expect(result.status).toBe("open");
              expect(result.createdAt).toBeInstanceOf(Date);
              expect(result.ticketAge).toBe(2);
              expect(result.urgencyScore).toBe(30);
              expect(result.urgencyLevel).toBe("Moderate. Schedule for attention.");
            });
          });

describe("getUrgentTicketById", () => {
       it(`should return "medium" urgency level, 30 urgency score and appropriate message`, () => {
              // Arrange
              const sampleTicket: Ticket = {
                "id": 6,
                "title": "Login page not loading",
                "description": "Footer still shows 2024",
                "priority": Priority.Critical,
                "status": Status.Open,
                "createdAt": calculateDay(6),
              }
 
              // Act
              const result: TicketUrgency | null = getUrgentTicketById(sampleTicket.id);
 
              // Assert
              expect(result.ticketAge).toBe(6);
              expect(result.urgencyScore).toBe(80);
              expect(result.urgencyLevel).toBe("Critical. Immediate attention required.");
            });
          });

describe("getUrgentTicketById", () => {
       it(`should return "resolved" urgency level, 0 urgency score and appropriate message`, () => {
              // Arrange
              const sampleTicket: Ticket = {
                "id": 7,
                "title": "Dark mode toggle broken",
                "description": "Footer still shows 2024",
                "priority": Priority.Medium,
                "status": Status.Resolved,
                "createdAt": calculateDay(10),
              }
 
              // Act
              const result: TicketUrgency | null = getUrgentTicketById(sampleTicket.id);
 
              // Assert
              expect(result.ticketAge).toBe(10);
              expect(result.urgencyScore).toBe(0);
              expect(result.urgencyLevel).toBe("Minimal. Ticket resolved");
            });
          });