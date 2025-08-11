import React, { useState, useEffect } from 'react';

const SearchFilterPage: React.FC = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [searchIn, setSearchIn] = useState('All Records');
  const [courseFilter, setCourseFilter] = useState('All Courses');
  const [academicYearFilter, setAcademicYearFilter] = useState('2024/2025');
  const [semesterFilter, setSemesterFilter] = useState('All Semesters');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  
  // Mock data
  const mockData = [
    { id: 1, regNumber: 'CA/CSC/19/023', name: 'John Mwangi', courseCode: 'CS301', courseName: 'Database Systems', grade: 85, status: 'Active', updated: 'Mar 15, 2025' },
    { id: 2, regNumber: 'CA/CSC/20/045', name: 'Mary Wanjiku', courseCode: 'CS451', courseName: 'Software Engineering', grade: 92, status: 'Active', updated: 'Mar 14, 2025' },
    { id: 3, regNumber: 'CA/CSC/19/012', name: 'Peter Kimani', courseCode: 'CS262', courseName: 'Data Structures', grade: 45, status: 'Failing', updated: 'Mar 12, 2025' },
    { id: 4, regNumber: 'CA/CSC/21/078', name: 'Sarah Johnson', courseCode: 'CS505', courseName: 'Machine Learning', grade: 78, status: 'Active', updated: 'Mar 10, 2025' },
    { id: 5, regNumber: 'CA/CSC/20/112', name: 'David Smith', courseCode: 'CS301', courseName: 'Database Systems', grade: 68, status: 'Pending', updated: 'Mar 11, 2025' },
    { id: 6, regNumber: 'CA/CSC/19/056', name: 'Grace Omondi', courseCode: 'CS451', courseName: 'Software Engineering', grade: 91, status: 'Active', updated: 'Mar 13, 2025' },
    { id: 7, regNumber: 'CA/CSC/21/034', name: 'Michael Brown', courseCode: 'CS99', courseName: 'Programming Fundamentals', grade: 55, status: 'Failing', updated: 'Mar 9, 2025' },
    { id: 8, regNumber: 'CA/CSC/20/089', name: 'Linda Wang', courseCode: 'CS262', courseName: 'Data Structures', grade: 87, status: 'Active', updated: 'Mar 14, 2025' },
    { id: 9, regNumber: 'CA/CSC/19/067', name: 'James Wilson', courseCode: 'CS505', courseName: 'Machine Learning', grade: 76, status: 'Active', updated: 'Mar 12, 2025' },
    { id: 10, regNumber: 'CA/CSC/21/021', name: 'Susan Taylor', courseCode: 'CS99', courseName: 'Programming Fundamentals', grade: 49, status: 'Failing', updated: 'Mar 8, 2025' },
  ];

  // Constants
  const itemsPerPage = 5;
  const totalItems = mockData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Filtered data
  const filteredData = mockData.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.regNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.courseCode.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = courseFilter === 'All Courses' || item.courseCode === courseFilter.split(' - ')[0];
    const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
    
    return matchesSearch && matchesCourse && matchesStatus;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'registration') return a.regNumber.localeCompare(b.regNumber);
    if (sortBy === 'course') return a.courseCode.localeCompare(b.courseCode);
    if (sortBy === 'grade') return b.grade - a.grade;
    return 0;
  });

  // Paginated data
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleSearch = () => {
    setCurrentPage(1);
    console.log('Search executed with:', { searchQuery, searchIn, courseFilter, academicYearFilter, semesterFilter, statusFilter });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSearchIn('All Records');
    setCourseFilter('All Courses');
    setAcademicYearFilter('2024/2025');
    setSemesterFilter('All Semesters');
    setStatusFilter('All Status');
    setCurrentPage(1);
  };

  const handleSaveSearch = () => {
    console.log('Search saved:', { searchQuery, searchIn, courseFilter, academicYearFilter, semesterFilter, statusFilter });
    alert('Search criteria saved successfully!');
  };

  const handleRowSelect = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map(item => item.id));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleExport = () => {
    console.log('Exporting selected items:', selectedRows);
    alert(`Exported ${selectedRows.length} records successfully!`);
  };

  const handleSendNotification = () => {
    console.log('Sending notification to:', selectedRows);
    alert(`Notification sent to ${selectedRows.length} students!`);
  };

  const handleFlagForReview = () => {
    console.log('Flagging for review:', selectedRows);
    alert(`${selectedRows.length} records flagged for review!`);
  };

  // Reset select all when data changes
  useEffect(() => {
    setIsAllSelected(false);
  }, [currentPage, filteredData]);

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Search & Filter</h1>
        <p className="text-gray-600">Search and filter students, courses, assessments, and academic records.</p>
      </div>

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Students Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6 transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">Total Students</h3>
              <div className="text-3xl font-bold text-gray-900">245</div>
              <div className="text-sm text-gray-500 mt-2">All registered students</div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center">
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              +12.5% from last month
            </span>
          </div>
        </div>

        {/* Pending Reports Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6 transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">Pending Reports</h3>
              <div className="text-3xl font-bold text-gray-900">23</div>
              <div className="text-sm text-gray-500 mt-2">Requires attention</div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center">
            <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
              +3 since last week
            </span>
          </div>
        </div>

        {/* Placement Statistics Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6 transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">Placement Rate</h3>
              <div className="text-3xl font-bold text-gray-900">92%</div>
              <div className="text-sm text-gray-500 mt-2">Successful placements</div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center">
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              +4.2% from last year
            </span>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8 transition-all duration-300">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Advanced Search</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Query</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, registration number, course code..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search In</label>
            <select 
              value={searchIn}
              onChange={(e) => setSearchIn(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option>All Records</option>
              <option>Students</option>
              <option>Courses</option>
              <option>Assessments</option>
              <option>IPT Records</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
            <select 
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option>All Courses</option>
              <option>CS301 - Database Systems</option>
              <option>CS451 - Software Engineering</option>
              <option>CS262 - Data Structures</option>
              <option>CS505 - Machine Learning</option>
              <option>CS99 - Programming Fundamentals</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
            <select 
              value={academicYearFilter}
              onChange={(e) => setAcademicYearFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option>2024/2025</option>
              <option>2023/2024</option>
              <option>2022/2023</option>
              <option>2021/2022</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
            <select 
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option>All Semesters</option>
              <option>Semester 1</option>
              <option>Semester 2</option>
              <option>Summer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Search
          </button>
          <button 
            onClick={handleClearFilters}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            Clear Filters
          </button>
          <button 
            onClick={handleSaveSearch}
            className="px-6 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50"
          >
            Save Search
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8 transition-all duration-300">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Filters</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-sm">
            <div className="text-sm font-medium text-gray-900">My Students</div>
            <div className="text-xs text-gray-500">187 students</div>
          </button>
          <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-sm">
            <div className="text-sm font-medium text-gray-900">Pending Grades</div>
            <div className="text-xs text-gray-500">23 assessments</div>
          </button>
          <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-sm">
            <div className="text-sm font-medium text-gray-900">IPT Students</div>
            <div className="text-xs text-gray-500">72 active</div>
          </button>
          <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-sm">
            <div className="text-sm font-medium text-gray-900">Failed Students</div>
            <div className="text-xs text-gray-500">8 students</div>
          </button>
          <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-sm">
            <div className="text-sm font-medium text-gray-900">Top Performers</div>
            <div className="text-xs text-gray-500">15 students</div>
          </button>
          <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-sm">
            <div className="text-sm font-medium text-gray-900">Late Submissions</div>
            <div className="text-xs text-gray-500">12 pending</div>
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="bg-white rounded-xl shadow-sm border transition-all duration-300">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Search Results</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm text-gray-600">Showing {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="name">Sort by: Name</option>
                <option value="registration">Sort by: Registration</option>
                <option value="course">Sort by: Course</option>
                <option value="grade">Sort by: Grade</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input 
                    type="checkbox" 
                    className="rounded focus:ring-blue-500"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      className="rounded focus:ring-blue-500"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => handleRowSelect(item.id)}
                    />
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.regNumber}</div>
                    <div className="text-sm text-gray-500">{item.name}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.courseCode}</div>
                    <div className="text-sm text-gray-500">{item.courseName}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      item.grade >= 70 ? 'text-green-600' : 
                      item.grade >= 50 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {item.grade}%
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'Active' ? 'bg-green-100 text-green-800' :
                      item.status === 'Failing' ? 'bg-red-100 text-red-800' :
                      item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.updated}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-300">View</button>
                    <button className="text-green-600 hover:text-green-900 transition-colors duration-300">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 md:px-6 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{' '}
              <span className="font-medium">{filteredData.length}</span> results
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 border border-gray-300 rounded text-sm ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
              } transition-all duration-300`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded text-sm min-w-[40px] transition-all duration-300 ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border border-gray-300 rounded text-sm ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
              } transition-all duration-300`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedRows.length > 0 && (
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-sm text-gray-600">{selectedRows.length} {selectedRows.length === 1 ? 'item' : 'items'} selected</span>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Export Selected
              </button>
              <button 
                onClick={handleSendNotification}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
              >
                Send Notification
              </button>
              <button 
                onClick={handleFlagForReview}
                className="px-4 py-2 border border-red-300 text-red-700 text-sm rounded-lg hover:bg-red-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
              >
                Flag for Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilterPage;