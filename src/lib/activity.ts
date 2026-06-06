// Lightweight client-side notifications + activity feed + downloads counter.
// Persisted in localStorage and synced across hooks via a CustomEvent.

export type ActivityType =
  | "uploaded"
  | "downloaded"
  | "renamed"
  | "deleted"
  | "restored"
  | "shared"
  | "starred"
  | "trashed";

export type ActivityItem = {
  id: string;
  type: ActivityType;
  fileName: string;
  meta?: string;
  at: string; // ISO
};

export type NotificationItem = {
  id: string;
  title: string;
  body?: string;
  type: ActivityType;
  read: boolean;
  at: string;
};

const ACT_KEY = "cloudfile:activity";
const NOTIF_KEY = "cloudfile:notifications";
const DL_KEY = "cloudfile:downloads_count";
export const ACTIVITY_EVENT = "cloudfile:activity-changed";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

function emit() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(ACTIVITY_EVENT));
  }
}

export function getActivities(): ActivityItem[] {
  if (typeof window === "undefined") return [];
  return safeParse<ActivityItem[]>(localStorage.getItem(ACT_KEY), []);
}

export function getNotifications(): NotificationItem[] {
  if (typeof window === "undefined") return [];
  return safeParse<NotificationItem[]>(localStorage.getItem(NOTIF_KEY), []);
}

export function getDownloadsCount(): number {
  if (typeof window === "undefined") return 0;
  const v = Number(localStorage.getItem(DL_KEY) ?? "0");
  return Number.isFinite(v) ? v : 0;
}

export function recordActivity(type: ActivityType, fileName: string, meta?: string) {
  if (typeof window === "undefined") return;
  const item: ActivityItem = {
    id: crypto.randomUUID(),
    type,
    fileName,
    meta,
    at: new Date().toISOString(),
  };
  const list = [item, ...getActivities()].slice(0, 100);
  localStorage.setItem(ACT_KEY, JSON.stringify(list));

  // Also create a notification for noteworthy events
  const titleMap: Record<ActivityType, string> = {
    uploaded: "File uploaded",
    downloaded: "File downloaded",
    renamed: "File renamed",
    deleted: "File deleted",
    restored: "File restored",
    shared: "File shared",
    starred: "File starred",
    trashed: "File moved to trash",
  };
  const notif: NotificationItem = {
    id: crypto.randomUUID(),
    title: titleMap[type],
    body: fileName,
    type,
    read: false,
    at: item.at,
  };
  const notifs = [notif, ...getNotifications()].slice(0, 50);
  localStorage.setItem(NOTIF_KEY, JSON.stringify(notifs));

  if (type === "downloaded") {
    localStorage.setItem(DL_KEY, String(getDownloadsCount() + 1));
  }

  emit();
}

export function markAllNotificationsRead() {
  const list = getNotifications().map((n) => ({ ...n, read: true }));
  localStorage.setItem(NOTIF_KEY, JSON.stringify(list));
  emit();
}

export function clearNotifications() {
  localStorage.setItem(NOTIF_KEY, "[]");
  emit();
}

export function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}
