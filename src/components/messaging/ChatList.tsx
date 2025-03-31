
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export interface ChatProps {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
    online: boolean;
  };
  lastMessage: {
    text: string;
    timestamp: string;
    read: boolean;
    fromMe: boolean;
  };
  unreadCount: number;
}

interface ChatListProps {
  chats: ChatProps[];
  selectedChatId?: string;
  onChatSelect: (chatId: string) => void;
}

export function ChatList({ chats, selectedChatId, onChatSelect }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'now';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;
    
    return date.toLocaleDateString();
  };

  const filteredChats = chats.filter(chat => 
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col border-r">
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <button
                key={chat.id}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-accent",
                  selectedChatId === chat.id && "bg-accent"
                )}
                onClick={() => onChatSelect(chat.id)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
                    <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.user.online && (
                    <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                  )}
                </div>
                <div className="flex-1 truncate">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{chat.user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(chat.lastMessage.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-sm truncate",
                      !chat.lastMessage.read && !chat.lastMessage.fromMe
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    )}>
                      {chat.lastMessage.fromMe && "You: "}
                      {chat.lastMessage.text}
                    </span>
                    {chat.unreadCount > 0 && (
                      <span className="ml-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-social text-xs text-white">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="py-4 text-center text-sm text-muted-foreground">
              No conversations found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
