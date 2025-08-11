import React, { useState } from 'react';

const IPTTrackingPage: React.FC = () => {
  // State for filter dropdown
  const [filterOption, setFilterOption] = useState('all');
  
  // State for modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  
  // Student data
  const studentData = [
    {
      id: 1,
      name: "John Mwanba",
      studentId: "CA/CS/19/023",
      company: "Teric Corp Ltd",
      paymentStatus: "pending",
      reportStatus: "in-progress",
      duration: "8 weeks",
      reportsSubmitted: "2/8",
      supervisor: "Jane Smith",
      contact: "john.mwanba@example.com",
      phone: "+254 712 345 678",
      progress: "On track",
      issues: "None reported"
    },
    {
      id: 2,
      name: "May Kiteo",
      studentId: "CA/CS/20/045",
      company: "DassSoft Solutions",
      paymentStatus: "completed",
      reportStatus: "submitted",
      duration: "6 weeks",
      reportsSubmitted: "6/6",
      supervisor: "David Kimani",
      contact: "may.kiteo@example.com",
      phone: "+254 723 456 789",
      progress: "Excellent",
      issues: "None"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      studentId: "CA/CS/19/012",
      company: "Tech Innovations Ltd",
      paymentStatus: "partial",
      reportStatus: "pending-review",
      duration: "10 weeks",
      reportsSubmitted: "8/10",
      supervisor: "Robert Omondi",
      contact: "sarah.j@example.com",
      phone: "+254 734 567 890",
      progress: "Satisfactory",
      issues: "Report delays"
    },
    {
      id: 4,
      name: "Michael Chen",
      studentId: "CA/CS/20/078",
      company: "Data Systems Inc",
      paymentStatus: "completed",
      reportStatus: "overdue",
      duration: "12 weeks",
      reportsSubmitted: "9/12",
      supervisor: "Grace Wambui",
      contact: "michael.c@example.com",
      phone: "+254 745 678 901",
      progress: "Needs improvement",
      issues: "Missed deadlines"
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      studentId: "CA/CS/19/056",
      company: "Cloud Solutions Group",
      paymentStatus: "pending",
      reportStatus: "in-progress",
      duration: "4 weeks",
      reportsSubmitted: "4/4",
      supervisor: "Thomas Ochieng",
      contact: "emma.r@example.com",
      phone: "+254 756 789 012",
      progress: "Excellent",
      issues: "None"
    }
  ];

  // Filter students based on selection
  const filteredStudents = studentData.filter(student => {
    if (filterOption === 'all') return true;
    if (filterOption === 'pending-payment') return student.paymentStatus === 'pending';
    if (filterOption === 'completed-payment') return student.paymentStatus === 'completed';
    if (filterOption === 'partial-payment') return student.paymentStatus === 'partial';
    if (filterOption === 'report-issues') return student.reportStatus === 'overdue' || student.reportStatus === 'pending-review';
    return true;
  });

  // Handle view details click
  const handleViewDetails = (student: any) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  // Handle export report
  const handleExportReport = () => {
    // In a real app, this would trigger a download
    // For now, we'll just show an alert
    alert(`Exporting IPT report for ${filterOption === 'all' ? 'all students' : filterOption}...`);
    console.log('Exporting data:', filteredStudents);
  };

  // Render student details modal
  const renderDetailsModal = () => (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Student Details</h3>
            <button 
              onClick={() => setShowDetailsModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {selectedStudent && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Student Name</h4>
                <p className="text-lg font-semibold">{selectedStudent.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Student ID</h4>
                <p className="text-lg">{selectedStudent.studentId}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Company</h4>
                <p className="text-lg">{selectedStudent.company}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Duration</h4>
                <p className="text-lg">{selectedStudent.duration}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Payment Status</h4>
                <p className="text-lg">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    selectedStudent.paymentStatus === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : selectedStudent.paymentStatus === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedStudent.paymentStatus.charAt(0).toUpperCase() + selectedStudent.paymentStatus.slice(1)}
                  </span>
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Report Status</h4>
                <p className="text-lg">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    selectedStudent.reportStatus === 'in-progress' 
                      ? 'bg-gray-100 text-gray-800' 
                      : selectedStudent.reportStatus === 'submitted' 
                        ? 'bg-green-100 text-green-800' 
                        : selectedStudent.reportStatus === 'pending-review'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedStudent.reportStatus.split('-').map((word: string) => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Supervisor</h4>
                <p className="text-lg">{selectedStudent.supervisor}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Contact</h4>
                <p className="text-lg">{selectedStudent.contact}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="text-sm font-medium text-blue-700 mb-2">Progress Evaluation</h4>
                <p className="text-gray-800">{selectedStudent.progress}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl">
                <h4 className="text-sm font-medium text-yellow-700 mb-2">Report Issues</h4>
                <p className="text-gray-800">{selectedStudent.issues}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Reports Submitted</h4>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ 
                      width: `${(parseInt(selectedStudent.reportsSubmitted.split('/')[0]) / 
                              parseInt(selectedStudent.reportsSubmitted.split('/')[1])) * 100}%` 
                    }}
                  ></div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-700">{selectedStudent.reportsSubmitted}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            onClick={() => setShowDetailsModal(false)}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow hover:shadow-md">
            Download Full Report
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">IPT Tracking</h1>
        <p className="text-gray-600">Monitor student internships, payments, and progress reports.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 transition-all duration-300 hover:shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Students</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
          <p className="text-xs text-gray-500">Currently on IPT</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 transition-all duration-300 hover:shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Money Status</h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">1.2 M</p>
          <p className="text-xs text-gray-500">Payments collected</p>
          <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 transition-all duration-300 hover:shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Pending Reports</h3>
          <p className="text-2xl font-bold text-orange-600 mt-1">23</p>
          <p className="text-xs text-gray-500">Awaiting submission</p>
        </div>
      </div>

      {/* IPT Students Overview */}
      <div className="mt-8 bg-white rounded-xl shadow border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">IPT Students Overview</h2>
            <div className="flex space-x-3">
              <select 
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">All Students</option>
                <option value="pending-payment">Pending Payment</option>
                <option value="completed-payment">Completed Payment</option>
                <option value="partial-payment">Partial Payment</option>
                <option value="report-issues">Report Issues</option>
              </select>
              <button 
                onClick={handleExportReport}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow hover:shadow-md text-sm"
              >
                Export Report
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    <div className="text-xs text-gray-500">{student.studentId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.paymentStatus === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : student.paymentStatus === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {student.paymentStatus.charAt(0).toUpperCase() + student.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${
                        student.reportStatus === 'in-progress' 
                          ? 'bg-gray-300' 
                          : student.reportStatus === 'submitted' 
                            ? 'bg-green-500' 
                            : student.reportStatus === 'pending-review'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm text-gray-600">
                        {student.reportStatus.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewDetails(student)}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-300 px-3 py-1 bg-blue-50 rounded-lg hover:bg-blue-100"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty state */}
        {filteredStudents.length === 0 && (
          <div className="py-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No students found</h3>
            <p className="mt-1 text-gray-500">Try changing your filter criteria</p>
          </div>
        )}
      </div>
      
      {/* Student Details Modal */}
      {showDetailsModal && renderDetailsModal()}
    </div>
  );
};

export default IPTTrackingPage;