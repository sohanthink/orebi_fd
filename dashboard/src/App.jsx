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
import ForgotPassword from './pages/forgot/ForgotPassword';
import ChangePassword from './pages/forgot/ChangePass';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Registration />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/otp/:email' element={<OtpPage />} ></Route>

        <Route path='/forgotpassword' element={<ForgotPassword />} ></Route>
        <Route path='/changepassword/:email' element={<ChangePassword />} ></Route >
      </Route >
    ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
