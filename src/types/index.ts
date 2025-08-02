export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  totalScore: number;
  rank: number;
  postsCount: number;
  joinedAt: Date;
  achievements: Achievement[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;
  score: number;
  votes: Vote[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface Vote {
  id: string;
  userId: string;
  postId: string;
  type: 'up' | 'down';
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  postId: string;
  content: string;
  score: number;
  createdAt: Date;
  replies?: Comment[];
  parentComment?: Comment;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  rank: number;
  postsCount: number;
}

export interface DailyStats {
  topUsers: LeaderboardEntry[];
  topPosts: Post[];
  totalPosts: number;
  totalVotes: number;
}