import { Calendar, Clock, MessageSquare, MoreHorizontal, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Task } from '@/types/kanban';
import { TAG_COLORS } from '@/types/kanban';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  isDragging?: boolean;
}

const priorityStyles: Record<string, string> = {
  low: 'bg-tag-green-bg text-tag-green',
  medium: 'bg-tag-orange-bg text-tag-orange',
  high: 'bg-tag-red-bg text-tag-red',
};

export function TaskCard({ task, onDelete, isDragging }: TaskCardProps) {
  return (
    <div
      className={`
        group rounded-lg bg-card p-4 transition-all duration-200
        ${isDragging ? 'kanban-card-drag-shadow rotate-2 scale-105' : 'kanban-card-shadow hover:kanban-card-shadow-hover'}
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {task.tags?.map(tag => {
            const colors = TAG_COLORS[tag] || { bg: 'bg-tag-slate-bg', text: 'text-tag-slate' };
            return (
              <span
                key={tag}
                className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}
              >
                {tag}
              </span>
            );
          })}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity rounded-md p-1 hover:bg-secondary">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onDelete(task.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h3 className="mt-2 text-sm font-semibold text-card-foreground leading-snug">
        {task.title}
      </h3>
      {task.description && (
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
        {task.due_date && (
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {format(new Date(task.due_date), 'MMM d')}
          </span>
        )}
        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${priorityStyles[task.priority]}`}>
          {task.priority}
        </Badge>
      </div>

      {task.progress !== null && task.progress !== undefined && task.progress > 0 && (
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span className="font-medium">{task.progress}%</span>
          </div>
          <Progress value={task.progress} className="h-1.5" />
        </div>
      )}
    </div>
  );
}
