import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { store } from './store/store';
import PrivateRoute from './components/auth/PrivateRoute';
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TemplatesPage from './pages/TemplatesPage';
import EditorPage from './pages/EditorPage';
import PreviewPage from './pages/PreviewPage';
import PortfolioViewPage from './pages/PortfolioViewPage';
import SettingsPage from './pages/SettingsPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <Router>
            <div className="App">
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    style: {
                      background: '#10b981',
                    },
                  },
                  error: {
                    duration: 4000,
                    style: {
                      background: '#ef4444',
                    },
                  },
                }}
              />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout><HomePage /></Layout>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/portfolio/:slug" element={<PortfolioViewPage />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Layout><DashboardPage /></Layout>
                  </PrivateRoute>
                } />
                <Route path="/templates" element={
                  <PrivateRoute>
                    <Layout><TemplatesPage /></Layout>
                  </PrivateRoute>
                } />
                <Route path="/editor/:id" element={
                  <PrivateRoute>
                    <EditorPage />
                  </PrivateRoute>
                } />
                <Route path="/preview/:id" element={
                  <PrivateRoute>
                    <PreviewPage />
                  </PrivateRoute>
                } />
                <Route path="/settings" element={
                  <PrivateRoute>
                    <Layout><SettingsPage /></Layout>
                  </PrivateRoute>
                } />
              </Routes>
            </div>
          </Router>
        </DndProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
