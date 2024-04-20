import { useState } from 'react'
import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from './pages/registration/Registration'
import Login from './pages/login/Login';
import OtpPage from './pages/otp/OtpPage';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Registration />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/otp/:email' element={<OtpPage />} ></Route>
      </Route>
    ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
