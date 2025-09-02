import React from 'react';
import { MessageCircle, Users, Clock, TrendingUp, Star, Pin } from 'lucide-react';

const ForumHome: React.FC = () => {
  const forumCategories = [
    {
      id: 1,
      title: 'الاختبارات المعرفية',
      description: 'مناقشة أدوات التقييم المعرفي والذكاء',
      topics: 156,
      posts: 2847,
      lastPost: 'منذ ساعتين',
      lastUser: 'د. فاطمة أحمد',
      icon: '🧠',
      isImportant: true
    },
    {
      id: 2,
      title: 'تقييم الشخصية',
      description: 'اختبارات الشخصية وأدوات التحليل النفسي',
      topics: 98,
      posts: 1743,
      lastPost: 'منذ 4 ساعات',
      lastUser: 'أ. محمد سالم',
      icon: '👤',
      isImportant: false
    },
    {
      id: 3,
      title: 'صعوبات التعلم',
      description: 'تشخيص ومتابعة صعوبات التعلم الأكاديمية',
      topics: 203,
      posts: 3421,
      lastPost: 'منذ ساعة',
      lastUser: 'د. سارة محمود',
      icon: '📚',
      isImportant: true
    },
    {
      id: 4,
      title: 'الإرشاد المهني',
      description: 'توجيه الطلاب نحو المسارات المهنية المناسبة',
      topics: 127,
      posts: 2156,
      lastPost: 'منذ 3 ساعات',
      lastUser: 'أ. عبدالله حسن',
      icon: '💼',
      isImportant: false
    },
    {
      id: 5,
      title: 'التقارير والوثائق',
      description: 'نماذج التقارير ووثائق التقييم المهنية',
      topics: 67,
      posts: 891,
      lastPost: 'منذ يوم',
      lastUser: 'د. ليلى عبدالرحمن',
      icon: '📄',
      isImportant: false
    },
    {
      id: 6,
      title: 'الأخبار التعليمية',
      description: 'آخر الأخبار والتطورات في مجال التعليم',
      topics: 89,
      posts: 1567,
      lastPost: 'منذ ساعتين',
      lastUser: 'إدارة المنتدى',
      icon: '📰',
      isImportant: false
    }
  ];

  const recentTopics = [
    {
      title: 'كيفية تطبيق اختبار الذكاء المتعدد للطلاب',
      author: 'د. أمينة الزهراني',
      replies: 23,
      views: 456,
      lastReply: 'منذ ساعة',
      isPinned: true
    },
    {
      title: 'استراتيجيات التعامل مع طلاب صعوبات التعلم',
      author: 'أ. خالد المطيري',
      replies: 18,
      views: 342,
      lastReply: 'منذ ساعتين',
      isPinned: false
    },
    {
      title: 'أحدث طرق التوجيه المهني في القرن الواحد والعشرين',
      author: 'د. نورا السعيد',
      replies: 31,
      views: 678,
      lastReply: 'منذ 3 ساعات',
      isPinned: false
    }
  ];

  return (
    <div className="space-y-8 fade-in">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">مرحباً بكم في منتدى مستشارين التوجيه</h2>
        <p className="text-gray-600">
          منصة متخصصة لتبادل الخبرات والموارد بين مستشارين التوجيه والأكاديميين. شاركوا تجاربكم واستفيدوا من خبرات الزملاء.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">1,247</p>
              <p className="text-sm text-gray-600">عضو نشط</p>
            </div>
            <Users className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">8,456</p>
              <p className="text-sm text-gray-600">موضوع</p>
            </div>
            <MessageCircle className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">23,891</p>
              <p className="text-sm text-gray-600">مشاركة</p>
            </div>
            <TrendingUp className="text-purple-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-orange-600">342</p>
              <p className="text-sm text-gray-600">اختبار متاح</p>
            </div>
            <Star className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Forum categories */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-800 px-6 py-4">
          <h3 className="text-white font-bold text-lg">أقسام المنتدى الرئيسية</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {forumCategories.map((category) => (
            <div key={category.id} className="p-6 hover:bg-gray-50 transition-colors forum-card cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 space-x-reverse flex-1">
                  <div className="text-3xl">{category.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 space-x-reverse mb-1">
                      <h4 className="font-bold text-gray-800 text-lg">{category.title}</h4>
                      {category.isImportant && (
                        <Pin className="text-green-600" size={16} />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                    <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
                      <span>المواضيع: {category.topics}</span>
                      <span>المشاركات: {category.posts}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-left min-w-0 mr-4">
                  <p className="text-xs text-gray-500 mb-1">آخر مشاركة</p>
                  <p className="text-sm font-medium text-gray-700">{category.lastUser}</p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Clock size={12} className="ml-1" />
                    {category.lastPost}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent topics */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-800 px-6 py-4">
          <h3 className="text-white font-bold text-lg">المواضيع الحديثة</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {recentTopics.map((topic, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse flex-1">
                  {topic.isPinned && (
                    <Pin className="text-green-600" size={16} />
                  )}
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800 hover:text-green-600 transition-colors">
                      {topic.title}
                    </h5>
                    <p className="text-xs text-gray-500 mt-1">
                      بواسطة {topic.author}
                    </p>
                  </div>
                </div>
                
                <div className="text-left text-xs text-gray-500 space-y-1">
                  <div>الردود: {topic.replies}</div>
                  <div>المشاهدات: {topic.views}</div>
                  <div className="flex items-center">
                    <Clock size={12} className="ml-1" />
                    {topic.lastReply}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumHome;