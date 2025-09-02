export interface User {
  id: string;
  name: string;
  email: string;
  specialization: string;
  institution: string;
  joinDate: string;
  avatar?: string;
  isOnline: boolean;
  postCount: number;
  reputation: number;
}

export interface ForumCategory {
  id: string;
  title: string;
  description: string;
  topicCount: number;
  postCount: number;
  lastPost?: {
    title: string;
    author: string;
    timestamp: string;
  };
  moderators: string[];
  subcategories: ForumSubcategory[];
}

export interface ForumSubcategory {
  id: string;
  title: string;
  description: string;
  topicCount: number;
  postCount: number;
  parentCategory: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  author: User;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  replyCount: number;
  viewCount: number;
  isPinned: boolean;
  isLocked: boolean;
  tags: string[];
}

export interface ForumPost {
  id: string;
  content: string;
  author: User;
  topicId: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  isEdited: boolean;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  type: 'cognitive' | 'personality' | 'learning' | 'career';
  duration: number; // in minutes
  questions: AssessmentQuestion[];
  createdBy: string;
  isActive: boolean;
  completions: number;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'scale' | 'text' | 'boolean';
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  required: boolean;
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  userId: string;
  studentId?: string;
  answers: Record<string, any>;
  score: number;
  completedAt: string;
  feedback: string;
}