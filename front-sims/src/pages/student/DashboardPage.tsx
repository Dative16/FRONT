import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CreditCard, 
  Calendar, 
  Bell,
  Clock,
  Wifi,
  X,
  ChevronRight,
  Book,
  School,
  CalendarDays,
  Award,
  Clock3,
  LibraryBig,
  BarChart,
  FileText,
  Map,
  DollarSign,
  User,
  ClipboardList
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Mock data - updated with student info and timetable
const mockStudentData = {
  studentInfo: {
    name: "John M. Doe",
    registrationNumber: "BScIT/2020/1234",
    caCardNumber: "CA-123456",
    ueCardNumber: "UE-123456",
  },
  currentSemester: {
    name: "Semester 2, 2024/2025",
    progress: 46.7
  },
  academicInfo: {
    program: "BSc Information Technology",
    department: "Computer Science",
    currentGPA: 3.7,
    creditsCompleted: 72,
    totalCredits: 120,
  },
  registration: {
    status: "Active",
    coursesRegistered: 6,
    coursesRequired: 6
  },
  financial: {
    status: "Partially Paid",
    outstandingBalance: "TZS 800,000"
  },
  upcomingDeadlines: [
    {
      id: 1,
      title: "Fee Payment Deadline",
      daysLeft: 3,
    }
  ],
  announcements: [
    {
      id: 1,
      title: "Campus Wi-Fi Maintenance",
      timeAgo: "2 days ago",
    }
  ],
  timetable: [
    { day: "Mon", time: "08:00-10:00", course: "IT 201 - Database Systems", room: "CICT 101" },
    { day: "Mon", time: "10:00-12:00", course: "IT 203 - Web Technologies", room: "CICT 203" },
    { day: "Tue", time: "09:00-11:00", course: "IT 205 - Data Structures", room: "CICT 105" },
    { day: "Wed", time: "08:00-10:00", course: "IT 207 - Networking", room: "CICT 201" },
    { day: "Thu", time: "14:00-16:00", course: "IT 209 - Software Engineering", room: "CICT 301" },
    { day: "Fri", time: "10:00-12:00", course: "IT 211 - Mobile Development", room: "CICT 205" },
  ]
};

// Progress Card Component
const ProgressCard: React.FC<{
  title: string;
  value: string;
  percentage: number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, percentage, icon, color }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-600 font-medium text-sm">{title}</h3>
      <div className={`p-2 rounded-lg ${color}`}>
        {icon}
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="w-16 h-16">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textSize: '28px',
            pathColor: color.replace('text-', ''),
            textColor: color.replace('text-', ''),
            trailColor: '#f3f4f6',
          })}
        />
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

// Info Card Component
const InfoCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h3 className="text-gray-800 font-semibold">{title}</h3>
    </div>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

// Data Row Component
const DataRow: React.FC<{ label: string; value: string; highlight?: boolean }> = ({ 
  label, 
  value, 
  highlight = false 
}) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
    <span className="text-gray-600 text-sm">{label}</span>
    <span className={`font-medium ${highlight ? 'text-blue-600' : 'text-gray-800'}`}>
      {value}
    </span>
  </div>
);

// Quick Action Card Component
const QuickActionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}> = ({ icon, title, description, color }) => (
  <div className={`
    bg-white rounded-xl p-4 shadow-sm border border-gray-100 
    transition-all duration-300 transform hover:scale-[1.03] hover:shadow-md
    flex flex-col h-full
  `}>
    <div className={`p-3 rounded-lg ${color} w-12 h-12 flex items-center justify-center mb-3`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600 mt-1">{description}</p>
  </div>
);

// Timetable Popup Component
const TimetablePopup: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  timetable: Array<{day: string, time: string, course: string, room: string}> 
}> = ({ isOpen, onClose, timetable }) => {
  if (!isOpen) return null;

  // Group timetable by day
  const timetableByDay: Record<string, Array<{time: string, course: string, room: string}>> = {};
  
  timetable.forEach(item => {
    if (!timetableByDay[item.day]) {
      timetableByDay[item.day] = [];
    }
    timetableByDay[item.day].push({
      time: item.time,
      course: item.course,
      room: item.room
    });
  });

  // Get unique days in order
  const days = Object.keys(timetableByDay);
  
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl max-h-[90vh] overflow-auto border border-gray-200">
        {/* Header */}
        <div className="sticky top-0 bg-blue-50 text-blue-800 p-4 flex justify-between items-center border-b border-blue-100">
          <div>
            <h2 className="text-xl font-bold">Weekly Timetable</h2>
            <p className="text-sm text-blue-600 mt-1">
              Semester: {mockStudentData.currentSemester.name} | 
              Program: {mockStudentData.academicInfo.program}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-blue-600 hover:bg-blue-100 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Timetable Content */}
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  {days.map(day => (
                    <th key={day} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {['08:00-10:00', '10:00-12:00', '14:00-16:00'].map(timeSlot => (
                  <tr key={timeSlot}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {timeSlot}
                    </td>
                    {days.map(day => {
                      const classForSlot = timetableByDay[day]?.find(c => c.time === timeSlot);
                      return (
                        <td key={`${day}-${timeSlot}`} className="px-4 py-3 text-center">
                          {classForSlot ? (
                            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                              <div className="font-medium text-blue-800">{classForSlot.course}</div>
                              <div className="text-xs text-blue-600 mt-1">{classForSlot.room}</div>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
              Download Timetable <ChevronRight className="ml-1" size={16} />
            </button>
            <button className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg flex items-center">
              Print Timetable
            </button>
            <button 
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const StudentDashboard: React.FC = () => {
  const [showTimetable, setShowTimetable] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Quick actions data
  const quickActions = [
    {
      icon: <BookOpen size={24} className="text-blue-600" />,
      title: "Course Registration",
      description: "Register for next semester courses",
      color: "bg-blue-100"
    },
    {
      icon: <BarChart size={24} className="text-green-600" />,
      title: "View Grades",
      description: "Check your academic performance",
      color: "bg-green-100"
    },
    {
      icon: <DollarSign size={24} className="text-purple-600" />,
      title: "Fee Payment",
      description: "Pay tuition fees online",
      color: "bg-purple-100"
    },
    {
      icon: <FileText size={24} className="text-yellow-600" />,
      title: "Exam Cards",
      description: "Download examination cards",
      color: "bg-yellow-100"
    },
    {
      icon: <Map size={24} className="text-red-600" />,
      title: "Campus Map",
      description: "Navigate university facilities",
      color: "bg-red-100"
    },
    {
      icon: <User size={24} className="text-indigo-600" />,
      title: "Profile",
      description: "Update your personal information",
      color: "bg-indigo-100"
    },
    {
      icon: <ClipboardList size={24} className="text-orange-600" />,
      title: "Attendance",
      description: "View your class attendance",
      color: "bg-orange-100"
    },
    {
      icon: <LibraryBig size={24} className="text-teal-600" />,
      title: "Library",
      description: "Access digital resources",
      color: "bg-teal-100"
    }
  ];

  return (
    <div className="space-y-6 p-4 bg-gray-50 min-h-screen">
      <TimetablePopup 
        isOpen={showTimetable} 
        onClose={() => setShowTimetable(false)} 
        timetable={mockStudentData.timetable} 
      />
      
      {/* Header with Welcome Message */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 shadow-lg text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <p className="text-blue-100 mt-2">Welcome back, {mockStudentData.studentInfo.name}</p>
            <p className="text-sm text-blue-200 mt-1">
              {mockStudentData.academicInfo.program} | {mockStudentData.studentInfo.registrationNumber}
            </p>
          </div>
          <button 
            onClick={() => setShowTimetable(true)}
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg flex items-center mt-4 md:mt-0"
          >
            <Calendar className="mr-2" size={18} />
            View Timetable
          </button>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {quickActions.map((action, index) => (
            <div 
              key={index} 
              className={`transition-transform duration-500 ${isHovering ? 'hover:scale-105' : ''}`}
            >
              <QuickActionCard 
                icon={action.icon}
                title={action.title}
                description={action.description}
                color={action.color}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Progress Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <ProgressCard
          title="Semester Progress"
          value={mockStudentData.currentSemester.name}
          percentage={mockStudentData.currentSemester.progress}
          icon={<CalendarDays size={20} />}
          color="bg-blue-100 text-blue-600"
        />
        
        <ProgressCard
          title="Courses"
          value={`${mockStudentData.registration.coursesRegistered}/${mockStudentData.registration.coursesRequired}`}
          percentage={(mockStudentData.registration.coursesRegistered / mockStudentData.registration.coursesRequired) * 100}
          icon={<Book size={20} />}
          color="bg-green-100 text-green-600"
        />
        
        <ProgressCard
          title="Credit Progress"
          value={`${mockStudentData.academicInfo.creditsCompleted}/${mockStudentData.academicInfo.totalCredits}`}
          percentage={(mockStudentData.academicInfo.creditsCompleted / mockStudentData.academicInfo.totalCredits) * 100}
          icon={<LibraryBig size={20} />}
          color="bg-purple-100 text-purple-600"
        />
        
        <ProgressCard
          title="GPA"
          value={`${mockStudentData.academicInfo.currentGPA}/5.0`}
          percentage={(mockStudentData.academicInfo.currentGPA / 5) * 100}
          icon={<Award size={20} />}
          color="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <InfoCard
          title="Academic Information"
          icon={<School size={20} className="text-blue-600" />}
        >
          <DataRow label="Program" value={mockStudentData.academicInfo.program} />
          <DataRow label="Department" value={mockStudentData.academicInfo.department} />
          <DataRow label="Status" value={mockStudentData.registration.status} highlight />
        </InfoCard>
        
        <InfoCard
          title="Financial Status"
          icon={<CreditCard size={20} className="text-green-600" />}
        >
          <DataRow label="Fee Status" value={mockStudentData.financial.status} />
          <DataRow label="Outstanding Balance" value={mockStudentData.financial.outstandingBalance} highlight />
          <div className="mt-3 bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600 flex items-center">
              <Clock3 size={16} className="mr-2 text-yellow-500" />
              <span className="font-medium">Payment due in {mockStudentData.upcomingDeadlines[0].daysLeft} days</span>
            </p>
          </div>
        </InfoCard>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Upcoming Deadlines */}
        <InfoCard
          title="Upcoming Deadlines"
          icon={<Clock size={20} className="text-red-600" />}
        >
          <div className="space-y-3">
            {mockStudentData.upcomingDeadlines.map(deadline => (
              <div key={deadline.id} className="flex items-center p-3 bg-red-50 rounded-lg">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <Clock size={16} className="text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{deadline.title}</h4>
                  <p className="text-xs text-red-600 mt-1">{deadline.daysLeft} days remaining</p>
                </div>
              </div>
            ))}
            <button className="w-full mt-2 text-center text-blue-600 font-medium hover:underline">
              View all deadlines
            </button>
          </div>
        </InfoCard>

        {/* Announcements */}
        <InfoCard
          title="Announcements"
          icon={<Bell size={20} className="text-purple-600" />}
        >
          <div className="space-y-3">
            {mockStudentData.announcements.map(announcement => (
              <div key={announcement.id} className="flex items-center p-3 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Wifi size={16} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{announcement.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{announcement.timeAgo}</p>
                </div>
              </div>
            ))}
            <button className="w-full mt-2 text-center text-blue-600 font-medium hover:underline">
              View all announcements
            </button>
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

export default StudentDashboard;