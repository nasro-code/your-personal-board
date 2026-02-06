import { Plus } from 'lucide-react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import type { Task, Column } from '@/types/kanban';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onAddTask: () => void;
  onDeleteTask: (id: string) => void;
}

export function KanbanColumn({ column, tasks, onAddTask, onDeleteTask }: KanbanColumnProps) {
  return (
    <div className="flex w-[320px] flex-shrink-0 flex-col rounded-xl bg-secondary/50 p-3">
      <div className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: column.color }}
          />
          <h2 className="text-sm font-semibold text-foreground">{column.title}</h2>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1.5 text-xs font-medium text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={onAddTask}
          className="rounded-md p-1 transition-colors hover:bg-secondary"
        >
          <Plus className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex flex-1 flex-col gap-2.5 overflow-y-auto scrollbar-thin rounded-lg p-1 min-h-[120px] transition-colors
              ${snapshot.isDraggingOver ? 'bg-primary/5' : ''}
            `}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard
                      task={task}
                      onDelete={onDeleteTask}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-2 rounded-lg bg-secondary p-3">
                  <Plus className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">No tasks yet</p>
                <button
                  onClick={onAddTask}
                  className="mt-2 text-xs font-medium text-primary hover:underline"
                >
                  Create Task
                </button>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
