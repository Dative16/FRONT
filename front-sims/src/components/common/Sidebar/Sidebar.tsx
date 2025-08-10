import React, { useState } from 'react';
import SidebarItem from './SidebarItem';
import { 
  HiHome, 
  HiCurrencyDollar,
  HiBookOpen,
  HiChartBar,
  HiCog,
  HiLogout,
  HiAcademicCap,
  HiClipboardList,
  HiNewspaper,
  HiShieldCheck,
  HiChat,
  HiUser,
  HiOfficeBuilding
} from 'react-icons/hi';

export interface MenuItemType {
  name: string;
  icon: any;
  path?: string;
  children?: MenuItemType[];
}

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const studentMenu: MenuItemType[] = [
    { 
      name: 'Dashboard', 
      icon: HiHome, 
      path: '/student/dashboard' 
    },
    { 
      name: 'Payments', 
      icon: HiCurrencyDollar,
      children: [
        { name: 'Create Invoices', icon: HiClipboardList, path: '/student/payments/create-invoices' },
        { name: 'Invoice List', icon: HiClipboardList, path: '/student/payments/invoice-list' },
        { name: 'Overpayment', icon: HiCurrencyDollar, path: '/student/payments/overpayment' }
      ]
    },
    { 
      name: 'Accommodation', 
      icon: HiOfficeBuilding,
      children: [
        { name: 'Apply', icon: HiClipboardList, path: '/student/accommodation/apply' },
        { name: 'Status', icon: HiShieldCheck, path: '/student/accommodation/status' }
      ]
    },
    { 
      name: 'Insurance (NHIF)', 
      icon: HiShieldCheck, 
      path: '/student/insurance' 
    },
    { 
      name: 'Course Registration', 
      icon: HiBookOpen, 
      path: '/student/course-registration' 
    },
    { 
      name: 'Examination Result', 
      icon: HiChartBar,
      children: [
        { name: 'CA Results', icon: HiAcademicCap, path: '/student/examination/ca' },
        { name: 'UE Results', icon: HiAcademicCap, path: '/student/examination/ue' }
      ]
    },
    { 
      name: 'IPT', 
      icon: HiClipboardList,
      children: [
        { name: 'Alive Notes', icon: HiNewspaper, path: '/student/ipt/alive-notes' },
        { name: 'Applications', icon: HiClipboardList, path: '/student/ipt/applications' },
        { name: 'Supervisors', icon: HiUser, path: '/student/ipt/supervisors' }
      ]
    },
    { 
      name: 'Graduation Gown', 
      icon: HiAcademicCap, 
      path: '/student/graduation-gown' 
    },
    { 
      name: 'My Full Profile', 
      icon: HiUser, 
      path: '/student/profile' 
    },
    { 
      name: 'Messages', 
      icon: HiChat, 
      path: '/student/messages' 
    },
    { 
      name: 'News', 
      icon: HiNewspaper, 
      path: '/student/news' 
    },
    { 
      name: 'Security', 
      icon: HiShieldCheck, 
      path: '/student/security' 
    }
  ];

  return (
    <div className={`
      ${isExpanded ? 'w-64' : 'w-20'} 
      bg-white text-gray-800 transition-all duration-300
      flex flex-col h-screen shadow-lg border-r border-gray-200
    `}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {isExpanded && (
            <div className="flex items-center">
              <div className="bg-blue-800 text-white rounded-lg p-2 mr-2">
                <HiAcademicCap className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">SIMS</h1>
            </div>
          )}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {studentMenu.map((item, index) => (
            <SidebarItem 
              key={index}
              item={item}
              isExpanded={isExpanded}
            />
          ))}
        </ul>
      </nav>

      {/* <div className="p-4 border-t border-gray-200">
        <SidebarItem 
          item={{
            name: "Settings",
            icon: HiCog,
            path: "/settings"
          }}
          isExpanded={isExpanded}
        />
        <SidebarItem 
          item={{
            name: "Logout",
            icon: HiLogout,
            path: "/logout"
          }}
          isExpanded={isExpanded}
        />
      </div> */}
    </div>
  );
};

export default Sidebar;