// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MainLayout from '@/components/common/Layout/MainLayout';
// import StudentDashboardPage from '@/pages/student/DashboardPage';
// import CourseRegistration from '@/pages/student/CourseRegistrationpage';
// import InvoiceFormPage from '@/pages/student/payments/InvoiceFormPage'; // Add this import

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={
//           <MainLayout>
//             <StudentDashboardPage />
//           </MainLayout>
//         } />
//         <Route path="/student/dashboard" element={
//           <MainLayout>
//             <StudentDashboardPage />
//           </MainLayout>
//         } />
//         <Route path="/student/course-registration" element={
//           <MainLayout>
//             <CourseRegistration />
//           </MainLayout>
//         } />
//         {/* Add payment routes */}
//         <Route path="/student/payments/create-invoices" element={
//           <MainLayout>
//             <InvoiceFormPage />
//           </MainLayout>
//         } />
//         <Route path="/student/payments/invoice-list" element={
//           <MainLayout>
//             {/* We'll create this component later */}
//             <div>Invoice List Page</div>
//           </MainLayout>
//         } />
//         <Route path="/student/payments/overpayment" element={
//           <MainLayout>
//             {/* We'll create this component later */}
//             <div>Overpayment Page</div>
//           </MainLayout>
//         } />
//         {/* Add more routes for other modules */}
//         <Route path="*" element={
//           <MainLayout>
//             <div className="flex items-center justify-center h-full">
//               <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
//             </div>
//           </MainLayout>
//         } />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/common/Layout/MainLayout';

// Student pages (existing)
import StudentDashboardPage from '@/pages/student/DashboardPage';
import CourseRegistration from '@/pages/student/CourseRegistrationpage';
import InvoiceFormPage from '@/pages/student/payments/InvoiceFormPage';

// Lecturer pages (new)
import DashboardPage from '@/pages/staff/lecturer/DashboardPage';
import AssessmentGradingPage from '@/pages/staff/lecturer/AssessmentGradingPage';
import IPTTrackingPage from '@/pages/staff/lecturer/IPTTrackingPage';
import ResultUploadsPage from '@/pages/staff/lecturer/ResultUploadsPage';
import SearchFilterPage from '@/pages/staff/lecturer/SearchFilterPage';
import NotificationsPage from '@/pages/staff/lecturer/NotificationsPage';
import ClearancePage from '@/pages/staff/lecturer/ClearancePage';
import ReportsAnalyticsPage from '@/pages/staff/lecturer/ReportsAnalyticsPage';
import SettingsPage from '@/pages/staff/lecturer/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route - redirect to student dashboard */}
        <Route path="/" element={
          <MainLayout>
            <StudentDashboardPage />
          </MainLayout>
        } />

        {/* Student routes */}
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
        
        {/* Student payment routes */}
        <Route path="/student/payments/create-invoices" element={
          <MainLayout>
            <InvoiceFormPage />
          </MainLayout>
        } />
        <Route path="/student/payments/invoice-list" element={
          <MainLayout>
            <div>Invoice List Page</div>
          </MainLayout>
        } />
        <Route path="/student/payments/overpayment" element={
          <MainLayout>
            <div>Overpayment Page</div>
          </MainLayout>
        } />

        {/* Lecturer routes */}
        <Route path="/staff/lecturer/dashboard" element={
          <MainLayout>
            <DashboardPage />
          </MainLayout>
        } />
        <Route path="/staff/lecturer/assessment-grading" element={
          <MainLayout>
            <AssessmentGradingPage />
          </MainLayout>
        } />
        <Route path="/staff/lecturer/ipt-tracking" element={
          <MainLayout>
            <IPTTrackingPage />
          </MainLayout>
        } />
        <Route path="/staff/lecturer/result-uploads" element={
          <MainLayout>
            <ResultUploadsPage />
          </MainLayout>
        } />
        <Route path="/staff/lecturer/search-filter" element={
          <MainLayout>
            <SearchFilterPage />
          </MainLayout>
        } />
        <Route path="/staff/lecturer/notifications" element={
          <MainLayout>
            <NotificationsPage />
          </MainLayout>
        } />
        <Route path="/staff/lecturer/clearance" element={
          <MainLayout>
            <ClearancePage />
          </MainLayout>
        } />
        <Route path="/staff/lecturer/reports-analytics" element={
          <MainLayout>
            <ReportsAnalyticsPage />
          </MainLayout>
        } />
        <Route path="/staff/lecturer/settings" element={
          <MainLayout>
            <SettingsPage />
          </MainLayout>
        } />

        {/* 404 Not Found route */}
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