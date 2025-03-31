
import { CreatePostCard } from "@/components/post/CreatePostCard";
import { PostCard, PostProps } from "@/components/post/PostCard";
import { NotificationDropdown } from "@/components/notification/NotificationDropdown";
import { usePosts } from "@/services/PostsService";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export function HomePage() {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const { data: postsResponse, isLoading, error } = usePosts();

  if (isLoading) {
    return <div className="flex justify-center py-10">Loading posts...</div>;
  }

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load posts. Please try again later.",
      variant: "destructive",
    });

    return (
      <div className="flex flex-col items-center py-10">
        <p className="text-destructive mb-4">Failed to load posts</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  // If API response is empty, use mock data
  const posts = postsResponse?.data?.length > 0 
    ? postsResponse.data 
    : [
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
          createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
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
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          likes: 132,
          comments: 18,
          shares: 5,
          liked: true,
          saved: false,
        },
      ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Home</h1>
        <div className="sm:hidden">
          <NotificationDropdown />
        </div>
      </div>
      
      {isAuthenticated ? (
        <CreatePostCard />
      ) : (
        <div className="mb-6 p-4 bg-muted/30 rounded-lg border text-center">
          <p className="mb-3">Sign in to share your thoughts and connect with friends</p>
          <div className="flex justify-center gap-3">
            <Button asChild variant="default" className="bg-social hover:bg-social-hover">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {posts.map((post: PostProps) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
