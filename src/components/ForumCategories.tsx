import React from 'react';
import { MessageSquare, Pin, Clock, Eye } from 'lucide-react';

const ForumCategories: React.FC = () => {
  const categories = [
    {
      id: 1,
      title: 'الإرشاد الأكاديمي العام',
      description: 'مناقشات عامة حول الإرشاد الأكاديمي والتوجيه التعليمي',
      subcategories: [
        { name: 'استراتيجيات الإرشاد', topics: 45, posts: 678 },
        { name: 'حالات دراسية', topics: 32, posts: 456 },
        { name: 'أسئلة المبتدئين', topics: 67, posts: 891 }
      ],
      moderator: 'د. أحمد السالم',
      lastPost: {
        title: 'كيفية التعامل مع الطلاب المتأخرين أكاديمياً',
        author: 'أ. سارة المحمد',
        time: 'منذ ساعة'
      }
    },
    {
      id: 2,
      title: 'الاختبارات والتقييم',
      description: 'مناقشة أدوات التقييم وطرق الاختبار المختلفة',
      subcategories: [
        { name: 'اختبارات الذكاء', topics: 28, posts: 234 },
        { name: 'تقييم الشخصية', topics: 19, posts: 156 },
        { name: 'أدوات التشخيص', topics: 41, posts: 567 }
      ],
      moderator: 'د. فاطمة الزهراني',
      lastPost: {
        title: 'مراجعة اختبار ويكسلر للذكاء - الطبعة الخامسة',
        author: 'د. محمد عبدالله',
        time: 'منذ 3 ساعات'
      }
    },
    {
      id: 3,
      title: 'صعوبات التعلم',
      description: 'تشخيص ومتابعة الطلاب ذوي صعوبات التعلم',
      subcategories: [
        { name: 'الديسلكسيا', topics: 23, posts: 345 },
        { name: 'صعوبات الرياضيات', topics: 18, posts: 267 },
        { name: 'اضطراب نقص الانتباه', topics: 31, posts: 489 }
      ],
      moderator: 'د. نورا الحربي',
      lastPost: {
        title: 'استراتيجيات تدريس القراءة للطلاب ذوي الديسلكسيا',
        author: 'أ. خالد المطيري',
        time: 'منذ 5 ساعات'
      }
    }
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-800 px-6 py-4">
          <h2 className="text-white font-bold text-xl">أقسام المنتدى</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {categories.map((category) => (
            <div key={category.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center space-x-2 space-x-reverse">
                    <MessageSquare className="text-green-600" size={20} />
                    <span>{category.title}</span>
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                  <p className="text-xs text-gray-500">
                    مشرف القسم: <span className="font-medium">{category.moderator}</span>
                  </p>
                </div>
                
                <div className="text-left min-w-0 mr-6">
                  <div className="bg-gray-50 rounded-lg p-3 text-xs">
                    <p className="font-medium text-gray-800 mb-1">آخر مشاركة</p>
                    <p className="text-gray-600 mb-1">{category.lastPost.title}</p>
                    <div className="flex items-center justify-between text-gray-500">
                      <span>{category.lastPost.author}</span>
                      <span className="flex items-center">
                        <Clock size={10} className="ml-1" />
                        {category.lastPost.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subcategories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {category.subcategories.map((sub, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer forum-card">
                    <h4 className="font-medium text-gray-800 mb-2">{sub.name}</h4>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>المواضيع: {sub.topics}</span>
                      <span>المشاركات: {sub.posts}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forum rules */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2 space-x-reverse">
          <Pin className="text-yellow-500" size={20} />
          <span>قوانين المنتدى</span>
        </h3>
        
        <div className="space-y-3 text-sm text-gray-600">
          <p>• احترام الآراء المختلفة والحفاظ على الطابع المهني للنقاشات</p>
          <p>• عدم مشاركة معلومات شخصية عن الطلاب دون موافقة</p>
          <p>• استخدام مصادر موثقة عند مشاركة المعلومات العلمية</p>
          <p>• الالتزام بأخلاقيات المهنة في جميع المشاركات</p>
          <p>• تجنب المحتوى التجاري غير المرتبط بالإرشاد التربوي</p>
        </div>
      </div>
    </div>
  );
};

export default ForumCategories;