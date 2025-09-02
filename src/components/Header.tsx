import React, { useState } from 'react';
import { Search, User, Settings, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { isSupabaseConfigured } from '../lib/supabase';
import LoginModal from './LoginModal';

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut, initialLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const handleLoginClick = () => {
    if (!isSupabaseConfigured()) {
      alert('يرجى تكوين Supabase أولاً بالنقر على "Connect to Supabase" في الأعلى');
      return;
    }
    setShowLoginModal(true);
  };
  
  // Afficher un indicateur de chargement pendant l'initialisation
  if (initialLoading) {
    return <div className="bg-green-600 h-32 flex items-center justify-center"><span className="text-white">جاري التحميل...</span></div>;
  }
  
  return (
    <>
      <header className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
        <div className="container mx-auto px-4">
          {/* Top bar with login/user info */}
          <div className="flex justify-between items-center py-2 text-sm border-b border-green-500/30">
            <div className="flex items-center space-x-4 space-x-reverse">
              {user ? (
                <>
                  <button 
                    onClick={() => setCurrentPage('profile')}
                    className="flex items-center space-x-2 space-x-reverse text-green-100 hover:text-white transition-colors"
                  >
                    <User size={16} />
                    <span>{user.name || 'الملف الشخصي'}</span>
                  </button>
                  <button className="flex items-center space-x-2 space-x-reverse text-green-100 hover:text-white transition-colors">
                    <Settings size={16} />
                    <span>الإعدادات</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 space-x-reverse text-green-100 hover:text-white transition-colors"
                  >
                    <LogOut size={16} />
                    <span>تسجيل الخروج</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleLoginClick}
                  className="flex items-center space-x-2 space-x-reverse text-green-100 hover:text-white transition-colors"
                >
                  <LogIn size={16} />
                  <span>تسجيل الدخول</span>
                </button>
              )}
            </div>
            <div className="text-green-100 text-xs">
              {user ? (
                <span>مرحباً {user.name} - {user.specialization}</span>
              ) : (
                <span>
                  مرحباً بكم في منتدى مستشارين التوجيه
                  {!isSupabaseConfigured() && (
                    <span className="mr-2 text-yellow-200">
                      (يرجى تكوين Supabase)
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Main header */}
          <div className="py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-green-600 font-bold text-xl">ت</span>
                </div>
                <div>
                  <h1 className="text-white text-2xl font-bold">منتدى مستشارين التوجيه</h1>
                  <p className="text-green-100 text-sm">منصة شاملة للتوجيه و الارشاد المهني</p>
                </div>
              </div>

              {/* Search bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="البحث في المنتدى..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 px-4 py-2 pr-10 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {showLoginModal && (
        <LoginModal 
          setShowModal={setShowLoginModal}
          setIsLoggedIn={() => {}} // Non utilisé car géré par useAuth
        />
      )}
    </>
  );
};

export default Header;