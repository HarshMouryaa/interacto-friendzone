
import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
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
];

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-social text-xs text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-10 z-50 w-80 shadow-lg animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Notifications</CardTitle>
            <CardDescription>Stay updated with your activity</CardDescription>
          </CardHeader>
          <ScrollArea className="h-[300px]">
            <CardContent className="p-3">
              {notifications.length > 0 ? (
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start rounded-lg p-2 transition-colors hover:bg-muted",
                        !notification.read && "bg-secondary"
                      )}
                    >
                      <Avatar className="mr-3 h-9 w-9">
                        <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                        <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">{notification.user.name}</span>{" "}
                          {getNotificationText(notification)}
                          {notification.content && (
                            <span className="block text-muted-foreground">"{notification.content}"</span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimeAgo(notification.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center">
                  <p className="text-muted-foreground">No notifications yet</p>
                </div>
              )}
            </CardContent>
          </ScrollArea>
          <CardFooter className="flex justify-center border-t p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark all as read
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
