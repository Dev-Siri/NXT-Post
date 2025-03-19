export interface User {
  user_id: string;
  username: string;
  email: string;
  password: string;
}

export interface Post {
  post_id: string;
  title: string;
  subtitle: string;
  content: string;
  user_id: string;
  likes: number;
  created_at: Date;
}
