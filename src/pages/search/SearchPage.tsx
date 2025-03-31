
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { PostCard, PostProps } from "@/components/post/PostCard";

interface UserResult {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio: string;
  followers: number;
  isFollowing: boolean;
}

// Mock search results
const mockUsers: UserResult[] = [
  {
    id: "user1",
    name: "John Doe",
    username: "johndoe",
    avatar: "/placeholder.svg",
    bio: "Software engineer and amateur photographer",
    followers: 584,
    isFollowing: false,
  },
  {
    id: "user2",
    name: "Jane Smith",
    username: "janesmith",
    avatar: "/placeholder.svg",
    bio: "Digital artist and UI designer",
    followers: 1247,
    isFollowing: true,
  },
  {
    id: "user3",
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/placeholder.svg",
    bio: "Travel blogger and food enthusiast",
    followers: 872,
    isFollowing: false,
  },
  {
    id: "user4",
    name: "Sam Williams",
    username: "samw",
    avatar: "/placeholder.svg",
    bio: "Writer and podcaster",
    followers: 1035,
    isFollowing: false,
  },
];

const mockPosts: PostProps[] = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "John Doe",
      username: "johndoe",
      avatar: "/placeholder.svg",
    },
    content: "Just launched my new project! Check it out and let me know what you think.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    likes: 24,
    comments: 5,
    shares: 2,
    liked: false,
    saved: false,
  },
  {
    id: "2",
    user: {
      id: "user2",
      name: "Jane Smith",
      username: "janesmith",
      avatar: "/placeholder.svg",
    },
    content: "Beautiful day for a hike in the mountains! 🏔️\n\nNothing beats the fresh air and stunning views. Definitely recommend this trail if you're in the area.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1770&ixlib=rb-4.0.3",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    likes: 132,
    comments: 18,
    shares: 5,
    liked: true,
    saved: false,
  },
];

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("people");
  const [users, setUsers] = useState<UserResult[]>(mockUsers);
  const [posts, setPosts] = useState<PostProps[]>(mockPosts);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a real app, this would call an API to fetch search results
  };

  const handleFollow = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  const filteredUsers = searchQuery
    ? users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  const filteredPosts = searchQuery
    ? posts.filter(post =>
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Search</h1>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search people, posts, and hashtags"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </form>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full grid grid-cols-2">
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="people">
          {filteredUsers.length > 0 ? (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-sm text-muted-foreground">@{user.username}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.bio}</p>
                        <p className="text-xs">
                          <span className="font-medium">{user.followers}</span>
                          <span className="text-muted-foreground"> followers</span>
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={user.isFollowing ? "outline" : "default"}
                      className={!user.isFollowing ? "bg-social hover:bg-social-hover" : ""}
                      size="sm"
                      onClick={() => handleFollow(user.id)}
                    >
                      {user.isFollowing ? "Following" : "Follow"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-lg border">
              <p className="text-muted-foreground">No people found</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="posts">
          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-lg border">
              <p className="text-muted-foreground">No posts found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
