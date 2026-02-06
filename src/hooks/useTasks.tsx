import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Task, TaskStatus, TaskPriority } from '@/types/kanban';
import { useToast } from '@/hooks/use-toast';

export function useTasks() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('position', { ascending: true });

    if (error) {
      toast({ title: 'Error loading tasks', description: error.message, variant: 'destructive' });
    } else {
      setTasks((data || []) as Task[]);
    }
    setLoading(false);
  }, [user, toast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (task: {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    tags?: string[];
    due_date?: string;
    progress?: number;
  }) => {
    if (!user) return;
    const maxPos = tasks.filter(t => t.status === task.status).length;
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        ...task,
        user_id: user.id,
        position: maxPos,
        tags: task.tags || [],
      })
      .select()
      .single();

    if (error) {
      toast({ title: 'Error creating task', description: error.message, variant: 'destructive' });
    } else {
      setTasks(prev => [...prev, data as Task]);
      toast({ title: 'Task created', description: `"${task.title}" added successfully.` });
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const { error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id);

    if (error) {
      toast({ title: 'Error updating task', description: error.message, variant: 'destructive' });
    } else {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    }
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error deleting task', description: error.message, variant: 'destructive' });
    } else {
      setTasks(prev => prev.filter(t => t.id !== id));
      toast({ title: 'Task deleted' });
    }
  };

  const moveTask = async (taskId: string, newStatus: TaskStatus, newPosition: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // Optimistic update
    setTasks(prev => {
      const updated = prev.map(t => {
        if (t.id === taskId) {
          return { ...t, status: newStatus, position: newPosition };
        }
        return t;
      });
      return updated;
    });

    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus, position: newPosition })
      .eq('id', taskId);

    if (error) {
      toast({ title: 'Error moving task', description: error.message, variant: 'destructive' });
      fetchTasks(); // Revert on error
    }
  };

  const getTasksByStatus = (status: TaskStatus) =>
    tasks.filter(t => t.status === status).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

  return { tasks, loading, addTask, updateTask, deleteTask, moveTask, getTasksByStatus, fetchTasks };
}
