
import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useDeletePost } from "@/services/PostsService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function PostCard({
  id,
  user,
  content,
  image,
  video,
  createdAt,
  likes,
  comments,
  shares,
  liked: initialLiked,
  saved: initialSaved,
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [saved, setSaved] = useState(initialSaved);
  const [likeCount, setLikeCount] = useState(likes);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const deletePostMutation = useDeletePost();
  const { user: currentUser } = useAuth();
  const { toast } = useToast();
  
  const isOwner = currentUser && user.id === currentUser.id;

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
  };
  
  const handleDelete = async () => {
    try {
      await deletePostMutation.mutateAsync(id);
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    }
    setShowDeleteDialog(false);
  };

  const formatTimeAgo = (dateString) => {
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

  return (
    <>
      <Card className="mb-4 overflow-hidden card-hover">
        <CardHeader className="flex flex-row items-center gap-3 p-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-semibold">{user.name}</span>
              <span className="text-sm text-muted-foreground">@{user.username}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatTimeAgo(createdAt)}
            </div>
          </div>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isOwner && (
                  <DropdownMenuItem 
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuItem>Not interested</DropdownMenuItem>
                <DropdownMenuItem>Copy link</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="mb-3 whitespace-pre-line">{content}</p>
          {image && (
            <div className="mt-3 overflow-hidden rounded-lg">
              <img
                src={image}
                alt="Post"
                className="h-auto w-full object-cover"
              />
            </div>
          )}
          {video && (
            <div className="mt-3 overflow-hidden rounded-lg">
              <video
                src={video}
                controls
                className="h-auto w-full"
              />
            </div>
          )}
        </CardContent>
        <Separator />
        <CardFooter className="flex items-center justify-between p-3">
          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-1", liked && "text-red-500")}
            onClick={handleLike}
          >
            <Heart className={cn("h-5 w-5", liked && "fill-current")} />
            <span>{likeCount > 0 && likeCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <MessageCircle className="h-5 w-5" />
            <span>{comments > 0 && comments}</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-5 w-5" />
            <span>{shares > 0 && shares}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className={cn(saved && "text-social")}
          >
            <Bookmark className={cn("h-5 w-5", saved && "fill-current")} />
          </Button>
        </CardFooter>
      </Card>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this post. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {deletePostMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
