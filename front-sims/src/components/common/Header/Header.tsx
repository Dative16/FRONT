import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  Menu, 
  ChevronDown, 
  Settings,
  User,
  LogOut,
  MessageSquare,
  Calendar,
  Gift,
  X
} from 'lucide-react';

interface HeaderProps {
  onSidebarToggle?: () => void;
  isDark?: boolean;
  onThemeToggle?: () => void;
  isMobile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onSidebarToggle, 
  isDark = false, 
  onThemeToggle,
  isMobile = false 
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const mockUser = {
    name: "William Amani",
    role: "Student",
    avatar: "/api/placeholder/40/40",
    initials: "WA"
  };

  const notifications = [
    { id: 1, type: 'message', count: 4, color: 'bg-blue-500', label: 'Messages' },
    { id: 2, type: 'calendar', count: 2, color: 'bg-green-500', label: 'Calendar' },
    { id: 3, type: 'gift', count: 6, color: 'bg-purple-500', label: 'Rewards' },
  ];

  // Handle screen size detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('mobile');
      else if (width < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderNotificationIcon = (notification: typeof notifications[0]) => {
    const iconProps = { size: screenSize === 'mobile' ? 16 : 18, className: "text-gray-600" };
    
    switch (notification.type) {
      case 'message': return <MessageSquare {...iconProps} />;
      case 'calendar': return <Calendar {...iconProps} />;
      case 'gift': return <Gift {...iconProps} />;
      default: return <Bell {...iconProps} />;
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 h-14 sm:h-16">
          
          {/* Left Section */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Mobile Sidebar Toggle & Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {onSidebarToggle && (
                <button 
                  onClick={onSidebarToggle}
                  className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Toggle sidebar"
                >
                  <Menu size={screenSize === 'mobile' ? 18 : 20} className="text-gray-600" />
                </button>
              )}
              
            </div>

            {/* Breadcrumb Navigation - Desktop only */}
            {screenSize === 'desktop' && (
              <div className="flex items-center space-x-2 text-sm text-gray-500 ml-4">
                <span>Dashboard</span>
                <span>/</span>
                <span className="text-gray-800 font-medium">Student Overview</span>
              </div>
            )}
          </div>

          {/* Center Section - Search (Desktop/Tablet) */}
          {screenSize !== 'mobile' && (
            <div className="flex-1 max-w-xl mx-4 lg:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             focus:bg-white transition-all duration-200 text-sm"
                />
              </div>
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 flex-shrink-0">
            
            {/* Mobile Search Toggle */}
            {screenSize === 'mobile' && (
              <button 
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle search"
              >
                <Search size={16} className="text-gray-600" />
              </button>
            )}

            {/* Theme Toggle - Desktop */}
            {onThemeToggle && screenSize === 'desktop' && (
              <button 
                onClick={onThemeToggle}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Toggle theme"
              >
                {isDark ? 
                  <Sun size={18} className="text-gray-600" /> : 
                  <Moon size={18} className="text-gray-600" />
                }
              </button>
            )}

            {/* Notification Icons - Responsive */}
            <div className="flex items-center">
              {screenSize === 'desktop' ? (
                // Desktop: Show individual notification types
                <div className="flex items-center space-x-1">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="relative">
                      <button 
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                        title={notification.label}
                      >
                        {renderNotificationIcon(notification)}
                        <span className={`absolute -top-1 -right-1 ${notification.color} text-white text-xs 
                                         rounded-full h-4 w-4 flex items-center justify-center font-medium
                                         shadow-lg ring-2 ring-white`}>
                          {notification.count}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                // Mobile/Tablet: Show consolidated notification bell
                <div className="relative" ref={notificationRef}>
                  <button 
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                    title="Notifications"
                  >
                    <Bell size={screenSize === 'mobile' ? 16 : 18} className="text-gray-600" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                                   rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium
                                   shadow-lg ring-2 ring-white">
                      {notifications.reduce((sum, n) => sum + n.count, 0)}
                    </span>
                  </button>

                  {/* Mobile/Tablet Notification Dropdown */}
                  {isNotificationOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                      </div>
                      {notifications.map((notification) => (
                        <button 
                          key={notification.id}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {renderNotificationIcon(notification)}
                          <span className="flex-1 text-left">{notification.label}</span>
                          <span className={`${notification.color} text-white text-xs rounded-full px-2 py-1`}>
                            {notification.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Language Selector - Desktop only */}
            {screenSize === 'desktop' && (
              <div className="flex items-center">
                <button className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="text-sm font-medium text-gray-700">EN</span>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>
              </div>
            )}

            {/* User Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-1 sm:p-1.5 lg:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="relative">
                  <img 
                    src={mockUser.avatar} 
                    alt={mockUser.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full object-cover ring-2 ring-gray-200"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
                                 flex items-center justify-center text-white font-semibold text-xs hidden">
                    {mockUser.initials}
                  </div>
                </div>
                
                {screenSize === 'desktop' && (
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">{mockUser.name}</p>
                    <p className="text-xs text-gray-500">{mockUser.role}</p>
                  </div>
                )}
                
                <ChevronDown 
                  size={screenSize === 'mobile' ? 12 : 16} 
                  className={`text-gray-400 ${screenSize === 'mobile' ? 'hidden' : 'block'}`} 
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {screenSize !== 'desktop' && (
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{mockUser.name}</p>
                      <p className="text-xs text-gray-500">{mockUser.role}</p>
                    </div>
                  )}
                  
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <User size={16} />
                    <span>My Profile</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>

                  {/* Language selector for mobile/tablet */}
                  {screenSize !== 'desktop' && (
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <span className="w-4 h-4 flex items-center justify-center text-xs font-bold border border-gray-300 rounded">EN</span>
                      <span>Language</span>
                    </button>
                  )}
                  
                  {onThemeToggle && screenSize !== 'desktop' && (
                    <button 
                      onClick={onThemeToggle}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {isDark ? <Sun size={16} /> : <Moon size={16} />}
                      <span>Toggle Theme</span>
                    </button>
                  )}
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isMobileSearchOpen && screenSize === 'mobile' && (
          <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
            <div className="flex items-center px-4 py-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search here..."
                  autoFocus
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             focus:bg-white transition-all duration-200 text-sm"
                />
              </div>
              <button 
                onClick={() => setIsMobileSearchOpen(false)}
                className="ml-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Search Backdrop */}
      {isMobileSearchOpen && screenSize === 'mobile' && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40" 
          onClick={() => setIsMobileSearchOpen(false)}
        />
      )}
    </>
  );
};

export default Header;