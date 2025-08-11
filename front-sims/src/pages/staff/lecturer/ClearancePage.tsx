import React, { useState } from 'react';

const ClearancePage: React.FC = () => {
  // State for filters and actions
  const [filter, setFilter] = useState('All Requests');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  
  // Mock data for clearance requests
  const clearanceRequests = [
    {
      id: '1',
      regNumber: 'CA/CSC/19/023',
      name: 'John Mwangi',
      clearanceType: 'Academic Clearance',
      description: 'Course completion verification',
      course: 'CS301',
      courseName: 'Database Systems',
      status: 'Pending Review',
      statusColor: 'bg-yellow-100 text-yellow-800',
      submitted: 'Mar 15, 2025'
    },
    {
      id: '2',
      regNumber: 'CA/CSC/20/045',
      name: 'Mary Wanjiku',
      clearanceType: 'IPT Clearance',
      description: 'Industrial Practical Training',
      course: 'CS451',
      courseName: 'Software Engineering',
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-800',
      submitted: 'Mar 14, 2025'
    },
    {
      id: '3',
      regNumber: 'CA/CSC/19/012',
      name: 'Peter Kimani',
      clearanceType: 'Retake Clearance',
      description: 'Exam retake permission',
      course: 'CS262',
      courseName: 'Data Structures',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800',
      submitted: 'Mar 12, 2025'
    },
    {
      id: '4',
      regNumber: 'CA/CSC/21/078',
      name: 'Sarah Njeri',
      clearanceType: 'Project Clearance',
      description: 'Final year project',
      course: 'CS499',
      courseName: 'Final Year Project',
      status: 'Pending Review',
      statusColor: 'bg-yellow-100 text-yellow-800',
      submitted: 'Mar 10, 2025'
    }
  ];

  // Filtered requests based on selection
  const filteredRequests = clearanceRequests.filter(request => {
    if (filter === 'All Requests') return true;
    return request.status === filter;
  });

  // Handle actions
  const handleApprove = (id: string) => {
    console.log(`Approved request ${id}`);
    alert(`Request ${id} approved successfully!`);
  };

  const handleReject = (id: string) => {
    console.log(`Rejected request ${id}`);
    alert(`Request ${id} rejected.`);
  };

  const handleReview = (id: string) => {
    setSelectedRequest(id);
    console.log(`Reviewing request ${id}`);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Clearance</h1>
        <p className="text-gray-600">Manage student clearance requests and academic approvals.</p>
      </div>

      {/* Clearance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Pending Requests</h3>
          <p className="text-2xl font-bold text-orange-600">12</p>
          <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Approved Today</h3>
          <p className="text-2xl font-bold text-green-600">8</p>
          <p className="text-xs text-gray-500 mt-1">Clearances granted</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Rejected</h3>
          <p className="text-2xl font-bold text-red-600">3</p>
          <p className="text-xs text-gray-500 mt-1">Need follow-up</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <h3 className="text-sm font-medium text-gray-600 mb-2">This Month</h3>
          <p className="text-2xl font-bold text-blue-600">45</p>
          <p className="text-xs text-gray-500 mt-1">Total processed</p>
        </div>
      </div>

      {/* Clearance Requests */}
      <div className="bg-white rounded-xl shadow border border-gray-100 mb-8 transition-all duration-300 hover:shadow-md">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Clearance Requests</h2>
            <div className="flex flex-wrap gap-3">
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option>All Requests</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
                <option>Academic</option>
                <option>Financial</option>
              </select>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow hover:shadow-lg">
                Export Report
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clearance Type</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.regNumber}</div>
                    <div className="text-sm text-gray-500">{request.name}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.clearanceType}</div>
                    <div className="text-sm text-gray-500">{request.description}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.course}</div>
                    <div className="text-sm text-gray-500">{request.courseName}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.statusColor}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.submitted}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {request.status === 'Pending Review' && (
                      <>
                        <button 
                          onClick={() => handleApprove(request.id)}
                          className="text-green-600 hover:text-green-900 mr-3 transition-colors duration-300"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleReject(request.id)}
                          className="text-red-600 hover:text-red-900 mr-3 transition-colors duration-300"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {request.status === 'Rejected' && (
                      <button 
                        onClick={() => handleApprove(request.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-300"
                      >
                        Reconsider
                      </button>
                    )}
                    <button 
                      onClick={() => handleReview(request.id)}
                      className="text-blue-600 hover:text-blue-900 transition-colors duration-300"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clearance Types & Requirements */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Clearance Types</h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-300">
              <h4 className="font-medium text-blue-900">Academic Clearance</h4>
              <p className="text-sm text-blue-700 mt-1">
                Course completion verification and grade confirmation
              </p>
              <div className="mt-3">
                <span className="text-xs bg-blue-200 text-blue-800 px-2.5 py-1 rounded-full">8 pending</span>
                <button className="text-xs text-blue-600 hover:underline ml-3">View Requests</button>
              </div>
            </div>

            <div className="p-4 border border-green-200 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-300">
              <h4 className="font-medium text-green-900">IPT Clearance</h4>
              <p className="text-sm text-green-700 mt-1">
                Industrial Practical Training completion approval
              </p>
              <div className="mt-3">
                <span className="text-xs bg-green-200 text-green-800 px-2.5 py-1 rounded-full">3 pending</span>
                <button className="text-xs text-green-600 hover:underline ml-3">View Requests</button>
              </div>
            </div>

            <div className="p-4 border border-orange-200 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors duration-300">
              <h4 className="font-medium text-orange-900">Retake Clearance</h4>
              <p className="text-sm text-orange-700 mt-1">
                Permission for exam retakes and supplementary assessments
              </p>
              <div className="mt-3">
                <span className="text-xs bg-orange-200 text-orange-800 px-2.5 py-1 rounded-full">1 pending</span>
                <button className="text-xs text-orange-600 hover:underline ml-3">View Requests</button>
              </div>
            </div>

            <div className="p-4 border border-purple-200 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-300">
              <h4 className="font-medium text-purple-900">Project Clearance</h4>
              <p className="text-sm text-purple-700 mt-1">
                Final year project and thesis approval
              </p>
              <div className="mt-3">
                <span className="text-xs bg-purple-200 text-purple-800 px-2.5 py-1 rounded-full">2 pending</span>
                <button className="text-xs text-purple-600 hover:underline ml-3">View Requests</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Clearance Workflow</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-blue-200">
                <span className="text-blue-600 text-sm font-medium">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Request Submission</h4>
                <p className="text-sm text-gray-600 mt-1">Student submits clearance request with required documents</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-orange-200">
                <span className="text-orange-600 text-sm font-medium">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Lecturer Review</h4>
                <p className="text-sm text-gray-600 mt-1">Course lecturer reviews academic performance and requirements</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-purple-200">
                <span className="text-purple-600 text-sm font-medium">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Department Approval</h4>
                <p className="text-sm text-gray-600 mt-1">Department head provides final approval or rejection</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-green-200">
                <span className="text-green-600 text-sm font-medium">4</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Clearance Issued</h4>
                <p className="text-sm text-gray-600 mt-1">Official clearance certificate is generated and issued</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-medium text-gray-900 mb-3">Average Processing Time</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Academic Clearance:</span>
                <span className="font-medium ml-2">2-3 days</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-600">IPT Clearance:</span>
                <span className="font-medium ml-2">3-5 days</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Retake Clearance:</span>
                <span className="font-medium ml-2">1-2 days</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Project Clearance:</span>
                <span className="font-medium ml-2">5-7 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearancePage;