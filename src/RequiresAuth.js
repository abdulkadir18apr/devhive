import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './contexts/AuthContext';

export  function RequiresAuth({children}) {

    const {isLogin}=useAuthContext();
    return isLogin?children:<Navigate to="/login"/>
}
