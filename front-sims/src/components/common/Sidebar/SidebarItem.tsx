import React, { useState } from 'react';
import { HiChevronDown, HiChevronRight } from 'react-icons/hi';
import { MenuItemType } from './Sidebar';

interface SidebarItemProps {
  item: MenuItemType;
  isExpanded: boolean;
  level?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  item,
  isExpanded,
  level = 0
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const itemContent = (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <Icon className={`h-5 w-5 flex-shrink-0 ${level === 0 ? 'text-blue-600' : 'text-gray-500'}`} />
        {isExpanded && (
          <span className={`ml-3 font-medium truncate ${level === 0 ? 'text-gray-800' : 'text-gray-600'}`}>
            {item.name}
          </span>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="flex-shrink-0 text-gray-400">
          {isOpen ? (
            <HiChevronDown className="h-4 w-4" />
          ) : (
            <HiChevronRight className="h-4 w-4" />
          )}
        </div>
      )}
    </div>
  );

  return (
    <li>
      <div className="relative">
        {hasChildren ? (
          <button
            onClick={handleClick}
            onMouseEnter={() => !isExpanded && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className={`
              w-full flex items-center p-3 rounded-lg transition-all duration-200 text-left
              hover:bg-blue-50 hover:text-blue-700
              ${level > 0 ? 'ml-2' : ''}
              ${isOpen ? 'bg-blue-50 text-blue-700' : 'text-gray-600'}
            `}
          >
            {itemContent}
          </button>
        ) : (
          <a 
            href={item.path}
            onMouseEnter={() => !isExpanded && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className={`
              flex items-center p-3 rounded-lg transition-all duration-200
              hover:bg-blue-50 hover:text-blue-700
              ${level > 0 ? 'ml-2 pl-8 text-gray-500 text-sm' : 'text-gray-600'}
            `}
          >
            {itemContent}
          </a>
        )}

        {/* Tooltip for collapsed sidebar */}
        {!isExpanded && showTooltip && level === 0 && (
          <div className="fixed z-50 px-3 py-2 text-sm font-medium text-gray-800 bg-white rounded-lg shadow-lg border border-gray-200 tooltip-arrow left-20 transform -translate-y-1/2 pointer-events-none">
            {item.name}
            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white border-l border-t border-gray-200 rotate-45"></div>
          </div>
        )}
      </div>
      
      {/* Submenu items */}
      {hasChildren && isOpen && isExpanded && (
        <ul className="mt-1 space-y-1 ml-2 border-l border-gray-200 pl-2">
          {item.children!.map((child, index) => (
            <SidebarItem 
              key={index}
              item={child}
              isExpanded={isExpanded}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;