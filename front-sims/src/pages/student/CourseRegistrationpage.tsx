// src/pages/student/CourseRegistrationPage.tsx
import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  Printer,
  Calendar,
  BookOpen,
  MapPin,
  Hash,
  GraduationCap
} from 'lucide-react';

interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
}

interface StudentInfo {
  id: string;
  fullName: string;
  avatar: string;
  program: string;
  department: string;
  college: string;
  semester: string;
  academicYear: string;
  registrationNumber: string;
  caCardNumber: string;
  ueCardNumber: string;
}

const CourseRegistration: React.FC = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [registrationStatus, setRegistrationStatus] = useState<'registered' | 'pending' | 'not_registered'>('registered');

  // Mock student data
  const studentInfo: StudentInfo = {
    id: '1',
    fullName: 'William Amani Mwakanyamale',
    avatar: '/api/placeholder/120/120',
    program: 'Bachelor of Information Technology',
    department: 'Computer Science & Engineering',
    college: 'College of Informatics and Virtual Education',
    semester: 'Semester II',
    academicYear: '2024/2025',
    registrationNumber: 'REG/BIT/2021/00123',
    caCardNumber: 'CA-2024-123456',
    ueCardNumber: 'UE-2024-123456'
  };

  // Mock registered courses
  const registeredCourses: Course[] = [
    { id: 1, code: 'CS201', name: 'Data Structures and Algorithms', credits: 3 },
    { id: 2, code: 'CS202', name: 'Object Oriented Programming', credits: 4 },
    { id: 3, code: 'CS203', name: 'Database Management Systems', credits: 3 },
    { id: 4, code: 'CS204', name: 'Computer Networks', credits: 3 },
    { id: 5, code: 'MA201', name: 'Discrete Mathematics', credits: 3 },
    { id: 6, code: 'CS205', name: 'Software Engineering', credits: 4 }
  ];

  const totalCredits = registeredCourses.reduce((sum, course) => sum + course.credits, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered': return 'bg-green-50 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'not_registered': return 'bg-red-50 text-red-800 border-red-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'registered': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'not_registered': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'registered': 
        return `You have successfully registered for ${studentInfo.semester}, ${studentInfo.academicYear}. Your courses are listed below.`;
      case 'pending': 
        return `Your registration for ${studentInfo.semester}, ${studentInfo.academicYear} is pending approval.`;
      case 'not_registered': 
        return `You have not registered for ${studentInfo.semester}, ${studentInfo.academicYear}. Please complete your registration.`;
      default: 
        return 'Registration status unknown.';
    }
  };

  // ID Card Component (using the design from Dashboard)
  const IDCard: React.FC<{ type: 'CA' | 'UE' }> = ({ type }) => {
    const cardNumber = type === 'CA' ? studentInfo.caCardNumber : studentInfo.ueCardNumber;
    const cardType = type === 'CA' ? 'CONTINUOUS ASSESSMENT CARD' : 'UNIVERSITY EXAMINATION CARD';
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-gray-500 to-gray-700 text-white p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Mbeya University of Science and Technology</h3>
            <div className="bg-white text-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
              <GraduationCap size={16} />
            </div>
          </div>
          <p className="text-sm mt-1">{studentInfo.college}</p>
        </div>
        
        {/* Card Body */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm">Student Name</p>
              <p className="font-semibold">{studentInfo.fullName}</p>
            </div>
            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200">
              <img 
                src={studentInfo.avatar}
                alt={studentInfo.fullName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
              <div 
                className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500 hidden items-center justify-center text-white font-bold text-xl"
              >
                {studentInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Registration No.</p>
              <p className="font-semibold">{studentInfo.registrationNumber}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">{type} Card No.</p>
              <p className="font-semibold">{cardNumber}</p>
            </div>
          </div>
          
          {/* Card Footer */}
          <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between">
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-1" size={16} />
              <span className="text-sm text-gray-600">Valid</span>
            </div>
            <div className="text-sm text-gray-600">{studentInfo.academicYear}</div>
          </div>
        </div>
        
        {/* Card Type Badge */}
        <div className={`px-4 py-1 text-center font-bold ${
          type === 'CA' ? 'bg-yellow-500' : 'bg-purple-600'
        } text-white`}>
          {cardType}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Registration</h1>
          <p className="text-gray-600 mt-1">Manage your course registration and examination cards</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">{studentInfo.semester}, {studentInfo.academicYear}</span>
        </div>
      </div>

      {/* Registration Status Notification */}
      {showNotification && (
        <div className={`rounded-lg border p-4 ${getStatusColor(registrationStatus)}`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {getStatusIcon(registrationStatus)}
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-semibold">Registration Status</h3>
              <p className="text-sm mt-1">{getStatusMessage(registrationStatus)}</p>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Registered Courses Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Registered Courses</h2>
              <p className="text-sm text-gray-600 mt-1">
                {registeredCourses.length} courses • {totalCredits} total credits
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">{studentInfo.semester}</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Course Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Course Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Credits
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {registeredCourses.map((course, index) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {course.code}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{course.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      {course.credits}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={3} className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                  Total Credits:
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  <div className="flex items-center">
                    {totalCredits}
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Examination Cards */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Examination Cards</h2>
          <p className="text-sm text-gray-600 mb-6">
            Download or print your examination cards for CA (Continuous Assessment) and UE (University Examination)
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* CA Card */}
          <IDCard type="CA" />
          
          {/* UE Card */}
          <IDCard type="UE" />
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Hash className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-blue-900">Important Information</h3>
            <ul className="text-sm text-blue-800 mt-2 space-y-1">
              <li>• Ensure you have your examination cards printed before exam dates</li>
              <li>• Contact the academic office if you notice any errors in your information</li>
              <li>• Keep your examination cards safe and bring them to every examination</li>
              <li>• Registration changes must be made before the add/drop deadline</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration;