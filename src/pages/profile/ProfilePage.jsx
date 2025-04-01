
import { ProfileCard } from "@/components/profile/ProfileCard";
import { PostCard } from "@/components/post/PostCard";
import { useMyPost } from "@/services/PostsService";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function ProfilePage() {
  const { user } = useAuth();
  const { data, isLoading, error } = useMyPost();
  const { toast } = useToast();

  // Create profile data from user info
  const profileData = {
    id: user?.id || "user1",
    name: user?.name || "Guest User",
    username: user?.email?.split('@')[0] || "guest",
    bio: user?.bio || "No bio yet",
    location: user?.location || "Unknown",
    website: user?.website || "",
    joinDate: user?.createdAt || new Date().toISOString(),
    avatar: user?.profilePicture || "/placeholder.svg",
    coverImage: user?.coverImage || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    followers: user?.followers?.length || 0,
    following: user?.following?.length || 0,
    posts: data?.data?.length || 0,
    isFollowed: false,
    isCurrentUser: true,
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load profile data",
      variant: "destructive",
    });

    return (
      <div className="flex flex-col items-center py-10">
        <p className="text-destructive mb-4">Failed to load profile</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  // Extract posts from response
  const posts = data?.data || [];

  return (
    <div className="space-y-6">
      <ProfileCard {...profileData} />
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
          <div className="text-center py-10 bg-card rounded-md p-6">
            <p className="text-muted-foreground mb-4">No posts yet.</p>
            <p className="text-sm">Create your first post to share with others!</p>
          </div>
        )}
      </div>
    </div>
  );
}
