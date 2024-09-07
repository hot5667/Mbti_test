import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';
import ProfilePage from '../pages/ProfilePage';
import TestPage from '../pages/TestPage';
import TestResultPage from '../pages/TestResultPage';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';

const AppRouter = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/profile"
            element={
              user ? (
                <ProtectedRoute user={user}>
                  <ProfilePage user={user} setUser={setUser} />
                </ProtectedRoute>) :
                (<Navigate to="/login" />)
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute user={user}>
                <TestPage user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute user={user}>
                <TestResultPage user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;