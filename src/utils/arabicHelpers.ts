// Arabic text and RTL utilities

export const formatArabicDate = (date: Date): string => {
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatArabicTime = (date: Date): string => {
  return date.toLocaleTimeString('ar-SA', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getRelativeTimeArabic = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'الآن';
  if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `منذ ${diffInDays} يوم`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `منذ ${diffInWeeks} أسبوع`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  return `منذ ${diffInMonths} شهر`;
};

export const arabicNumbers = (num: number): string => {
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
  return num.toString().replace(/[0-9]/g, (digit) => arabicDigits[parseInt(digit)]);
};

export const validateArabicText = (text: string): boolean => {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicRegex.test(text);
};

export const cleanArabicText = (text: string): string => {
  // Remove extra spaces and normalize Arabic text
  return text
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/ي/g, 'ي')
    .replace(/ك/g, 'ك');
};

export const getArabicPlural = (count: number, singular: string, plural: string): string => {
  if (count === 1) return singular;
  if (count === 2) return `${singular}ان`;
  if (count <= 10) return plural;
  return plural;
};