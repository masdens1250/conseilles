import { User, ForumCategory, ForumTopic } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'د. فاطمة أحمد محمد',
    email: 'fatima.ahmed@edu.sa',
    specialization: 'الإرشاد الأكاديمي',
    institution: 'جامعة الملك سعود',
    joinDate: '2018-03-15',
    isOnline: true,
    postCount: 247,
    reputation: 856
  },
  {
    id: '2',
    name: 'أ. محمد سالم العتيبي',
    email: 'mohammed.salem@edu.sa',
    specialization: 'علم النفس التربوي',
    institution: 'جامعة الملك عبدالعزيز',
    joinDate: '2019-07-22',
    isOnline: false,
    postCount: 189,
    reputation: 623
  },
  {
    id: '3',
    name: 'د. سارة محمود الحربي',
    email: 'sarah.mahmoud@edu.sa',
    specialization: 'صعوبات التعلم',
    institution: 'جامعة الإمام محمد بن سعود',
    joinDate: '2017-11-08',
    isOnline: true,
    postCount: 312,
    reputation: 1024
  }
];

export const mockCategories: ForumCategory[] = [
  {
    id: '1',
    title: 'الاختبارات المعرفية',
    description: 'مناقشة أدوات التقييم المعرفي والذكاء',
    topicCount: 156,
    postCount: 2847,
    lastPost: {
      title: 'تطبيق اختبار ويكسلر في البيئة العربية',
      author: 'د. فاطمة أحمد',
      timestamp: '2024-01-15T14:30:00Z'
    },
    moderators: ['د. أحمد السالم', 'د. نورا الزهراني'],
    subcategories: [
      {
        id: '1-1',
        title: 'اختبارات الذكاء',
        description: 'مقاييس الذكاء المختلفة وطرق تطبيقها',
        topicCount: 67,
        postCount: 1234,
        parentCategory: '1'
      },
      {
        id: '1-2',
        title: 'القدرات المعرفية',
        description: 'تقييم القدرات الخاصة والمواهب',
        topicCount: 89,
        postCount: 1613,
        parentCategory: '1'
      }
    ]
  },
  {
    id: '2',
    title: 'الإرشاد المهني',
    description: 'توجيه الطلاب نحو المسارات المهنية المناسبة',
    topicCount: 127,
    postCount: 2156,
    lastPost: {
      title: 'استراتيجيات الإرشاد المهني الحديثة',
      author: 'أ. عبدالله حسن',
      timestamp: '2024-01-15T11:45:00Z'
    },
    moderators: ['د. خالد المطيري'],
    subcategories: [
      {
        id: '2-1',
        title: 'اختبارات الميول المهنية',
        description: 'أدوات قياس الميول والاهتمامات المهنية',
        topicCount: 45,
        postCount: 789,
        parentCategory: '2'
      },
      {
        id: '2-2',
        title: 'سوق العمل',
        description: 'معلومات عن سوق العمل والفرص المتاحة',
        topicCount: 82,
        postCount: 1367,
        parentCategory: '2'
      }
    ]
  }
];

export const mockTopics: ForumTopic[] = [
  {
    id: '1',
    title: 'كيفية تطبيق اختبار الذكاء المتعدد للطلاب',
    content: 'أرغب في مناقشة أفضل الطرق لتطبيق نظرية الذكاء المتعدد لهوارد جاردنر...',
    author: mockUsers[0],
    categoryId: '1',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    replyCount: 23,
    viewCount: 456,
    isPinned: true,
    isLocked: false,
    tags: ['الذكاء المتعدد', 'جاردنر', 'تطبيق عملي']
  },
  {
    id: '2',
    title: 'استراتيجيات التعامل مع طلاب صعوبات التعلم',
    content: 'شاركوا معنا تجاربكم في التعامل مع الطلاب ذوي صعوبات التعلم...',
    author: mockUsers[1],
    categoryId: '1',
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T12:15:00Z',
    replyCount: 18,
    viewCount: 342,
    isPinned: false,
    isLocked: false,
    tags: ['صعوبات التعلم', 'استراتيجيات', 'تجارب']
  }
];