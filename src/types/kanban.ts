export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  tags: string[] | null;
  due_date: string | null;
  progress: number | null;
  position: number | null;
  created_at: string;
  updated_at: string;
}

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
}

export const COLUMNS: Column[] = [
  { id: 'todo', title: 'To-do', color: 'hsl(var(--tag-slate))' },
  { id: 'in_progress', title: 'In Progress', color: 'hsl(var(--tag-blue))' },
  { id: 'review', title: 'Review', color: 'hsl(var(--tag-orange))' },
  { id: 'completed', title: 'Completed', color: 'hsl(var(--tag-green))' },
];

export const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Design: { bg: 'bg-tag-purple-bg', text: 'text-tag-purple' },
  Development: { bg: 'bg-tag-blue-bg', text: 'text-tag-blue' },
  Marketing: { bg: 'bg-tag-green-bg', text: 'text-tag-green' },
  Research: { bg: 'bg-tag-orange-bg', text: 'text-tag-orange' },
  Planning: { bg: 'bg-tag-slate-bg', text: 'text-tag-slate' },
  Bug: { bg: 'bg-tag-red-bg', text: 'text-tag-red' },
};

export const AVAILABLE_TAGS = Object.keys(TAG_COLORS);

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}
