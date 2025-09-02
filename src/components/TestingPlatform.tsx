import React, { useState } from 'react';
import { Brain, Heart, BookOpen, TrendingUp, Play, FileText, Download } from 'lucide-react';

const TestingPlatform: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('cognitive');

  const testCategories = [
    {
      id: 'cognitive',
      title: 'الاختبارات المعرفية',
      description: 'اختبارات الذكاء والقدرات المعرفية',
      icon: Brain,
      color: 'blue',
      tests: [
        { name: 'اختبار الذكاء المتعدد', duration: '45 دقيقة', participants: 234 },
        { name: 'اختبار القدرات اللفظية', duration: '30 دقيقة', participants: 189 },
        { name: 'اختبار الذاكرة العاملة', duration: '25 دقيقة', participants: 156 }
      ]
    },
    {
      id: 'personality',
      title: 'اختبارات الشخصية',
      description: 'تقييم السمات الشخصية والميول',
      icon: Heart,
      color: 'red',
      tests: [
        { name: 'اختبار الشخصية الخماسي', duration: '20 دقيقة', participants: 456 },
        { name: 'تقييم الميول المهنية', duration: '35 دقيقة', participants: 321 },
        { name: 'اختبار الذكاء العاطفي', duration: '25 دقيقة', participants: 278 }
      ]
    },
    {
      id: 'learning',
      title: 'صعوبات التعلم',
      description: 'تشخيص صعوبات التعلم الأكاديمية',
      icon: BookOpen,
      color: 'green',
      tests: [
        { name: 'تقييم صعوبات القراءة', duration: '40 دقيقة', participants: 167 },
        { name: 'اختبار صعوبات الرياضيات', duration: '35 دقيقة', participants: 143 },
        { name: 'تقييم مهارات الكتابة', duration: '30 دقيقة', participants: 198 }
      ]
    },
    {
      id: 'progress',
      title: 'متابعة التقدم',
      description: 'أدوات متابعة تطور الطلاب',
      icon: TrendingUp,
      color: 'purple',
      tests: [
        { name: 'تقييم التحصيل الأكاديمي', duration: '50 دقيقة', participants: 289 },
        { name: 'متابعة الأداء الشهري', duration: '15 دقيقة', participants: 567 },
        { name: 'تقرير التطور السنوي', duration: '60 دقيقة', participants: 234 }
      ]
    }
  ];

  const getCurrentCategory = () => {
    return testCategories.find(cat => cat.id === selectedCategory) || testCategories[0];
  };

  const currentCategory = getCurrentCategory();

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">منصة الاختبارات والتقييم</h2>
        <p className="text-gray-600">
          مجموعة شاملة من أدوات التقييم المتخصصة للمرشدين التربويين والأكاديميين
        </p>
      </div>

      {/* Category tabs */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex border-b border-gray-200">
          {testCategories.map((category) => {
            const Icon = category.icon;
            const colorClass = `text-${category.color}-600`;
            const bgColorClass = selectedCategory === category.id 
              ? `bg-${category.color}-50 border-${category.color}-500` 
              : 'bg-white border-transparent';
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse px-4 py-4 border-b-2 transition-all ${bgColorClass} hover:bg-gray-50`}
              >
                <Icon size={20} className={selectedCategory === category.id ? colorClass : 'text-gray-500'} />
                <span className={`font-medium ${selectedCategory === category.id ? 'text-gray-800' : 'text-gray-600'}`}>
                  {category.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{currentCategory.title}</h3>
            <p className="text-gray-600">{currentCategory.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCategory.tests.map((test, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all forum-card">
                <h4 className="font-semibold text-gray-800 mb-2">{test.name}</h4>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center justify-between">
                    <span>مدة الاختبار:</span>
                    <span>{test.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>المشاركون:</span>
                    <span>{test.participants} مرشد</span>
                  </div>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <button className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse btn-primary">
                    <Play size={16} />
                    <span>بدء الاختبار</span>
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FileText size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assessment tools section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">أدوات التقييم المتقدمة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">منشئ التقارير التلقائي</h4>
            <p className="text-blue-700 text-sm mb-3">
              إنشاء تقارير مفصلة بناءً على نتائج الاختبارات
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
              إنشاء تقرير
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">مكتبة الموارد</h4>
            <p className="text-green-700 text-sm mb-3">
              وصول سريع للموارد التعليمية والمراجع
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center space-x-1 space-x-reverse">
              <Download size={16} />
              <span>تحميل الموارد</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingPlatform;