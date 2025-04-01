
import { useState, useRef } from "react";
import { Camera, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useCreatePost } from "@/services/PostsService";

export function CreatePostCard() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const createPostMutation = useCreatePost();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() && !image) return;
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to create posts",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }
      
      await createPostMutation.mutateAsync(formData);
      
      // Reset form
      setContent("");
      setImage(null);
      setImagePreview(null);
      
      toast({
        title: "Success",
        description: "Your post has been created!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create post",
        variant: "destructive",
      });
      console.error("Error creating post:", error);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-12 resize-none border-0 bg-transparent p-0 text-base focus-visible:ring-0"
            />
            {imagePreview && (
              <div className="relative mt-2 overflow-hidden rounded-lg">
                <img
                  src={imagePreview}
                  alt="Upload preview"
                  className="h-auto w-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-background/80 text-foreground"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between p-3">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            title="Upload image"
          >
            <Camera className="h-5 w-5" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={handleSubmit}
          disabled={(!content.trim() && !image) || createPostMutation.isPending}
          className="bg-social hover:bg-social-hover text-white"
        >
          {createPostMutation.isPending ? "Posting..." : "Post"}
        </Button>
      </CardFooter>
    </Card>
  );
}
