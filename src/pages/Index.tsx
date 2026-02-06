import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';
import { AIChatPanel } from '@/components/chat/AIChatPanel';
import { AppSidebar } from '@/components/layout/AppSidebar';

const Index = () => {
  const { user, loading } = useAuth();
  const [chatOpen, setChatOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar onOpenChat={() => setChatOpen(true)} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Workspace</h1>
            <p className="text-sm text-muted-foreground">Manage your tasks and projects</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChatOpen(true)}
              className="gap-2"
            >
              ✨ AI Assistant
            </Button>
          </div>
        </header>

        {/* Board */}
        <div className="flex-1 overflow-auto p-6">
          <KanbanBoard />
        </div>
      </main>

      {/* Chat overlay */}
      {chatOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-sm animate-fade-in"
          onClick={() => setChatOpen(false)}
        />
      )}
      <AIChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

export default Index;
