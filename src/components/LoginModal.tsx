import React, { useState } from 'react';
import { X, Mail, Lock, User, Building, Briefcase, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { isSupabaseConfigured } from '../lib/supabase';

interface LoginModalProps {
  setShowModal: (show: boolean) => void;
  setIsLoggedIn: (value: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ setShowModal, setIsLoggedIn }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    specialization: '',
    institution: ''
  });

  const { signIn, signUp, loading } = useAuth();

  const specializations = [
    { value: 'academic', label: 'الإرشاد الأكاديمي' },
    { value: 'career', label: 'الإرشاد المهني' },
    { value: 'psychological', label: 'علم النفس التربوي' },
    { value: 'special-needs', label: 'ذوي الاحتياجات الخاصة' },
    { value: 'learning-difficulties', label: 'صعوبات التعلم' },
    { value: 'educational-psychology', label: 'علم النفس التعليمي' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSupabaseConfigured()) {
      setError('يرجى تكوين Supabase أولاً');
      return;
    }
    
    setError('');

    try {
      if (isRegister) {
        // Validation pour l'inscription
        if (formData.password !== formData.confirmPassword) {
          throw new Error('كلمات المرور غير متطابقة');
        }
        if (formData.password.length < 6) {
          throw new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        }
        if (!formData.name.trim()) {
          throw new Error('الاسم مطلوب');
        }
        if (!formData.specialization) {
          throw new Error('التخصص مطلوب');
        }
        if (!formData.institution.trim()) {
          throw new Error('المؤسسة مطلوبة');
        }

        await signUp(formData.email, formData.password, {
          name: formData.name,
          specialization: formData.specialization,
          institution: formData.institution
        });
      } else {
        // تسجيل الدخول
        await signIn(formData.email, formData.password);
      }

      // Fermer le modal seulement après succès
      setShowModal(false);
    } catch (err: any) {
      // Traduire les erreurs en arabe
      let errorMessage = err.message;
      if (err.message.includes('Invalid login credentials')) {
        errorMessage = 'بيانات الدخول غير صحيحة';
      } else if (err.message.includes('User already registered')) {
        errorMessage = 'هذا البريد الإلكتروني مسجل مسبقاً';
      } else if (err.message.includes('Password should be at least 6 characters')) {
        errorMessage = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      } else if (err.message.includes('Unable to validate email address')) {
        errorMessage = 'عنوان البريد الإلكتروني غير صالح';
      } else if (err.message.includes('fetch')) {
        errorMessage = 'خطأ في الاتصال - يرجى التحقق من تكوين Supabase';
      }
      
      setError(errorMessage);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // مسح الخطأ عند الكتابة
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md slide-in-right">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {isRegister ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
          </h2>
          <button 
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 space-x-reverse">
            <AlertCircle size={18} className="text-red-500" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الكامل *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    disabled={loading}
                  />
                  <User className="absolute right-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  التخصص *
                </label>
                <div className="relative">
                  <select
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    disabled={loading}
                  >
                    <option value="">اختر التخصص</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المؤسسة التعليمية *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    placeholder="مثال: جامعة الملك سعود"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                    disabled={loading}
                  />
                  <Building className="absolute right-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              البريد الإلكتروني *
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                disabled={loading}
              />
              <Mail className="absolute right-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              كلمة المرور *
            </label>
            <div className="relative">
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                disabled={loading}
                minLength={6}
              />
              <Lock className="absolute right-3 top-2.5 text-gray-400" size={18} />
            </div>
            {isRegister && (
              <p className="text-xs text-gray-500 mt-1">يجب أن تكون 6 أحرف على الأقل</p>
            )}
          </div>

          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تأكيد كلمة المرور *
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  disabled={loading}
                />
                <Lock className="absolute right-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
          >
            {loading && <Loader size={18} className="animate-spin" />}
            <span>
              {loading 
                ? (isRegister ? 'جاري إنشاء الحساب...' : 'جاري تسجيل الدخول...') 
                : (isRegister ? 'إنشاء الحساب' : 'تسجيل الدخول')
              }
            </span>
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
                setFormData({
                  email: '',
                  password: '',
                  confirmPassword: '',
                  name: '',
                  specialization: '',
                  institution: ''
                });
              }}
              className="text-green-600 hover:text-green-700 text-sm transition-colors"
              disabled={loading}
            >
              {isRegister ? 'لديك حساب؟ سجل الدخول' : 'ليس لديك حساب؟ أنشئ حساباً جديداً'}
            </button>
          </div>
        </form>

        {isRegister && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>ملاحظة:</strong> سيتم إرسال رسالة تأكيد إلى بريدك الإلكتروني بعد التسجيل.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;