import { useState } from "react";
import { Bell, Check, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useActivity } from "@/hooks/useActivity";
import { clearNotifications, formatRelative, markAllNotificationsRead } from "@/lib/activity";

export function NotificationsButton() {
  const { notifications, unreadCount } = useActivity();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative size-10 rounded-xl bg-card border border-border grid place-items-center hover:bg-muted transition-colors"
          aria-label="Notifications"
        >
          <Bell className="size-[18px] text-foreground" />
          {unreadCount > 0 ? (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold grid place-items-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          ) : (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-muted text-muted-foreground text-[10px] font-semibold grid place-items-center border border-border">
              0
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            <div className="font-semibold text-sm">Notifications</div>
            <div className="text-xs text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {notifications.length > 0 && (
              <>
                <button
                  className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
                  onClick={markAllNotificationsRead}
                  aria-label="Mark all read"
                  title="Mark all read"
                >
                  <Check className="size-4" />
                </button>
                <button
                  className="p-1.5 rounded-md hover:bg-destructive/10 hover:text-destructive text-muted-foreground"
                  onClick={clearNotifications}
                  aria-label="Clear all"
                  title="Clear all"
                >
                  <Trash2 className="size-4" />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="max-h-96 overflow-auto">
          {notifications.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <div className="size-12 mx-auto rounded-2xl bg-muted grid place-items-center mb-3">
                <Bell className="size-5 text-muted-foreground" />
              </div>
              <div className="text-sm font-medium">No notifications yet</div>
              <p className="text-xs text-muted-foreground mt-1">
                Uploads, downloads and other file actions will appear here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {notifications.map((n) => (
                <li key={n.id} className={`px-4 py-3 text-sm ${n.read ? "" : "bg-primary/5"}`}>
                  <div className="flex items-start gap-3">
                    <span className={`size-2 rounded-full mt-2 shrink-0 ${n.read ? "bg-muted-foreground/30" : "bg-primary"}`} />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate">{n.title}</div>
                      {n.body && <div className="text-xs text-muted-foreground truncate">{n.body}</div>}
                      <div className="text-[11px] text-muted-foreground mt-1">{formatRelative(n.at)}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
