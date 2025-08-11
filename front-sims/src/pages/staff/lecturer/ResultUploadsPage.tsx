import React, { useState } from 'react';

const ResultUploadsPage: React.FC = () => {
  // State for form selections
  const [course, setCourse] = useState('');
  const [resultType, setResultType] = useState('');
  const [bulkCourse, setBulkCourse] = useState('');
  const [bulkResultType, setBulkResultType] = useState('');
  const [studentId, setStudentId] = useState('');
  const [comments, setComments] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  
  // Sample data
  const courses = [
    "CS301 - Database Systems",
    "CS451 - Software Engineering",
    "CS262 - Data Structures",
    "CS505 - Machine Learning",
    "CS99 - Programming Fundamentals"
  ];
  
  const resultTypes = [
    "Continuous Assessment (CA)",
    "Final Examination",
    "Supplementary Exam",
    "Carry Assessment"
  ];
  
  const recentUploads = [
    { id: 1, date: "2024-03-15 14:30", course: "CS301 - Database Systems", type: "Final Exam" },
    { id: 2, date: "2024-03-14 11:20", course: "CS451 - Software Engineering", type: "Quiz" },
    { id: 3, date: "2024-03-12 09:45", course: "CS505 - Machine Learning", type: "Project" },
    { id: 4, date: "2024-03-10 16:15", course: "CS262 - Data Structures", type: "Midterm Exam" }
  ];
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // Handle template download
  const handleDownloadTemplate = () => {
    if (bulkCourse && bulkResultType) {
      console.log(`Downloading template for ${bulkCourse} - ${bulkResultType}`);
      // In a real app, this would trigger a download
      alert(`Downloading template for ${bulkCourse} - ${bulkResultType}`);
    }
    setShowTemplateModal(false);
  };
  
  // Handle single result upload
  const handleSingleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (course && resultType && studentId) {
      console.log("Uploading single result:", { course, resultType, studentId, comments });
      alert("Single result uploaded successfully!");
      // Reset form
      setCourse('');
      setResultType('');
      setStudentId('');
      setComments('');
    } else {
      alert("Please fill in all required fields");
    }
  };
  
  // Handle bulk upload
  const handleBulkUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (bulkCourse && bulkResultType && selectedFile) {
      console.log("Uploading bulk results:", { bulkCourse, bulkResultType, file: selectedFile.name });
      alert("Bulk results uploaded successfully!");
      // Reset form
      setBulkCourse('');
      setBulkResultType('');
      setSelectedFile(null);
    } else {
      alert("Please select course, result type, and a file to upload");
    }
  };
  
  // Render template download modal
  const renderTemplateModal = () => (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Download Results Template</h3>
          <button 
            onClick={() => setShowTemplateModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <div className="bg-blue-50 p-4 rounded-xl mb-4">
            <h4 className="font-medium text-blue-800 mb-2">Template Details</h4>
            <p className="text-sm">
              <span className="font-medium">Course:</span> {bulkCourse || "Not selected"}
            </p>
            <p className="text-sm">
              <span className="font-medium">Result Type:</span> {bulkResultType || "Not selected"}
            </p>
          </div>
          
          <h4 className="font-medium text-gray-800 mb-3">Template Format:</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Student ID</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Student Name</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Score</th>
                  {bulkResultType === "Carry Assessment" && (
                    <>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Previous Semester</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Reason</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">CG2021/001</td>
                  <td className="px-4 py-2 border-b">John Mwangi</td>
                  <td className="px-4 py-2 border-b">78</td>
                  {bulkResultType === "Carry Assessment" && (
                    <>
                      <td className="px-4 py-2 border-b">2023/2024</td>
                      <td className="px-4 py-2 border-b">Incomplete</td>
                    </>
                  )}
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">CG2021/002</td>
                  <td className="px-4 py-2 border-b">Sarah Johnson</td>
                  <td className="px-4 py-2 border-b">85</td>
                  {bulkResultType === "Carry Assessment" && (
                    <>
                      <td className="px-4 py-2 border-b">2023/2024</td>
                      <td className="px-4 py-2 border-b">Failed</td>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-xl mb-6">
          <h4 className="font-medium text-blue-800 mb-2">Upload Guidelines</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Only include students carrying the course</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Enter final carry assessment marks</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Include previous semester/year information</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Specify carry reason (failed/incomplete)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Maximum 30 students per upload (typically smaller group)</span>
            </li>
          </ul>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleDownloadTemplate}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Download Template
          </button>
          <button
            onClick={() => setShowTemplateModal(false)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Result Uploads</h1>
        <p className="text-gray-600">Upload student results for all assessment types including CA, Final Exam, Supplementary, and Carry assessments.</p>
      </div>

      {/* Stats Card */}
      <div className="bg-white p-5 rounded-xl shadow border border-gray-100 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-600">Results This Semester</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">1,247</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-blue-700">Pending Uploads</p>
              <p className="text-lg font-bold">5</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-green-700">Uploaded Today</p>
              <p className="text-lg font-bold">3</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-red-700">Failed Uploads</p>
              <p className="text-lg font-bold">2</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Single Result Upload */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Single Result Upload</h2>
          
          <form onSubmit={handleSingleUpload} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Course</option>
                  {courses.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Result Type</label>
                <select
                  value={resultType}
                  onChange={(e) => setResultType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Result Type</option>
                  {resultTypes.map((rt, i) => (
                    <option key={i} value={rt}>{rt}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student ID (e.g., CG001 or CG2021/001)
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter student ID"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments (Optional)
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Additional comments about the result"
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">Instructions</h4>
              <p className="text-sm text-yellow-700">
                Select course and result type to see specific requirements for this assessment.
              </p>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Upload Single Result
            </button>
          </form>
          
          {/* Recent Uploads */}
          <div className="mt-8">
            <h3 className="text-md font-medium text-gray-800 mb-4">Recent Result Uploads</h3>
            <div className="space-y-3">
              {recentUploads.map(upload => (
                <div key={upload.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{upload.course}</p>
                    <p className="text-xs text-gray-600">{upload.type} • {upload.date}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bulk Result Upload */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Bulk Result Upload</h2>
          
          <form onSubmit={handleBulkUpload} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <select
                  value={bulkCourse}
                  onChange={(e) => setBulkCourse(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Course</option>
                  {courses.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Result Type</label>
                <select
                  value={bulkResultType}
                  onChange={(e) => setBulkResultType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Result Type</option>
                  {resultTypes.map((rt, i) => (
                    <option key={i} value={rt}>{rt}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Step 1: Download Template</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Download template for carry assessment results.
                </p>
                <button
                  type="button"
                  onClick={() => setShowTemplateModal(true)}
                  disabled={!bulkCourse || !bulkResultType}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    bulkCourse && bulkResultType 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow hover:shadow-md'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Download Template
                </button>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Step 2: Upload Completed File</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Upload your completed file with student results.
                </p>
                <label className="block w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition-colors">
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".xlsx,.csv"
                  />
                  <div className="space-y-2">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600 hover:text-blue-500">
                        Click to upload
                      </span>
                      <span> or drag and drop</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {selectedFile 
                        ? `Selected: ${selectedFile.name}` 
                        : "Excel (.xlsx) or CSV files only"}
                    </p>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-2">Upload Guidelines</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Only include students carrying the course</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Enter final carry assessment marks</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Include previous semester/year information</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Specify carry reason (failed/incomplete)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Maximum 30 students per upload (typically smaller group)</span>
                </li>
              </ul>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Upload Bulk Results
            </button>
          </form>
          
          {/* Carry Assessments */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-medium text-gray-800">Carry Assessments</h3>
              <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Updated this month</span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <p className="font-medium text-gray-900">Final Examination</p>
                <span className="text-sm text-gray-600">45 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">Generated</span>
                <div className="space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    View
                  </button>
                  <button className="text-green-600 hover:text-green-800 text-sm px-3 py-1 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Template Download Modal */}
      {showTemplateModal && renderTemplateModal()}
    </div>
  );
};

export default ResultUploadsPage;