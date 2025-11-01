import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { store } from './store/store';
import PrivateRoute from './components/auth/PrivateRoute';
import Layout from './components/layout/Layout';

// Eagerly loaded pages (small and frequently used)
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Lazy loaded pages (large or infrequently used)
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const TemplatesPage = lazy(() => import('./pages/TemplatesPage'));
const EditorPage = lazy(() => import('./pages/EditorPage'));
const PreviewPage = lazy(() => import('./pages/PreviewPage'));
const PortfolioViewPage = lazy(() => import('./pages/PortfolioViewPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const VerifyEmailPage = lazy(() => import('./pages/VerifyEmailPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));

import './App.css';

// Loading component for lazy loaded routes
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

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
              <Suspense fallback={<LoadingFallback />}>
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
              </Suspense>
            </div>
          </Router>
        </DndProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
