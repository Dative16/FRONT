import React from 'react';

const CalendarWidget: React.FC = () => {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const dates = Array.from({ length: 35 }, (_, i) => i + 1 - 4);
  
  return (
    <div className="mt-4">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {dates.map((date, index) => (
          <div 
            key={index} 
            className={`
              h-10 flex items-center justify-center rounded-lg
              ${date < 1 || date > 30 ? 'text-gray-300' : 'hover:bg-gray-100'}
              ${date === 10 ? 'bg-blue-100 text-blue-800 font-medium' : ''}
            `}
          >
            {date > 0 && date <= 30 ? date : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;