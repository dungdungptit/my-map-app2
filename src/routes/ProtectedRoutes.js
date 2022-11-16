import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { authSelector } from '../store/reducers/authSlice';

const ProtectedRoutes = () => {
    const auth = useSelector(authSelector);
    console.log(auth);
    const isAuthenticated = auth.isAuth;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;

