import React from 'react';
import { Home, Users, FileText, BarChart3, BookOpen, MessageSquare } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, setCurrentPage }) => {
  const navigationItems = [
    { id: 'forum', label: 'الرئيسية', icon: Home },
    { id: 'categories', label: 'أقسام المنتدى', icon: MessageSquare },
    { id: 'testing', label: 'منصة الاختبارات', icon: BarChart3 },
    { id: 'resources', label: 'الموارد التعليمية', icon: BookOpen },
    { id: 'members', label: 'الأعضاء', icon: Users },
    { id: 'articles', label: 'المقالات', icon: FileText },
  ];

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex space-x-reverse space-x-0">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-2 space-x-reverse px-6 py-4 text-sm font-medium transition-all nav-item ${
                  currentPage === item.id
                    ? 'text-white bg-green-600 border-b-2 border-green-400'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;