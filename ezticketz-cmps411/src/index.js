import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TechUserPage from './TechUsersPage';
import TechUserDetails from './TechUserDetails';
import CompanyPage from './CompanyPage';
import SignIn from './SignIn';
import TicketsPage from './TicketsPage';
import CompanyDetail from './CompanyDetail';
import ClientDetails from './ClientDetails';
import NewClient from './NewClient';
import NewTechUser from './NewTechUser';
import Technicians from './Technicians';
import TicketDetails from './TicketDetails';
import TicketsList from './TicketList';
import NewTicket from './NewTicket';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './Layout';

const router = createBrowserRouter([
  {
    path: "/", // Root path now points to SignIn
    element: (
      <SignIn /> // SignIn page as the default landing page
    ),
  },
  {
    path: "home", // New route for the App's main content/homepage
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: "techUser",
    element: (
      <Layout>
        <TechUserPage />
      </Layout>
    ),
  },
  {
    path: "techusers/:id",
    element: (
      <Layout>
        <TechUserDetails />
      </Layout>
    ),
  },
  {
    path: "company",
    element: (
      <Layout>
        <CompanyPage />
      </Layout>
    ),
  },
  {
    path: "tickets",
    element: (
      <Layout>
        <TicketsPage />
      </Layout>
    ),
  },
  {
    path: "tickets/:ticketId",
    element: (
      <Layout>
        <TicketDetails />
      </Layout>
    ),
  },
  {
    path: "companies/:companyId",
    element: (
      <Layout>
        <CompanyDetail />
      </Layout>
    ),
  },
  {
    path: "clients/:id",
    element: (
      <Layout>
        <ClientDetails />
      </Layout>
    ),
  },
  {
    path: "createClient",
    element: (
      <Layout>
        <NewClient />
      </Layout>
    ),
  },
  {
    path: "createTechUser",
    element: (
      <Layout>
        <NewTechUser />
      </Layout>
    ),
  },
  {
    path: "technicians",
    element: (
      <Layout>
        <Technicians />
      </Layout>
    ),
  },
  {
    path: "new-ticket",
    element: (
      <Layout>
        <NewTicket />
      </Layout>
    ),
  },
  {
    path: "tickets-list",
    element: (
      <Layout>
        <TicketsList />
      </Layout>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
