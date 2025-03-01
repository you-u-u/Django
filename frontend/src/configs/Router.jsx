import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Top from '../components/Top/'
import CustomerList from '../components/CustomerList';
import CustomerDetail from "../components/CustomerDetail"; 

const router = createBrowserRouter([
  { path: '/', element: <Top /> },
  { path: '/customerlist/', element: <CustomerList /> },
  { path: '/customerdetail/:id', element: <CustomerDetail /> },
]);

export default router;