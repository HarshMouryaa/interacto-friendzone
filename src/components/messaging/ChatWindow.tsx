
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Image, Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react";

export interface MessageProps {
  id: string;
  text: string;
  timestamp: string;
  sender: "me" | "other";
  read: boolean;
  image?: string;
}

interface ChatWindowProps {
  chatId: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
    online: boolean;
    lastActive?: string;
  };
  messages: MessageProps[];
}

export function ChatWindow({ chatId, user, messages: initialMessages }: ChatWindowProps) {
  const [messages, setMessages] = useState<MessageProps[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Focus input when chat window is opened
    inputRef.current?.focus();
  }, [chatId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: MessageProps = {
      id: `msg-${Date.now()}`,
      text: newMessage,
      timestamp: new Date().toISOString(),
      sender: "me",
      read: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <span className="font-medium">{user.name}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {user.online ? (
                  <span className="flex items-center">
                    <span className="mr-1 h-2 w-2 rounded-full bg-green-500" /> Online
                  </span>
                ) : (
                  `Last active ${user.lastActive ? new Date(user.lastActive).toLocaleString() : "recently"}`
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex", message.sender === "me" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[75%] rounded-xl px-3 py-2",
                  message.sender === "me"
                    ? "bg-social text-white"
                    : "bg-accent text-foreground"
                )}
              >
                {message.text}
                {message.image && (
                  <img
                    src={message.image}
                    alt="Shared"
                    className="mt-2 rounded-md"
                  />
                )}
                <div className="mt-1 flex justify-end gap-1 text-xs opacity-70">
                  <span>{formatMessageTime(message.timestamp)}</span>
                  {message.sender === "me" && (
                    <span>{message.read ? "Read" : "Delivered"}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="border-t p-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9 shrink-0 rounded-full">
            <Image className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 shrink-0 rounded-full">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            ref={inputRef}
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="rounded-full"
          />
          <Button
            variant="default"
            size="icon"
            className="h-9 w-9 shrink-0 rounded-full bg-social hover:bg-social-hover"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
