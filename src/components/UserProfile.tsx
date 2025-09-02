import React, { useState } from 'react';
import { User, Mail, Briefcase, Calendar, Award, Settings, Edit3, Building, Save, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const UserProfile: React.FC = () => {
  const { user, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    specialization: user?.specialization || '',
    institution: user?.institution || '',
    bio: ''
  });

  const specializations = [
    { value: 'academic', label: 'الإرشاد الأكاديمي' },
    { value: 'career', label: 'الإرشاد المهني' },
    { value: 'psychological', label: 'علم النفس التربوي' },
    { value: 'special-needs', label: 'ذوي الاحتياجات الخاصة' },
    { value: 'learning-difficulties', label: 'صعوبات التعلم' },
    { value: 'educational-psychology', label: 'علم النفس التعليمي' }
  ];

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      await updateProfile({
        name: editData.name,
        specialization: editData.specialization,
        institution: editData.institution,
        bio: editData.bio
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      specialization: user?.specialization || '',
      institution: user?.institution || '',
      bio: ''
    });
    setIsEditing(false);
  };

  const getSpecializationLabel = (value: string) => {
    const spec = specializations.find(s => s.value === value);
    return spec ? spec.label : value;
  };

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <User size={64} className="text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">يرجى تسجيل الدخول</h2>
        <p className="text-gray-600">يجب تسجيل الدخول لعرض الملف الشخصي</p>
      </div>
    );
  }

  const stats = [
    { label: 'المشاركات', value: '247', icon: Edit3, color: 'blue' },
    { label: 'المواضيع', value: '68', icon: User, color: 'green' },
    { label: 'التقييمات', value: '156', icon: Award, color: 'yellow' },
    { label: 'الشهادات', value: '4', icon: Award, color: 'purple' }
  ];

  const recentActivity = [
    { action: 'شارك في موضوع "استراتيجيات التقييم الحديثة"', time: 'منذ ساعتين', type: 'post' },
    { action: 'أنشأ موضوع جديد في "الاختبارات المعرفية"', time: 'منذ يوم', type: 'topic' },
    { action: 'حمل اختبار الذكاء المتعدد', time: 'منذ 3 أيام', type: 'download' },
    { action: 'شارك في ورشة "التوجيه المهني"', time: 'منذ أسبوع', type: 'workshop' }
  ];

  return (
    <div className="space-y-6 fade-in">
      {/* Profile header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-8">
          <div className="flex items-center space-x-6 space-x-reverse">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
              <User size={48} className="text-gray-600" />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
              <p className="text-green-100 mb-2">{getSpecializationLabel(user.specialization)}</p>
              <p className="text-green-200 text-sm">{user.institution}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center space-x-3 space-x-reverse text-gray-600">
                <Mail size={18} />
                <span>{user.email}</span>
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <User className="absolute right-3 top-2.5 text-gray-400" size={18} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">التخصص</label>
                    <div className="relative">
                      <select
                        value={editData.specialization}
                        onChange={(e) => setEditData({...editData, specialization: e.target.value})}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        {specializations.map((spec) => (
                          <option key={spec.value} value={spec.value}>
                            {spec.label}
                          </option>
                        ))}
                      </select>
                      <Briefcase className="absolute right-3 top-2.5 text-gray-400" size={18} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">المؤسسة</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={editData.institution}
                        onChange={(e) => setEditData({...editData, institution: e.target.value})}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <Building className="absolute right-3 top-2.5 text-gray-400" size={18} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">نبذة شخصية</label>
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({...editData, bio: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows={3}
                      placeholder="اكتب نبذة مختصرة عن خبرتك المهنية..."
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3 space-x-reverse text-gray-600">
                    <Briefcase size={18} />
                    <span>{getSpecializationLabel(user.specialization)}</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse text-gray-600">
                    <Building size={18} />
                    <span>{user.institution}</span>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex space-x-2 space-x-reverse">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center space-x-2 space-x-reverse bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Save size={16} />
                    <span>{saving ? 'جاري الحفظ...' : 'حفظ'}</span>
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="flex items-center space-x-2 space-x-reverse bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                  >
                    <X size={16} />
                    <span>إلغاء</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 space-x-reverse bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                >
                  <Settings size={16} />
                  <span>تعديل الملف</span>
                </button>
              )}
            </div>
          </div>

          {!isEditing && editData.bio && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800 mb-2">نبذة شخصية</h3>
              <p className="text-gray-600">{editData.bio}</p>
            </div>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center border border-gray-200 forum-card">
              <Icon size={32} className={`text-${stat.color}-500 mx-auto mb-2`} />
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-800 px-6 py-4">
          <h3 className="text-white font-bold text-lg">النشاط الأخير</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <p className="text-gray-700">{activity.action}</p>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional development */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">التطوير المهني</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">الدورات المكتملة</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• تقييم الطلاب ذوي صعوبات التعلم</li>
              <li>• الإرشاد المهني المتقدم</li>
              <li>• استخدام التكنولوجيا في التقييم</li>
            </ul>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">الشهادات المعتمدة</h4>
            <ul className="space-y-1 text-sm text-green-700">
              <li>• مرشد أكاديمي معتمد - المستوى المتقدم</li>
              <li>• أخصائي تقييم معرفي</li>
              <li>• مدرب في التوجيه المهني</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;