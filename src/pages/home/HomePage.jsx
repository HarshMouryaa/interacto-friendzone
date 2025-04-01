
import { useState } from "react";
import { CreatePostCard } from "@/components/post/CreatePostCard";
import { PostCard } from "@/components/post/PostCard";
import { NotificationDropdown } from "@/components/notification/NotificationDropdown";
import { usePosts } from "@/services/PostsService";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export function HomePage() {
  const { toast } = useToast();
  const [refreshKey, setRefreshKey] = useState(0);
  const { data, isLoading, error } = usePosts(refreshKey);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Home</h1>
          <div className="sm:hidden">
            <NotificationDropdown />
          </div>
        </div>
        
        <CreatePostCard />
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border bg-card p-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[160px]" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-60 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
        <Button onClick={handleRefresh}>Try Again</Button>
      </div>
    );
  }

  // Extract posts from response
  const posts = data?.data || [];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Home</h1>
        <div className="sm:hidden">
          <NotificationDropdown />
        </div>
      </div>
      
      <CreatePostCard />
      
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard 
              key={post._id} 
              id={post._id}
              user={{
                id: post.userId._id,
                name: post.userId.name,
                username: post.userId.email.split('@')[0],
                avatar: post.userId.profilePicture || "/placeholder.svg"
              }}
              content={post.content}
              image={post.image}
              createdAt={post.createdAt}
              likes={post.likes?.length || 0}
              comments={post.comments?.length || 0}
              shares={0}
              liked={false}
              saved={false}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">No posts yet.</p>
            <p className="text-sm">Be the first to create a post!</p>
          </div>
        )}
      </div>
    </div>
  );
}
