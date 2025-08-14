export interface Task {
  id: number;
  title: string;
  description?: string;
  priority_score?: number;
  deadline?: string;
  status: string;
  category?: {
    id: number;
    name: string;
    color?: string;
  } | null;
  ai_enhanced_description?: string;
  estimated_duration?: number;
  created_at: string;
  updated_at: string;
}
