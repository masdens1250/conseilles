import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ForumHome from './components/ForumHome';
import TestingPlatform from './components/TestingPlatform';
import UserProfile from './components/UserProfile';
import { isSupabaseConfigured } from './lib/supabase';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('forum');
  const { user } = useAuth();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'forum':
        return <ForumHome />;
      case 'testing':
        return <TestingPlatform />;
      case 'profile':
        return <UserProfile />;
      default:
        return <ForumHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header 
        isLoggedIn={!!user} 
        setIsLoggedIn={() => {}} // Géré par useAuth
        setCurrentPage={setCurrentPage}
      />
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
      <main className="container mx-auto px-4 py-6">
        {!isSupabaseConfigured() && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800">تكوين Supabase مطلوب</h3>
                <p className="text-yellow-700 text-sm">
                  لتفعيل نظام تسجيل الدخول والميزات المتقدمة، يرجى النقر على "Connect to Supabase" في الأعلى
                </p>
              </div>
            </div>
          </div>
        )}
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;