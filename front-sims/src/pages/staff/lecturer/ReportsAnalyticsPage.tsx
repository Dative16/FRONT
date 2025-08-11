import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ReportsAnalyticsPage: React.FC = () => {
  const [reportType, setReportType] = useState('');
  const [course, setCourse] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [format, setFormat] = useState('pdf');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  
  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Generating ${reportType} report for ${course} in ${format} format`);
  };

  const handleQuickReport = (reportName: string) => {
    alert(`Generating quick report: ${reportName}`);
  };

  const handleDownload = (reportId: string) => {
    alert(`Downloading report ${reportId}`);
  };

  // Data for enhanced grade distribution chart
  const gradeDistributionData = [
    { grade: 'A', count: 18, percent: '40%', height: 90 },
    { grade: 'B+', count: 9, percent: '20%', height: 45 },
    { grade: 'B', count: 16, percent: '35.5%', height: 80 },
    { grade: 'C', count: 0, percent: '0%', height: 0 },
    { grade: 'D', count: 0, percent: '0%', height: 0 },
    { grade: 'F', count: 1, percent: '2.2%', height: 5 },
    { grade: 'I', count: 1, percent: '2.2%', height: 5 },
  ];

  // Mock data for recent reports
  const recentReports = [
    {
      id: '1',
      name: 'CS301 Performance Report',
      description: 'Database Systems - March 2025',
      generated: 'Mar 15, 2025 • 95 students',
      format: 'PDF',
      formatColor: 'bg-green-100 text-green-700'
    },
    {
      id: '2',
      name: 'Weekly Attendance Summary',
      description: 'All courses - Week of Mar 10-16',
      generated: 'Mar 16, 2025 • 187 students',
      format: 'Excel',
      formatColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: '3',
      name: 'IPT Progress Report',
      description: 'Industrial Training Status',
      generated: 'Mar 14, 2025 • 72 students',
      format: 'PDF',
      formatColor: 'bg-purple-100 text-purple-700'
    }
  ];

  // Top performing students data
  const topStudents = [
    {
      id: '1',
      regNumber: 'CA/CSC/20/045',
      name: 'Mary Wanjiku',
      course: 'CS451 - Software Engineering',
      score: '95.8%'
    },
    {
      id: '2',
      regNumber: 'CA/CSC/19/078',
      name: 'David Kiprotich',
      course: 'CS301 - Database Systems',
      score: '93.2%'
    },
    {
      id: '3',
      regNumber: 'CA/CSC/21/034',
      name: 'Grace Muthoni',
      course: 'CS505 - Machine Learning',
      score: '91.7%'
    }
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Generate reports and analyze academic performance data.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-5 rounded-xl shadow border border-gray-100 transition-all duration-300"
        >
          <h3 className="text-sm font-medium text-gray-600 mb-2">Students Taught</h3>
          <p className="text-2xl font-bold text-blue-600">187</p>
          <p className="text-xs text-gray-500 mt-1">This semester</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-5 rounded-xl shadow border border-gray-100 transition-all duration-300"
        >
          <h3 className="text-sm font-medium text-gray-600 mb-2">Average Grade</h3>
          <p className="text-2xl font-bold text-green-600">78.5%</p>
          <p className="text-xs text-gray-500 mt-1">Across all courses</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-5 rounded-xl shadow border border-gray-100 transition-all duration-300"
        >
          <h3 className="text-sm font-medium text-gray-600 mb-2">Pass Rate</h3>
          <p className="text-2xl font-bold text-emerald-600">91.2%</p>
          <p className="text-xs text-gray-500 mt-1">Students passing</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-5 rounded-xl shadow border border-gray-100 transition-all duration-300"
        >
          <h3 className="text-sm font-medium text-gray-600 mb-2">Reports Generated</h3>
          <p className="text-2xl font-bold text-purple-600">24</p>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Generate Report */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Report</h2>
            
            <form className="space-y-4" onSubmit={handleGenerateReport}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select 
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  required
                >
                  <option value="">Select report type</option>
                  <option value="Course Performance">Course Performance</option>
                  <option value="Student Progress">Student Progress</option>
                  <option value="Grade Distribution">Grade Distribution</option>
                  <option value="Attendance Report">Attendance Report</option>
                  <option value="IPT Summary">IPT Summary</option>
                  <option value="Assessment Analysis">Assessment Analysis</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <select 
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                >
                  <option value="">All courses</option>
                  <option value="CS301">CS301 - Database Systems</option>
                  <option value="CS451">CS451 - Software Engineering</option>
                  <option value="CS262">CS262 - Data Structures</option>
                  <option value="CS505">CS505 - Machine Learning</option>
                  <option value="CS99">CS99 - Programming Fundamentals</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select 
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  required
                >
                  <option value="">Select date range</option>
                  <option value="This semester">This semester</option>
                  <option value="Last 30 days">Last 30 days</option>
                  <option value="Last 3 months">Last 3 months</option>
                  <option value="Academic year">Academic year</option>
                  <option value="Custom range">Custom range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="format" 
                      value="pdf" 
                      className="mr-2" 
                      checked={format === 'pdf'}
                      onChange={() => setFormat('pdf')}
                    />
                    <span className="text-sm">PDF Document</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="format" 
                      value="excel" 
                      className="mr-2"
                      checked={format === 'excel'}
                      onChange={() => setFormat('excel')}
                    />
                    <span className="text-sm">Excel Spreadsheet</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="format" 
                      value="csv" 
                      className="mr-2"
                      checked={format === 'csv'}
                      onChange={() => setFormat('csv')}
                    />
                    <span className="text-sm">CSV File</span>
                  </label>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow hover:shadow-lg"
              >
                Generate Report
              </motion.button>
            </form>
          </motion.div>

          {/* Quick Reports */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 bg-white rounded-xl shadow border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reports</h3>
            <div className="space-y-3">
              <motion.button 
                whileHover={{ x: 5 }}
                className="w-full text-left p-3 border border-gray-200 rounded-xl hover:bg-blue-50 transition-all duration-300"
                onClick={() => handleQuickReport('Weekly Performance')}
              >
                <div className="text-sm font-medium text-gray-900">Weekly Performance</div>
                <div className="text-xs text-gray-500">Last 7 days activity summary</div>
              </motion.button>
              
              <motion.button 
                whileHover={{ x: 5 }}
                className="w-full text-left p-3 border border-gray-200 rounded-xl hover:bg-green-50 transition-all duration-300"
                onClick={() => handleQuickReport('Grade Summary')}
              >
                <div className="text-sm font-medium text-gray-900">Grade Summary</div>
                <div className="text-xs text-gray-500">Current semester grades</div>
              </motion.button>
              
              <motion.button 
                whileHover={{ x: 5 }}
                className="w-full text-left p-3 border border-gray-200 rounded-xl hover:bg-purple-50 transition-all duration-300"
                onClick={() => handleQuickReport('Attendance Analysis')}
              >
                <div className="text-sm font-medium text-gray-900">Attendance Analysis</div>
                <div className="text-xs text-gray-500">Class attendance patterns</div>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Analytics Dashboard */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-xl shadow border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Performance Analytics</h2>
            
            {/* Course Performance Chart */}
            <div className="mb-8">
              <h3 className="text-md font-medium text-gray-900 mb-4">Course Performance Trends</h3>
              <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
                <div className="text-center">
                  <div className="text-gray-400 mb-2 text-4xl">📊</div>
                  <p className="text-gray-500 text-sm">Performance trend chart would be displayed here</p>
                  <p className="text-xs text-gray-400 mt-1">Data visualization for course performance over time</p>
                </div>
              </div>
            </div>

            {/* Enhanced Grade Distribution Chart */}
            <div className="mb-8">
              <h3 className="text-md font-medium text-gray-900 mb-4">Grade Distribution</h3>
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
                    {gradeDistributionData.map((item, index) => (
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

            {/* Top Performing Students */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">Top Performing Students</h3>
              <div className="space-y-3">
                {topStudents.map((student) => (
                  <motion.div 
                    key={student.id}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 transition-all duration-300"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{student.regNumber} - {student.name}</p>
                      <p className="text-xs text-gray-600">{student.course}</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">{student.score}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Reports */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-8 bg-white rounded-xl shadow border border-gray-100 transition-all duration-300 hover:shadow-lg"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentReports.map((report) => (
                  <tr 
                    key={report.id} 
                    className={`hover:bg-gray-50 transition-colors duration-200 ${selectedReport === report.id ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{report.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{report.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{report.generated}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${report.formatColor}`}>
                        {report.format}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-300"
                        onClick={() => handleDownload(report.id)}
                      >
                        Download
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportsAnalyticsPage;