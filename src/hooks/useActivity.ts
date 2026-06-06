import { useEffect, useState } from "react";
import {
  ACTIVITY_EVENT,
  getActivities,
  getDownloadsCount,
  getNotifications,
  type ActivityItem,
  type NotificationItem,
} from "@/lib/activity";

export function useActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [downloads, setDownloads] = useState(0);

  useEffect(() => {
    const sync = () => {
      setActivities(getActivities());
      setNotifications(getNotifications());
      setDownloads(getDownloadsCount());
    };
    sync();
    window.addEventListener(ACTIVITY_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(ACTIVITY_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { activities, notifications, downloads, unreadCount };
}
