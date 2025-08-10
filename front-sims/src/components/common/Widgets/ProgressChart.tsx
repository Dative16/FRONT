import React from 'react';

const ProgressChart: React.FC = () => {
  const courses = [
    { name: 'Mathematics', progress: 85 },
    { name: 'Computer Science', progress: 70 },
    { name: 'Physics', progress: 60 },
    { name: 'English', progress: 90 },
  ];
  
  return (
    <div className="space-y-4">
      {courses.map((course, index) => (
        <div key={index}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">{course.name}</span>
            <span className="text-sm font-medium">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressChart;