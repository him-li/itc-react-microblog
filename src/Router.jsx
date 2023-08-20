import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

export default function Router() {
    const [authenticated, isAuthenticated] = useState(false);
    return (
        <Routes>
            <Route path='/' element={authenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/profile' element={<ProfilePage />} />
        </Routes>
    )
}