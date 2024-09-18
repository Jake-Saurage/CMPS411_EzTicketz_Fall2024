// src/models/tickets.js

import { getIssueTypes } from './issueType'; // Adjust the import based on your actual function
import { getClients } from './clientUsers'; // Function to fetch client IDs
import { getCompanies } from './company'; // Function to fetch company IDs
import { getTechUsers } from './techUsers'; // Function to fetch tech user IDs

class Ticket {
  constructor(
    id,
    ticketTitle,
    ticketDescription,
    resolution,
    creationDate,
    issueID,
    clientID,
    companyID,
    techID,
    ticketNotes
  ) {
    this.id = id; // ID: int
    this.ticketTitle = ticketTitle; // ticketTitle: varchar
    this.ticketDescription = ticketDescription; // ticketDescription: varchar
    this.resolution = resolution; // Resolution: varchar
    this.creationDate = new Date(creationDate); // creationDate: datetimeoffset
    this.issueID = issueID; // issueID: int
    this.clientID = clientID; // ClientID: int
    this.companyID = companyID; // companyID: int
    this.techID = techID; // TechID: int
    this.ticketNotes = ticketNotes; // ticketNotes: varchar
  }
}

// Sample function to create a new ticket
const createTicket = (
  id,
  ticketTitle,
  ticketDescription,
  resolution,
  creationDate,
  issueID,
  clientID,
  companyID,
  techID,
  ticketNotes
) => {
  return new Ticket(
    id,
    ticketTitle,
    ticketDescription,
    resolution,
    creationDate,
    issueID,
    clientID,
    companyID,
    techID,
    ticketNotes
  );
};

// Exporting the Ticket class and createTicket function
export { Ticket, createTicket };
