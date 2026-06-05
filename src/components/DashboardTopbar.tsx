import { Bell, Search, Upload } from "lucide-react";

export function DashboardTopbar({ initials = "AJ" }: { initials?: string }) {
  return (
    <header className="flex items-center gap-3 mb-8">
      <div className="relative flex-1 max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search files and folders…"
          className="w-full h-11 pl-11 pr-16 rounded-2xl bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 shadow-sm transition-all"
        />
        <kbd className="hidden md:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center px-2 h-6 rounded-md bg-muted text-[10px] font-semibold text-muted-foreground">
          ⌘K
        </kbd>
      </div>
      <button className="relative size-11 rounded-2xl bg-card border border-border grid place-items-center hover:bg-muted transition-colors">
        <Bell className="size-[18px] text-foreground" />
        <span className="absolute -top-1 -right-1 size-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold grid place-items-center">
          3
        </span>
      </button>
      <button className="h-11 px-5 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold text-sm flex items-center gap-2 shadow-elegant hover:opacity-95 transition-opacity">
        <Upload className="size-4" /> Upload
      </button>
      <div className="size-11 rounded-2xl bg-gradient-primary text-primary-foreground grid place-items-center font-bold text-sm shadow-card">
        {initials}
      </div>
    </header>
  );
}
