import { useState } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { COLUMNS, type TaskStatus } from '@/types/kanban';
import { KanbanColumn } from './KanbanColumn';
import { AddTaskDialog } from './AddTaskDialog';
import { useTasks } from '@/hooks/useTasks';

export function KanbanBoard() {
  const { getTasksByStatus, addTask, deleteTask, moveTask } = useTasks();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogStatus, setAddDialogStatus] = useState<TaskStatus>('todo');

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId as TaskStatus;
    const newPosition = result.destination.index;

    moveTask(taskId, newStatus, newPosition);
  };

  const handleAddClick = (status: TaskStatus) => {
    setAddDialogStatus(status);
    setAddDialogOpen(true);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 px-1">
          {COLUMNS.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={getTasksByStatus(column.id)}
              onAddTask={() => handleAddClick(column.id)}
              onDeleteTask={deleteTask}
            />
          ))}
        </div>
      </DragDropContext>

      <AddTaskDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        defaultStatus={addDialogStatus}
        onAdd={addTask}
      />
    </>
  );
}
