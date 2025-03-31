
import { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export function CreatePostCard() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!content.trim() && !image) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setContent("");
      setImage(null);
      setIsSubmitting(false);
      console.log("Post created", { content, image });
    }, 1000);
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
            {image && (
              <div className="relative mt-2 overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt="Upload preview"
                  className="h-auto w-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-background/80 text-foreground"
                  onClick={() => setImage(null)}
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
          disabled={(!content.trim() && !image) || isSubmitting}
          className="bg-social hover:bg-social-hover text-white"
        >
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </CardFooter>
    </Card>
  );
}
