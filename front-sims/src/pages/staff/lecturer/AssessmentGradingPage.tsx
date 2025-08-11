import React, { useState } from 'react';

interface AssessmentComponent {
  id: string;
  name: string;
  marks: number;
}

interface AssessmentPlan {
  id: string;
  course: string;
  academicYear: string;
  totalCAMarks: number;
  finalExamMarks: number;
  components: AssessmentComponent[];
}

interface StudentGrade {
  id: string;
  name: string;
  studentId: string;
  assignment1: number | null;
  quiz1: number | null;
  assignment2: number | null;
  finalExam: number | null;
  total: number | null;
  status: 'pending' | 'graded' | 'published';
}

const AssessmentGradingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('assessments');
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  
  // Form state for new assessment plan
  const [newPlan, setNewPlan] = useState({
    course: '',
    academicYear: '',
    totalCAMarks: 40,
    finalExamMarks: 60,
    components: [{ id: '1', name: 'Assignment 1', marks: 20 }] as AssessmentComponent[]
  });

  // Template download state
  const [templateOptions, setTemplateOptions] = useState({
    selection: 'custom',
    components: {
      assignment1: false,
      quiz1: false,
      assignment2: false,
      quiz2: false,
      finalExam: false
    },
    format: 'excel'
  });

  // Assessment plans with state for editing
  const [assessmentPlans, setAssessmentPlans] = useState<AssessmentPlan[]>([
    {
      id: '1',
      course: 'CS301 - Database Systems (2023/2024)',
      academicYear: '2023/2024',
      totalCAMarks: 40,
      finalExamMarks: 60,
      components: [
        { id: '1', name: 'Assignment 1', marks: 10 },
        { id: '2', name: 'Quiz 1', marks: 10 },
        { id: '3', name: 'Assignment 2', marks: 10 },
        { id: '4', name: 'Quiz 2', marks: 10 }
      ]
    },
    {
      id: '2',
      course: 'CS401 - Software Engineering (2023/2024)',
      academicYear: '2023/2024',
      totalCAMarks: 50,
      finalExamMarks: 50,
      components: [
        { id: '1', name: 'Project Proposal', marks: 15 },
        { id: '2', name: 'Midterm', marks: 15 },
        { id: '3', name: 'Project Demo', marks: 20 }
      ]
    }
  ]);

  // Grading queue data
  const [gradingQueue] = useState([
    {
      id: '1',
      title: 'Database Design Assignment',
      course: 'CS301 - Database Systems',
      dueDate: 'Mar 15, 2025',
      submissions: 45,
      pending: 8,
      graded: 37
    },
    {
      id: '2',
      title: 'Algorithms Midterm',
      course: 'CS262 - Algorithms',
      dueDate: 'Mar 8, 2025',
      submissions: 52,
      pending: 4,
      graded: 48
    },
    {
      id: '3',
      title: 'Software Requirements Quiz',
      course: 'CS451 - Advanced SE',
      dueDate: 'Mar 10, 2025',
      submissions: 42,
      pending: 0,
      graded: 42
    }
  ]);

  // Grade book data
  const [gradebook] = useState<StudentGrade[]>([
    {
      id: '1',
      name: 'John Smith',
      studentId: 'S12345',
      assignment1: 85,
      quiz1: 90,
      assignment2: 78,
      finalExam: 92,
      total: 87,
      status: 'published'
    },
    {
      id: '2',
      name: 'Emma Johnson',
      studentId: 'S12346',
      assignment1: 92,
      quiz1: 88,
      assignment2: 95,
      finalExam: 89,
      total: 90,
      status: 'published'
    },
    {
      id: '3',
      name: 'Michael Brown',
      studentId: 'S12347',
      assignment1: 78,
      quiz1: 82,
      assignment2: 80,
      finalExam: null,
      total: null,
      status: 'pending'
    },
    {
      id: '4',
      name: 'Sarah Davis',
      studentId: 'S12348',
      assignment1: 88,
      quiz1: 91,
      assignment2: 85,
      finalExam: 87,
      total: 87,
      status: 'graded'
    }
  ]);

  // Analytics data
  const analyticsData = {
    averageScores: {
      assignment1: 85.5,
      quiz1: 87.8,
      assignment2: 84.2,
      finalExam: 88.1,
      overall: 86.4
    },
    gradeDistribution: {
      A: 32,
      B: 45,
      C: 18,
      D: 5,
      F: 0
    }
  };

  const addComponent = () => {
    const newComponent: AssessmentComponent = {
      id: Date.now().toString(),
      name: '',
      marks: 0
    };
    setNewPlan(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }));
  };

  const removeComponent = (id: string) => {
    setNewPlan(prev => ({
      ...prev,
      components: prev.components.filter(comp => comp.id !== id)
    }));
  };

  const updateComponent = (id: string, field: string, value: string | number) => {
    setNewPlan(prev => ({
      ...prev,
      components: prev.components.map(comp =>
        comp.id === id ? { ...comp, [field]: value } : comp
      )
    }));
  };

  const handleSavePlan = () => {
    if (editingPlanId) {
      // Update existing plan
      setAssessmentPlans(prev => 
        prev.map(plan => 
          plan.id === editingPlanId ? { ...newPlan, id: editingPlanId } as AssessmentPlan : plan
        )
      );
      setEditingPlanId(null);
    } else {
      // Create new plan
      const newPlanObj: AssessmentPlan = {
        id: Date.now().toString(),
        ...newPlan
      };
      setAssessmentPlans(prev => [...prev, newPlanObj]);
    }
    
    setShowPlanForm(false);
    setNewPlan({
      course: '',
      academicYear: '',
      totalCAMarks: 40,
      finalExamMarks: 60,
      components: [{ id: '1', name: 'Assignment 1', marks: 20 }]
    });
  };

  const handleEditPlan = (plan: AssessmentPlan) => {
    setEditingPlanId(plan.id);
    setNewPlan({
      course: plan.course,
      academicYear: plan.academicYear,
      totalCAMarks: plan.totalCAMarks,
      finalExamMarks: plan.finalExamMarks,
      components: [...plan.components]
    });
    setShowPlanForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePlan = (id: string) => {
    setAssessmentPlans(prev => prev.filter(plan => plan.id !== id));
  };

  const handleTemplateDownload = () => {
    console.log('Downloading template with options:', templateOptions);
    setShowTemplateModal(false);
  };

  const renderAssessmentsTab = () => (
    <>
      {/* Assessment Plan Setup Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Assessment Plan Setup</h2>
          <button
            onClick={() => {
              setShowPlanForm(!showPlanForm);
              if (showPlanForm) {
                setEditingPlanId(null);
                setNewPlan({
                  course: '',
                  academicYear: '',
                  totalCAMarks: 40,
                  finalExamMarks: 60,
                  components: [{ id: '1', name: 'Assignment 1', marks: 20 }]
                });
              }
            }}
            className={`px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${
              showPlanForm 
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
            }`}
          >
            {showPlanForm ? 'Hide Form' : 'Create New Plan'}
          </button>
        </div>

        {/* New Plan Form */}
        {showPlanForm && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6 transition-all duration-300">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              {editingPlanId ? 'Edit Assessment Plan' : 'Create New Assessment Plan'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <select
                  value={newPlan.course}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, course: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Course</option>
                  <option value="CS301">CS301 - Database Systems</option>
                  <option value="CS401">CS401 - Software Engineering</option>
                  <option value="CS262">CS262 - Algorithms</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                <select
                  value={newPlan.academicYear}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, academicYear: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Year</option>
                  <option value="2023/2024">2023/2024</option>
                  <option value="2024/2025">2024/2025</option>
                </select>
              </div>
            </div>

            {/* Continuous Assessment Breakdown */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Continuous Assessment Breakdown</h3>
                <button
                  onClick={addComponent}
                  className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Component
                </button>
              </div>
              
              <div className="space-y-3">
                {newPlan.components.map((component) => (
                  <div key={component.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Component name"
                        value={component.name}
                        onChange={(e) => updateComponent(component.id, 'name', e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="w-20">
                      <input
                        type="number"
                        placeholder="Marks"
                        value={component.marks || ''}
                        onChange={(e) => updateComponent(component.id, 'marks', parseInt(e.target.value) || 0)}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <button
                      onClick={() => removeComponent(component.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total CA Marks</label>
                <input
                  type="number"
                  value={newPlan.totalCAMarks}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, totalCAMarks: parseInt(e.target.value) || 0 }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Final Exam Marks</label>
                <input
                  type="number"
                  value={newPlan.finalExamMarks}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, finalExamMarks: parseInt(e.target.value) || 0 }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSavePlan}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {editingPlanId ? 'Update Plan' : 'Save Assessment Plan'}
              </button>
              <button
                onClick={() => {
                  setShowPlanForm(false);
                  setEditingPlanId(null);
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Current Assessment Plans */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Current Assessment Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assessmentPlans.map((plan) => (
              <div key={plan.id} className="bg-white p-6 rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 text-lg">{plan.course}</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Total CA: <span className="font-medium">{plan.totalCAMarks}</span> marks | 
                      Final Exam: <span className="font-medium">{plan.finalExamMarks}</span> marks
                    </p>
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">CA Components:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {plan.components.map(comp => (
                          <li key={comp.id} className="flex justify-between">
                            <span>{comp.name}</span>
                            <span>{comp.marks} marks</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex space-x-3 mt-auto">
                    <button
                      onClick={() => {
                        setSelectedPlan(plan.id);
                        setShowTemplateModal(true);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow hover:shadow-md flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Template
                    </button>
                    <button 
                      onClick={() => handleEditPlan(plan)}
                      className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeletePlan(plan.id)}
                      className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assessment List */}
      <div className="space-y-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-medium text-gray-900 text-lg">CS301 - Database Design Assignment</h3>
              <p className="text-sm text-gray-600 mt-1">Due: March 15, 2025 • 45 submissions</p>
              <div className="flex items-center space-x-3 mt-2">
                <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full">8 Pending</span>
                <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">37 Graded</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                Grade Now
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow hover:shadow-md">
                View Details
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-medium text-gray-900 text-lg">CS451 - Software Requirements Quiz</h3>
              <p className="text-sm text-gray-600 mt-1">Due: March 10, 2025 • 42 submissions</p>
              <div className="flex items-center space-x-3 mt-2">
                <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">All Graded</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">Published</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                View Results
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow hover:shadow-md">
                Export Grades
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-medium text-gray-900 text-lg">CS262 - Algorithms Midterm</h3>
              <p className="text-sm text-gray-600 mt-1">Due: March 8, 2025 • 52 submissions</p>
              <div className="flex items-center space-x-3 mt-2">
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full">4 Pending</span>
                <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">48 Graded</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                Continue Grading
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow hover:shadow-md">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderGradingQueue = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Grading Queue</h2>
        
        <div className="space-y-4">
          {gradingQueue.map((item) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-3 md:mb-0">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.course} • Due: {item.dueDate}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                      {item.submissions} Submissions
                    </span>
                    {item.pending > 0 && (
                      <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full">
                        {item.pending} Pending
                      </span>
                    )}
                    {item.graded > 0 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                        {item.graded} Graded
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow hover:shadow-md">
                    Start Grading
                  </button>
                  <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
              
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${(item.graded / item.submissions) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Feedback</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Database Design Assignment</h4>
                <p className="text-sm text-gray-600 mt-1">You provided feedback to 12 students in the last 24 hours</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="flex items-start">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Algorithms Midterm</h4>
                <p className="text-sm text-gray-600 mt-1">4 students haven't received feedback yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGradebook = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Grade Book</h2>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              Filter
            </button>
            <button className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow hover:shadow-md">
              Export Grades
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Student</th>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Assignment 1</th>
                <th scope="col" className="px-6 py-3">Quiz 1</th>
                <th scope="col" className="px-6 py-3">Assignment 2</th>
                <th scope="col" className="px-6 py-3">Final Exam</th>
                <th scope="col" className="px-6 py-3">Total</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {gradebook.map((student) => (
                <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {student.name}
                  </th>
                  <td className="px-6 py-4">{student.studentId}</td>
                  <td className="px-6 py-4">{student.assignment1 ?? '-'}</td>
                  <td className="px-6 py-4">{student.quiz1 ?? '-'}</td>
                  <td className="px-6 py-4">{student.assignment2 ?? '-'}</td>
                  <td className="px-6 py-4">{student.finalExam ?? '-'}</td>
                  <td className="px-6 py-4 font-medium">
                    {student.total ? `${student.total}%` : '-'}
                  </td>
                  <td className="px-6 py-4">
                    {student.status === 'pending' && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-1 rounded-full">
                        Pending
                      </span>
                    )}
                    {student.status === 'graded' && (
                      <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full">
                        Graded
                      </span>
                    )}
                    {student.status === 'published' && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full">
                        Published
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Grade Distribution</h3>
          <div className="space-y-3">
            {Object.entries(analyticsData.gradeDistribution).map(([grade, count]) => (
              <div key={grade} className="flex items-center">
                <span className="w-16 text-sm font-medium text-gray-700">{grade}</span>
                <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    style={{ width: `${(count / 100) * 100}%` }}
                  ></div>
                </div>
                <span className="w-10 text-right text-sm font-medium text-gray-700">{count}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Assignment Statistics</h3>
          <div className="space-y-4">
            {Object.entries(analyticsData.averageScores).map(([assignment, score]) => (
              <div key={assignment} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {assignment.replace(/([A-Z])/g, ' $1')}
                </span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-3">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12">{score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Performance Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Average Score</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">86.4%</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +2.4% from last term
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl border border-green-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Completion Rate</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">94.7%</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +5.1% from last term
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-5 rounded-xl border border-amber-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Pending Assessments</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 text-sm text-red-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              -3 from last week
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-4">Grade Distribution</h3>
            <div className="relative h-64 flex items-center justify-center">
              {/* Placeholder for chart */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-full h-full flex items-center justify-center text-gray-500">
                Grade Distribution Chart
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-4">Assignment Performance</h3>
            <div className="relative h-64 flex items-center justify-center">
              {/* Placeholder for chart */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-full h-full flex items-center justify-center text-gray-500">
                Performance Trend Chart
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Top Performing Students</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Student</th>
                <th scope="col" className="px-6 py-3">Assignment 1</th>
                <th scope="col" className="px-6 py-3">Quiz 1</th>
                <th scope="col" className="px-6 py-3">Assignment 2</th>
                <th scope="col" className="px-6 py-3">Final Exam</th>
                <th scope="col" className="px-6 py-3">Total</th>
                <th scope="col" className="px-6 py-3">Trend</th>
              </tr>
            </thead>
            <tbody>
              {gradebook
                .filter(student => student.total !== null)
                .sort((a, b) => (b.total || 0) - (a.total || 0))
                .slice(0, 5)
                .map((student) => (
                  <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {student.name}
                    </th>
                    <td className="px-6 py-4">{student.assignment1}</td>
                    <td className="px-6 py-4">{student.quiz1}</td>
                    <td className="px-6 py-4">{student.assignment2}</td>
                    <td className="px-6 py-4">{student.finalExam}</td>
                    <td className="px-6 py-4 font-medium">
                      {student.total}%
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        +12.5%
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Template Download Modal
  const renderTemplateModal = () => (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-2xl p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto transform transition-transform duration-300 scale-95 animate-in fade-in-90 zoom-in-90">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Download Results Template</h3>
          </div>
          <button
            onClick={() => setShowTemplateModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Select which components you want to include in your results template:
        </p>

        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-3">Select Components to Include:</h4>
          
          <div className="space-y-3">
            <label className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <input
                type="radio"
                name="selection"
                checked={templateOptions.selection === 'ca'}
                onChange={() => setTemplateOptions(prev => ({ ...prev, selection: 'ca' }))}
                className="mt-1 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <div className="font-medium text-gray-800">CA Components Only</div>
                <div className="text-sm text-gray-600 mt-1">Template with only continuous assessment components</div>
              </div>
            </label>

            <label className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <input
                type="radio"
                name="selection"
                checked={templateOptions.selection === 'exam'}
                onChange={() => setTemplateOptions(prev => ({ ...prev, selection: 'exam' }))}
                className="mt-1 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <div className="font-medium text-gray-800">Final Exam Only</div>
                <div className="text-sm text-gray-600 mt-1">Template with only final examination marks</div>
              </div>
            </label>

            <label className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <input
                type="radio"
                name="selection"
                checked={templateOptions.selection === 'custom'}
                onChange={() => setTemplateOptions(prev => ({ ...prev, selection: 'custom' }))}
                className="mt-1 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <div className="font-medium text-gray-800">Custom Selection</div>
                <div className="text-sm text-gray-600 mt-1">Choose specific components to include</div>
              </div>
            </label>
          </div>

          {templateOptions.selection === 'custom' && (
            <div className="mt-4 ml-8 space-y-3">
              <h5 className="font-medium text-gray-700 mb-2">Select Components:</h5>
              <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                <input type="checkbox" className="text-blue-600 focus:ring-blue-500" />
                <span>Assignment 1 (10)</span>
              </label>
              <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                <input type="checkbox" className="text-blue-600 focus:ring-blue-500" />
                <span>Quiz 1 (10)</span>
              </label>
              <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                <input type="checkbox" className="text-blue-600 focus:ring-blue-500" />
                <span>Assignment 2 (10)</span>
              </label>
              <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                <input type="checkbox" className="text-blue-600 focus:ring-blue-500" />
                <span>Quiz 2 (10)</span>
              </label>
              <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                <input type="checkbox" className="text-blue-600 focus:ring-blue-500" />
                <span>Final Exam (60 marks)</span>
              </label>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-3">Template Format:</h4>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 flex-1 text-center cursor-pointer">
              <input
                type="radio"
                name="format"
                checked={templateOptions.format === 'excel'}
                onChange={() => setTemplateOptions(prev => ({ ...prev, format: 'excel' }))}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>Excel (.xlsx)</span>
            </label>
            <label className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 flex-1 text-center cursor-pointer">
              <input
                type="radio"
                name="format"
                checked={templateOptions.format === 'csv'}
                onChange={() => setTemplateOptions(prev => ({ ...prev, format: 'csv' }))}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>CSV (.csv)</span>
            </label>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-100">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h5 className="font-medium text-blue-800">Template Instructions</h5>
              <ul className="text-sm text-blue-700 mt-2 space-y-1.5">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>The template includes Student ID, Registration Number, and Name columns</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Fill in the marks for each selected component</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Leave cells empty for absent students or incomplete assessments</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Do not modify the header row or student information columns</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Save the file and upload it back through the "Upload Results" section</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleTemplateDownload}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Template
          </button>
          <button
            onClick={() => setShowTemplateModal(false)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Assessment & Grading</h1>
        <p className="text-gray-600">Set up assessment plans and upload continuous assessment and examination results.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 transition-all duration-300 hover:shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Pending Grades</h3>
          <p className="text-2xl font-bold text-red-600 mt-1">12</p>
          <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full" style={{ width: '30%' }}></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 transition-all duration-300 hover:shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Completed</h3>
          <p className="text-2xl font-bold text-green-600 mt-1">145</p>
          <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 transition-all duration-300 hover:shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-1">This Week</h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">8</p>
          <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '20%' }}></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 transition-all duration-300 hover:shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Average Score</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">78.5%</p>
          <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: '78.5%' }}></div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white rounded-xl shadow border border-gray-100">
        <div className="border-b border-gray-200 px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('assessments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'assessments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors duration-300`}
            >
              Assessments
            </button>
            <button
              onClick={() => setActiveTab('grading')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'grading'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors duration-300`}
            >
              Grading Queue
            </button>
            <button
              onClick={() => setActiveTab('gradebook')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'gradebook'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors duration-300`}
            >
              Grade Book
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors duration-300`}
            >
              Analytics
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'assessments' && renderAssessmentsTab()}
          {activeTab === 'grading' && renderGradingQueue()}
          {activeTab === 'gradebook' && renderGradebook()}
          {activeTab === 'analytics' && renderAnalytics()}

          {/* Create New Assessment */}
          {activeTab === 'assessments' && !showPlanForm && (
            <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50 transition-all duration-300 hover:border-blue-300">
              <p className="text-gray-600 mb-4">Create new assessment or import grades</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                  New Assessment
                </button>
                <button className="px-6 py-2.5 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                  Import Grades
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Template Download Modal */}
      {showTemplateModal && renderTemplateModal()}
    </div>
  );
};

export default AssessmentGradingPage;