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
import CompanyDetail from './CompanyDetail'; // Assuming you have CompanyDetail component
import ClientDetails from './ClientDetails'; // Import the ClientDetails component
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App component for homepage or main content
  },
  {
    path: "techUser",
    element: <TechUserPage />, // Route for TechUser page
  },
  {
    path: "techusers/:id",  // New route for individual TechUser details
    element: <TechUserDetails />,  // TechUserDetails component to display tech user information
  },
  {
    path: "company",
    element: <CompanyPage />, // Route for Company page
  },
  {
    path: "signin",
    element: <SignIn />, // Route for SignIn page
  },
  {
    path: "tickets",
    element: <TicketsPage />, // Route for Tickets page
  },
  {
    path: "companies/:companyId",
    element: <CompanyDetail />, // Route for individual company details
  },
  {
    path: "clients/:id",  // Route for individual client details
    element: <ClientDetails />,  // ClientDetails component to display individual client information
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
