import { useState, useEffect } from "react";
import { ChatList, ChatProps } from "@/components/messaging/ChatList";
import { ChatWindow, MessageProps } from "@/components/messaging/ChatWindow";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useConversations } from "@/services/ConversationsService";
import { useToast } from "@/hooks/use-toast";

// Mock messages data - would be replaced with real API data
const messagesByChat: Record<string, { 
  messages: MessageProps[],
  user: {
    id: string;
    name: string;
    avatar?: string;
    online: boolean;
    lastActive?: string;
  } 
}> = {
  chat1: {
    user: {
      id: "user1",
      name: "John Doe",
      avatar: "/placeholder.svg",
      online: true,
    },
    messages: [
      {
        id: "msg1",
        text: "Hey there, how are you?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        sender: "other",
        read: true,
      },
      {
        id: "msg2",
        text: "I'm good, thanks! Just working on a new project.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        sender: "me",
        read: true,
      },
      {
        id: "msg3",
        text: "That sounds interesting! What kind of project is it?",
        timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        sender: "other",
        read: true,
      },
      {
        id: "msg4",
        text: "It's a social media platform using React and Tailwind CSS.",
        timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
        sender: "me",
        read: true,
      },
      {
        id: "msg5",
        text: "Wow, that's exactly what I'm looking for! Can I see a demo when you're done?",
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        sender: "other",
        read: true,
      },
      {
        id: "msg6",
        text: "Absolutely! I'll share it as soon as I have something to show.",
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        sender: "me",
        read: true,
      },
      {
        id: "msg7",
        text: "Hey, how's it going?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        sender: "other",
        read: true,
      },
    ]
  },
  chat2: {
    user: {
      id: "user2",
      name: "Jane Smith",
      avatar: "/placeholder.svg",
      online: false,
      lastActive: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    },
    messages: [
      {
        id: "msg1",
        text: "Hi Jane, do you have time to discuss the project timeline?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        sender: "me",
        read: true,
      },
      {
        id: "msg2",
        text: "Sure, I'm available after 2 PM today.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
        sender: "other",
        read: true,
      },
      {
        id: "msg3",
        text: "Perfect, I'll call you then.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.4).toISOString(),
        sender: "me",
        read: true,
      },
      {
        id: "msg4",
        text: "By the way, could you send me the document we discussed earlier?",
        timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
        sender: "other",
        read: true,
      },
      {
        id: "msg5",
        text: "Can you send me the document we discussed?",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        sender: "me",
        read: true,
      },
    ]
  },
  chat3: {
    user: {
      id: "user3",
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      online: true,
    },
    messages: [
      {
        id: "msg1",
        text: "Hey, I saw your profile and thought we might have some common interests!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        sender: "other",
        read: true,
      },
      {
        id: "msg2",
        text: "I love photography too! What kind of camera do you use?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.8).toISOString(),
        sender: "other",
        read: true,
      },
      {
        id: "msg3",
        text: "I just sent you a friend request",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        sender: "other",
        read: false,
      },
    ]
  },
  chat4: {
    user: {
      id: "user4",
      name: "Sam Williams",
      avatar: "/placeholder.svg",
      online: false,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    messages: [
      {
        id: "msg1",
        text: "Hey Sam, could you help me with that coding problem we talked about?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        sender: "me",
        read: true,
      },
      {
        id: "msg2",
        text: "Sure thing! Send me the details and I'll take a look.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString(),
        sender: "other",
        read: true,
      },
      {
        id: "msg3",
        text: "I sent you the code snippet via email. It's about that React state issue.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
        sender: "me",
        read: true,
      },
      {
        id: "msg4",
        text: "Got it! I think I see the problem. You need to use the useEffect dependency array correctly.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
        sender: "other",
        read: true,
      },
      {
        id: "msg5",
        text: "That fixed it! Thanks for the help!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        sender: "other",
        read: true,
      },
    ]
  }
};

export function MessagingPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { isAuthenticated, token } = useAuth();
  const { toast } = useToast();
  
  // Parse the user ID from the token (JWT) - this is a simplified example
  // In a real app, you might decode the JWT or get the user ID from a user context
  const userId = isAuthenticated ? "current-user" : "";
  
  const { data: conversationsResponse, isLoading, error } = useConversations(userId);
  
  // Use either API data or fallback to mock data
  const chats: ChatProps[] = conversationsResponse?.data || [
    {
      id: "chat1",
      user: {
        id: "user1",
        name: "John Doe",
        avatar: "/placeholder.svg",
        online: true,
      },
      lastMessage: {
        text: "Hey, how's it going?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
        read: true,
        fromMe: false,
      },
      unreadCount: 0,
    },
    {
      id: "chat2",
      user: {
        id: "user2",
        name: "Jane Smith",
        avatar: "/placeholder.svg",
        online: false,
      },
      lastMessage: {
        text: "Can you send me the document we discussed?",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        read: true,
        fromMe: true,
      },
      unreadCount: 0,
    },
    {
      id: "chat3",
      user: {
        id: "user3",
        name: "Alex Johnson",
        avatar: "/placeholder.svg",
        online: true,
      },
      lastMessage: {
        text: "I just sent you a friend request",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        read: false,
        fromMe: false,
      },
      unreadCount: 3,
    },
    {
      id: "chat4",
      user: {
        id: "user4",
        name: "Sam Williams",
        avatar: "/placeholder.svg",
        online: false,
      },
      lastMessage: {
        text: "Thanks for the help!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
        read: true,
        fromMe: false,
      },
      unreadCount: 0,
    },
  ];

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleBackToList = () => {
    setSelectedChatId(null);
  };
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load conversations. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Messages</h1>
      {isLoading ? (
        <div className="flex justify-center py-10">Loading conversations...</div>
      ) : (
        <div className="rounded-lg border shadow-sm">
          <div className="grid h-[600px] grid-cols-1 md:grid-cols-3">
            {/* Chat list - show on mobile only if no chat is selected */}
            {(!isMobile || !selectedChatId) && (
              <div className="md:col-span-1">
                <ChatList
                  chats={chats}
                  selectedChatId={selectedChatId ?? undefined}
                  onChatSelect={handleChatSelect}
                />
              </div>
            )}

            {/* Chat window - show on mobile only if a chat is selected */}
            {(!isMobile || selectedChatId) && (
              <div className="md:col-span-2 md:border-l">
                {selectedChatId ? (
                  <>
                    {isMobile && (
                      <div className="border-b p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleBackToList}
                          className="flex items-center gap-1"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Back
                        </Button>
                      </div>
                    )}
                    <ChatWindow
                      chatId={selectedChatId}
                      user={messagesByChat[selectedChatId]?.user}
                      messages={messagesByChat[selectedChatId]?.messages || []}
                    />
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                    <div className="rounded-full bg-muted p-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-12 w-12 text-muted-foreground"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium">No chat selected</h3>
                    <p className="text-sm text-muted-foreground">
                      Select a conversation from the list to start chatting
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
