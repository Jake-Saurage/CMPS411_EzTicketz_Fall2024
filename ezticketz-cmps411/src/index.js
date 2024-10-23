import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TechUserPage from './TechUsersPage';
import TechUserDetails from './TechUserDetails'; // Import TechUserDetails component
import CompanyPage from './CompanyPage';
import SignIn from './SignIn';
import TicketsPage from './TicketsPage';
import CompanyDetail from './CompanyDetail'; // Import CompanyDetail component
import ClientDetails from './ClientDetails'; // Import ClientDetails component
import NewClient from './NewClient'; // Import NewClient component
import NewTechUser from './NewTechUser';
import Technicians from './Technicians';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './Layout'; // Import Layout for global NavBar

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App /> {/* App component for homepage or main content */}
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
    path: "techusers/:id",  // New route for individual TechUser details
    element: (
      <Layout>
        <TechUserDetails /> {/* TechUserDetails component */}
      </Layout>
    ),
  },
  {
    path: "company",
    element: (
      <Layout>
        <CompanyPage /> {/* Company page route */}
      </Layout>
    ),
  },
  {
    path: "signin",
    element: (
      <Layout>
        <SignIn /> {/* SignIn page */}
      </Layout>
    ),
  },
  {
    path: "tickets",
    element: (
      <Layout>
        <TicketsPage /> {/* Tickets page */}
      </Layout>
    ),
  },
  {
    path: "companies/:companyId",
    element: (
      <Layout>
        <CompanyDetail /> {/* Individual company details */}
      </Layout>
    ),
  },
  {
    path: "clients/:id",  // Route for individual client details
    element: (
      <Layout>
        <ClientDetails /> {/* ClientDetails component */}
      </Layout>
    ),
  },
  {
    path: "createClient",  // Route for creating a new client
    element: (
      <Layout>
        <NewClient /> {/* NewClient component */}
      </Layout>
    ),
  },
  {
    path: "createTechUser",  // Route for creating a new tech user
    element: (
      <Layout>
        <NewTechUser /> {/* NewTechUser component for creating a tech user */}
      </Layout>
    ),
  },
  
  {
    path: "technicians", // Add a new route for the Technicians page
    element: (
      <Layout>
        <Technicians /> {/* Technicians component */}
      </Layout>
    ),
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
