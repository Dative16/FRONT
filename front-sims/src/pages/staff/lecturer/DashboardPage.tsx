import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardPage: React.FC = () => {
  const [showTimetableModal, setShowTimetableModal] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Dr. Mwalimu!</h1>
        <p className="text-gray-600">Here's your teaching overview and performance analytics for today.</p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">187</p>
              <p className="text-xs text-green-600 font-medium">+5.2% than last month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Courses</p>
              <p className="text-3xl font-bold text-gray-900">5</p>
              <p className="text-xs text-red-600 font-medium">-2% than last month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Assignments</p>
              <p className="text-3xl font-bold text-gray-900">23</p>
              <div className="flex items-center mt-2">
                <div className="w-16 h-2 bg-red-200 rounded-full mr-2">
                  <div className="w-10 h-2 bg-red-500 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-500">62% completed</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Grade Reports</p>
              <p className="text-3xl font-bold text-gray-900">42</p>
              <div className="flex items-center mt-2">
                <div className="w-16 h-2 bg-blue-200 rounded-full mr-2">
                  <div className="w-6 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-500">38% pending</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Teaching Timetable and Course Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* My Teaching Timetable */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <span className="text-blue-600 mr-2">📅</span>
              My Teaching Timetable
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-all duration-200">
              <div>
                <h3 className="font-semibold text-gray-900">CS301 - Database Systems</h3>
                <p className="text-sm text-gray-600">Monday, 08:00 - 10:00 AM</p>
                <p className="text-xs text-gray-500">Room: ICT-101 • 45 students</p>
              </div>
              <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full font-medium animate-pulse">Today</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500 hover:shadow-md transition-all duration-200">
              <div>
                <h3 className="font-semibold text-gray-900">CS401 - Software Engineering</h3>
                <p className="text-sm text-gray-600">Monday, 10:00 - 12:00 PM</p>
                <p className="text-xs text-gray-500">Room: ICT-102 • 38 students</p>
              </div>
              <span className="px-3 py-1 bg-orange-500 text-white text-xs rounded-full font-medium">Next</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300 hover:shadow-md transition-all duration-200">
              <div>
                <h3 className="font-semibold text-gray-900">CS501 - Machine Learning</h3>
                <p className="text-sm text-gray-600">Monday, 02:00 - 04:00 PM</p>
                <p className="text-xs text-gray-500">Room: ICT-103 • 28 students</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300 hover:shadow-md transition-all duration-200">
              <div>
                <h3 className="font-semibold text-gray-900">CS301 - Database Systems</h3>
                <p className="text-sm text-gray-600">Wednesday, 10:00 - 12:00 PM</p>
                <p className="text-xs text-gray-500">Room: ICT-101 • 45 students</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300 hover:shadow-md transition-all duration-200">
              <div>
                <h3 className="font-semibold text-gray-900">CS202 - Data Structures</h3>
                <p className="text-sm text-gray-600">Friday, 08:00 - 10:00 AM</p>
                <p className="text-xs text-gray-500">Room: ICT-104 • 52 students</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowTimetableModal(true)}
            className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            View Full Timetable
          </button>
        </div>

        {/* Course Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <span className="text-blue-600 mr-2">📊</span>
              Course Analytics
            </h2>
          </div>
          
          <div className="space-y-8">
            {/* CS301 - Database Systems */}
            <div className="hover:bg-gray-50 p-4 rounded-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">CS301 - Database Systems</h3>
                <span className="text-sm text-gray-500">45 students</span>
              </div>
              <p className="text-sm font-medium text-gray-700 mb-3">Grade Distribution</p>
              
              {/* Enhanced Grade Distribution Chart */}
              <div className="mb-6">
                <div className="flex items-end h-52 mb-2 border-b border-l border-gray-200">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-between h-full mr-2 text-xs text-gray-500">
                    <span>30</span>
                    <span>25</span>
                    <span>20</span>
                    <span>15</span>
                    <span>10</span>
                    <span>5</span>
                    <span>0</span>
                  </div>
                  
                  {/* Bars */}
                  <div className="flex items-end h-full w-full">
                    {[
                      { grade: 'A', count: 18, percent: '40%', height: 90 },
                      { grade: 'B+', count: 9, percent: '20%', height: 45 },
                      { grade: 'B', count: 16, percent: '35.5%', height: 80 },
                      { grade: 'C', count: 0, percent: '0%', height: 0 },
                      { grade: 'D', count: 0, percent: '0%', height: 0 },
                      { grade: 'F', count: 1, percent: '2.2%', height: 5 },
                      { grade: 'I', count: 1, percent: '2.2%', height: 5 },
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center mx-2 h-full" style={{ width: '12%' }}>
                        <div className="flex flex-col items-center justify-end flex-grow w-full">
                          <div className="text-xs text-gray-700 mb-1 font-medium">{item.count}</div>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${item.height}%` }}
                            transition={{ 
                              duration: 0.8, 
                              delay: index * 0.1,
                              ease: "easeOut"
                            }}
                            className="w-full bg-gradient-to-t from-blue-700 to-blue-500 rounded-t hover:from-blue-800 hover:to-blue-600 transition-all duration-300"
                          />
                        </div>
                        <div className="text-xs font-medium text-gray-700 mt-2">{item.grade}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.percent}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* X-axis label */}
                <div className="text-center text-xs font-medium text-gray-700 ml-8 mt-1">
                  Grade
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-600">
                <span>Average: 78.5%</span>
                <span>Attendance: 85%</span>
                <span>Submissions: 92%</span>
              </div>
            </div>

            {/* CS401 - Software Engineering */}
            <div className="hover:bg-gray-50 p-4 rounded-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">CS401 - Software Engineering</h3>
                <span className="text-sm text-gray-500">38 students</span>
              </div>
              <p className="text-sm font-medium text-gray-700 mb-3">Grade Distribution</p>
              
              {/* Enhanced Grade Distribution Chart */}
              <div className="mb-6">
                <div className="flex items-end h-52 mb-2 border-b border-l border-gray-200">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-between h-full mr-2 text-xs text-gray-500">
                    <span>30</span>
                    <span>25</span>
                    <span>20</span>
                    <span>15</span>
                    <span>10</span>
                    <span>5</span>
                    <span>0</span>
                  </div>
                  
                  {/* Bars */}
                  <div className="flex items-end h-full w-full">
                    {[
                      { grade: 'A', count: 14, percent: '36.8%', height: 70 },
                      { grade: 'B+', count: 12, percent: '31.6%', height: 60 },
                      { grade: 'B', count: 8, percent: '21.1%', height: 40 },
                      { grade: 'C', count: 3, percent: '7.9%', height: 15 },
                      { grade: 'D', count: 0, percent: '0%', height: 0 },
                      { grade: 'F', count: 0, percent: '0%', height: 0 },
                      { grade: 'I', count: 1, percent: '2.6%', height: 5 },
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center mx-2 h-full" style={{ width: '12%' }}>
                        <div className="flex flex-col items-center justify-end flex-grow w-full">
                          <div className="text-xs text-gray-700 mb-1 font-medium">{item.count}</div>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${item.height}%` }}
                            transition={{ 
                              duration: 0.8, 
                              delay: index * 0.1,
                              ease: "easeOut"
                            }}
                            className="w-full bg-gradient-to-t from-blue-700 to-blue-500 rounded-t hover:from-blue-800 hover:to-blue-600 transition-all duration-300"
                          />
                        </div>
                        <div className="text-xs font-medium text-gray-700 mt-2">{item.grade}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.percent}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* X-axis label */}
                <div className="text-center text-xs font-medium text-gray-700 ml-8 mt-1">
                  Grade
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-600">
                <span>Average: 82.3%</span>
                <span>Attendance: 88%</span>
                <span>Submissions: 95%</span>
              </div>
            </div>

            {/* CS202 - Data Structures */}
            <div className="hover:bg-gray-50 p-4 rounded-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">CS202 - Data Structures</h3>
                <span className="text-sm text-gray-500">52 students</span>
              </div>
              <p className="text-sm font-medium text-gray-700 mb-3">Grade Distribution</p>
              
              {/* Enhanced Grade Distribution Chart */}
              <div className="mb-6">
                <div className="flex items-end h-52 mb-2 border-b border-l border-gray-200">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-between h-full mr-2 text-xs text-gray-500">
                    <span>30</span>
                    <span>25</span>
                    <span>20</span>
                    <span>15</span>
                    <span>10</span>
                    <span>5</span>
                    <span>0</span>
                  </div>
                  
                  {/* Bars */}
                  <div className="flex items-end h-full w-full">
                    {[
                      { grade: 'A', count: 8, percent: '15.4%', height: 40 },
                      { grade: 'B+', count: 14, percent: '26.9%', height: 70 },
                      { grade: 'B', count: 18, percent: '34.6%', height: 90 },
                      { grade: 'C', count: 7, percent: '13.5%', height: 35 },
                      { grade: 'D', count: 3, percent: '5.8%', height: 15 },
                      { grade: 'F', count: 1, percent: '1.9%', height: 5 },
                      { grade: 'I', count: 1, percent: '1.9%', height: 5 },
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center mx-2 h-full" style={{ width: '12%' }}>
                        <div className="flex flex-col items-center justify-end flex-grow w-full">
                          <div className="text-xs text-gray-700 mb-1 font-medium">{item.count}</div>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${item.height}%` }}
                            transition={{ 
                              duration: 0.8, 
                              delay: index * 0.1,
                              ease: "easeOut"
                            }}
                            className="w-full bg-gradient-to-t from-blue-700 to-blue-500 rounded-t hover:from-blue-800 hover:to-blue-600 transition-all duration-300"
                          />
                        </div>
                        <div className="text-xs font-medium text-gray-700 mt-2">{item.grade}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.percent}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* X-axis label */}
                <div className="text-center text-xs font-medium text-gray-700 ml-8 mt-1">
                  Grade
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-600">
                <span>Average: 74.2%</span>
                <span>Attendance: 82%</span>
                <span>Submissions: 89%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Student Activities</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-blue-600">JM</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">John Mwangi</div>
                      <div className="text-sm text-gray-500">CA/CSC/19/023</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">CS301</div>
                  <div className="text-sm text-gray-500">Database Systems</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Assignment Submission</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-green-600">85%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Aug 10, 2025
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-purple-600">MW</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Mary Wanjiku</div>
                      <div className="text-sm text-gray-500">CA/CSC/20/045</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">CS401</div>
                  <div className="text-sm text-gray-500">Software Engineering</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Quiz Attempt</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-blue-600">92%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Excellent
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Aug 10, 2025
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-red-600">PK</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Peter Kimani</div>
                      <div className="text-sm text-gray-500">CA/CSC/19/012</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">CS202</div>
                  <div className="text-sm text-gray-500">Data Structures</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Late Submission</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-red-600">45%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Needs Help
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Aug 9, 2025
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Quick Grade Entry</h3>
              <p className="text-blue-100 text-sm">Grade pending assignments</p>
            </div>
            <button className="bg-white/20 hover:bg-white/30 transition-colors rounded-lg p-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-sm p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Create Assignment</h3>
              <p className="text-green-100 text-sm">Setup new coursework</p>
            </div>
            <button className="bg-white/20 hover:bg-white/30 transition-colors rounded-lg p-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Send Announcement</h3>
              <p className="text-purple-100 text-sm">Notify all students</p>
            </div>
            <button className="bg-white/20 hover:bg-white/30 transition-colors rounded-lg p-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Full Timetable Modal */}
      <AnimatePresence>
        {showTimetableModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Semi-transparent backdrop with stronger blur */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-lg"
              onClick={() => setShowTimetableModal(false)}
            />
            
            {/* Modal content with smoother animation */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3
              }}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h2 className="text-2xl font-bold text-gray-900">Full Teaching Timetable</h2>
                <button 
                  onClick={() => setShowTimetableModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[70vh] bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Monday */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 text-blue-800">Monday</h3>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-all duration-200">
                      <h4 className="font-semibold text-gray-900">CS301 - Database Systems</h4>
                      <p className="text-sm text-gray-600">08:00 - 10:00 AM</p>
                      <p className="text-xs text-gray-500">Room: ICT-101 • 45 students</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full animate-pulse">Active</span>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500 hover:shadow-md transition-all duration-200">
                      <h4 className="font-semibold text-gray-900">CS401 - Software Engineering</h4>
                      <p className="text-sm text-gray-600">10:00 - 12:00 PM</p>
                      <p className="text-xs text-gray-500">Room: ICT-102 • 38 students</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-orange-500 text-white text-xs rounded-full">Next</span>
                    </div>

                    <div className="p-4 bg-white rounded-lg border-l-4 border-gray-300 hover:shadow-md transition-all duration-200">
                      <h4 className="font-semibold text-gray-900">CS501 - Machine Learning</h4>
                      <p className="text-sm text-gray-600">02:00 - 04:00 PM</p>
                      <p className="text-xs text-gray-500">Room: ICT-103 • 28 students</p>
                    </div>
                  </div>

                  {/* Tuesday */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 text-blue-800">Tuesday</h3>
                    
                    <div className="p-4 bg-white rounded-lg border-l-4 border-gray-300 hover:shadow-md transition-all duration-200">
                      <p className="text-sm text-gray-600">10:00 - 12:00 PM</p>
                      <p className="text-xs text-gray-500">Room: ICT-104 • 52 students</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                      <h4 className="font-semibold text-gray-900">CS401 - Software Engineering (Lab)</h4>
                      <p className="text-sm text-gray-600">02:00 - 05:00 PM</p>
                      <p className="text-xs text-gray-500">Room: Lab-A • 38 students</p>
                    </div>
                  </div>

                  {/* Wednesday */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Wednesday</h3>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                      <h4 className="font-semibold text-gray-900">CS301 - Database Systems</h4>
                      <p className="text-sm text-gray-600">10:00 - 12:00 PM</p>
                      <p className="text-xs text-gray-500">Room: ICT-101 • 45 students</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                      <h4 className="font-semibold text-gray-900">CS501 - Machine Learning (Lab)</h4>
                      <p className="text-sm text-gray-600">02:00 - 05:00 PM</p>
                      <p className="text-xs text-gray-500">Room: Lab-B • 28 students</p>
                    </div>
                  </div>

                  {/* Thursday */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Thursday</h3>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                      <h4 className="font-semibold text-gray-900">CS202 - Data Structures (Lab)</h4>
                      <p className="text-sm text-gray-600">08:00 - 11:00 AM</p>
                      <p className="text-xs text-gray-500">Room: Lab-C • 52 students</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                      <h4 className="font-semibold text-gray-900">CS401 - Software Engineering</h4>
                      <p className="text-sm text-gray-600">02:00 - 04:00 PM</p>
                      <p className="text-xs text-gray-500">Room: ICT-102 • 38 students</p>
                    </div>
                  </div>

                  {/* Friday */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Friday</h3>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                      <h4 className="font-semibold text-gray-900">CS202 - Data Structures</h4>
                      <p className="text-sm text-gray-600">08:00 - 10:00 AM</p>
                      <p className="text-xs text-gray-500">Room: ICT-104 • 52 students</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                      <h4 className="font-semibold text-gray-900">CS301 - Database Systems (Lab)</h4>
                      <p className="text-sm text-gray-600">10:00 - 01:00 PM</p>
                      <p className="text-xs text-gray-500">Room: Lab-A • 45 students</p>
                    </div>
                  </div>

                  {/* Saturday */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Saturday</h3>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                      <h4 className="font-semibold text-gray-900">CS501 - Machine Learning</h4>
                      <p className="text-sm text-gray-600">09:00 - 11:00 AM</p>
                      <p className="text-xs text-gray-500">Room: ICT-103 • 28 students</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-gray-900">Office Hours</h4>
                      <p className="text-sm text-gray-600">11:00 AM - 02:00 PM</p>
                      <p className="text-xs text-gray-500">Room: Faculty Office • Student Consultations</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">Available</span>
                    </div>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">15</p>
                    <p className="text-sm text-gray-600">Weekly Classes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">163</p>
                    <p className="text-sm text-gray-600">Total Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">5</p>
                    <p className="text-sm text-gray-600">Active Courses</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">3</p>
                    <p className="text-sm text-gray-600">Office Hours</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowTimetableModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Export Timetable
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;