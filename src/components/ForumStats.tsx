import React from 'react';
import { Users, MessageCircle, Eye, Calendar } from 'lucide-react';

const ForumStats: React.FC = () => {
  const todayStats = {
    newMembers: 12,
    newTopics: 34,
    newPosts: 156,
    onlineMembers: 89
  };

  const overallStats = {
    totalMembers: 1247,
    totalTopics: 8456,
    totalPosts: 23891,
    totalViews: 156789
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">إحصائيات المنتدى</h3>
      
      {/* Today's stats */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2 space-x-reverse">
          <Calendar size={16} />
          <span>إحصائيات اليوم</span>
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
            <p className="text-xl font-bold text-blue-600">{todayStats.newMembers}</p>
            <p className="text-xs text-blue-700">عضو جديد</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
            <p className="text-xl font-bold text-green-600">{todayStats.newTopics}</p>
            <p className="text-xs text-green-700">موضوع جديد</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-200">
            <p className="text-xl font-bold text-purple-600">{todayStats.newPosts}</p>
            <p className="text-xs text-purple-700">مشاركة جديدة</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-200">
            <p className="text-xl font-bold text-orange-600">{todayStats.onlineMembers}</p>
            <p className="text-xs text-orange-700">عضو متصل</p>
          </div>
        </div>
      </div>

      {/* Overall stats */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3">الإحصائيات العامة</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <Users className="text-gray-500" size={20} />
            <div>
              <p className="font-bold text-gray-800">{overallStats.totalMembers.toLocaleString()}</p>
              <p className="text-xs text-gray-600">إجمالي الأعضاء</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            <MessageCircle className="text-gray-500" size={20} />
            <div>
              <p className="font-bold text-gray-800">{overallStats.totalTopics.toLocaleString()}</p>
              <p className="text-xs text-gray-600">إجمالي المواضيع</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            <MessageCircle className="text-gray-500" size={20} />
            <div>
              <p className="font-bold text-gray-800">{overallStats.totalPosts.toLocaleString()}</p>
              <p className="text-xs text-gray-600">إجمالي المشاركات</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            <Eye className="text-gray-500" size={20} />
            <div>
              <p className="font-bold text-gray-800">{overallStats.totalViews.toLocaleString()}</p>
              <p className="text-xs text-gray-600">إجمالي المشاهدات</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumStats;