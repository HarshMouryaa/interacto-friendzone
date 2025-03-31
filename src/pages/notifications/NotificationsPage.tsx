
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  user: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  content?: string;
  postId?: string;
  createdAt: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    user: {
      id: "user1",
      name: "John Doe",
      username: "johndoe",
      avatar: "/placeholder.svg",
    },
    postId: "post1",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    read: false,
  },
  {
    id: "2",
    type: "comment",
    user: {
      id: "user2",
      name: "Jane Smith",
      username: "janesmith",
      avatar: "/placeholder.svg",
    },
    content: "Great post! I loved the insights.",
    postId: "post1",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false,
  },
  {
    id: "3",
    type: "follow",
    user: {
      id: "user3",
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: true,
  },
  {
    id: "4",
    type: "mention",
    user: {
      id: "user4",
      name: "Sam Williams",
      username: "samw",
      avatar: "/placeholder.svg",
    },
    content: "Hey @you check this out!",
    postId: "post2",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    read: true,
  },
  {
    id: "5",
    type: "like",
    user: {
      id: "user5",
      name: "Emma Davis",
      username: "emmad",
      avatar: "/placeholder.svg",
    },
    postId: "post3",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    read: true,
  },
  {
    id: "6",
    type: "comment",
    user: {
      id: "user6",
      name: "Michael Brown",
      username: "michaelb",
      avatar: "/placeholder.svg",
    },
    content: "I've been thinking about this too. Let's discuss more!",
    postId: "post4",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    read: true,
  },
  {
    id: "7",
    type: "follow",
    user: {
      id: "user7",
      name: "Sophia Miller",
      username: "sophiam",
      avatar: "/placeholder.svg",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true,
  },
];

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const getNotificationText = (notification: Notification) => {
    switch(notification.type) {
      case "like":
        return "liked your post";
      case "comment":
        return "commented on your post";
      case "follow":
        return "started following you";
      case "mention":
        return "mentioned you in a post";
      default:
        return "";
    }
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </Button>
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={cn(
                "flex items-start p-4 transition-colors",
                !notification.read && "bg-secondary"
              )}
              onClick={() => markAsRead(notification.id)}
            >
              <Avatar className="mr-4 h-10 w-10">
                <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p>
                  <span className="font-semibold">{notification.user.name}</span>{" "}
                  {getNotificationText(notification)}
                  {notification.content && (
                    <span className="block text-muted-foreground">"{notification.content}"</span>
                  )}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatTimeAgo(notification.createdAt)}
                </p>
              </div>
              {!notification.read && (
                <div className="ml-2 h-2 w-2 rounded-full bg-social" />
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-lg border">
          <p className="text-muted-foreground">No notifications yet</p>
        </div>
      )}
    </div>
  );
}
