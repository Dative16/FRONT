import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/common/Layout/MainLayout';
import StudentDashboardPage from '@/pages/student/DashboardPage';
import CourseRegistration from '@/pages/student/CourseRegistrationpage';
import InvoiceFormPage from '@/pages/student/payments/InvoiceFormPage'; // Add this import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <StudentDashboardPage />
          </MainLayout>
        } />
        <Route path="/student/dashboard" element={
          <MainLayout>
            <StudentDashboardPage />
          </MainLayout>
        } />
        <Route path="/student/course-registration" element={
          <MainLayout>
            <CourseRegistration />
          </MainLayout>
        } />
        {/* Add payment routes */}
        <Route path="/student/payments/create-invoices" element={
          <MainLayout>
            <InvoiceFormPage />
          </MainLayout>
        } />
        <Route path="/student/payments/invoice-list" element={
          <MainLayout>
            {/* We'll create this component later */}
            <div>Invoice List Page</div>
          </MainLayout>
        } />
        <Route path="/student/payments/overpayment" element={
          <MainLayout>
            {/* We'll create this component later */}
            <div>Overpayment Page</div>
          </MainLayout>
        } />
        {/* Add more routes for other modules */}
        <Route path="*" element={
          <MainLayout>
            <div className="flex items-center justify-center h-full">
              <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            </div>
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;