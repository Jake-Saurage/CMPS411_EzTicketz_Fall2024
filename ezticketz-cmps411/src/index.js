import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TechUserPage from './TechUsersPage';
import CompanyPage from './CompanyPage';
import SignIn from './SignIn';
import TicketsPage from './TicketsPage';
import CompanyDetail from './CompanyDetail'; // Assuming you have CompanyDetail component
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
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
