import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  color 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <p className="text-gray-500 text-sm mt-2">{change}</p>
        </div>
        <div className={`${color} h-12 w-12 rounded-full flex items-center justify-center text-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;