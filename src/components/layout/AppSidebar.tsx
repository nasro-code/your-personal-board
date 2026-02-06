import { LayoutDashboard, LogOut, Sparkles, KanbanSquare } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AppSidebarProps {
  onOpenChat: () => void;
}

export function AppSidebar({ onOpenChat }: AppSidebarProps) {
  const { user, signOut } = useAuth();

  return (
    <aside className="flex h-screen w-[240px] flex-shrink-0 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
          <KanbanSquare className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-base font-bold text-foreground tracking-tight">TaskFlow</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-2">
        <div className="space-y-1">
          <a
            href="/"
            className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-2.5 text-sm font-medium text-foreground"
          >
            <LayoutDashboard className="h-4 w-4" />
            Board
          </a>
          <button
            onClick={onOpenChat}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Sparkles className="h-4 w-4" />
            AI Assistant
          </button>
        </div>
      </nav>

      {/* User */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground uppercase">
            {user?.email?.[0] || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {user?.email?.split('@')[0] || 'User'}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email || ''}
            </p>
          </div>
          <button
            onClick={signOut}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
