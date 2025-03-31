
import { useState } from "react";
import { User, MessageSquare, Link as LinkIcon, MapPin, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface ProfileProps {
  id: string;
  name: string;
  username: string;
  bio: string;
  location?: string;
  website?: string;
  joinDate: string;
  avatar?: string;
  coverImage?: string;
  followers: number;
  following: number;
  posts: number;
  isFollowed: boolean;
  isCurrentUser: boolean;
}

export function ProfileCard({
  id,
  name,
  username,
  bio,
  location,
  website,
  joinDate,
  avatar,
  coverImage,
  followers,
  following,
  posts,
  isFollowed: initialIsFollowed,
  isCurrentUser,
}: ProfileProps) {
  const [isFollowed, setIsFollowed] = useState(initialIsFollowed);
  const [followerCount, setFollowerCount] = useState(followers);

  const handleFollow = () => {
    setIsFollowed(!isFollowed);
    setFollowerCount(prevCount => isFollowed ? prevCount - 1 : prevCount + 1);
  };

  return (
    <Card className="overflow-hidden">
      <div
        className="h-32 w-full md:h-48"
        style={{
          backgroundImage: coverImage ? `url(${coverImage})` : "linear-gradient(to right, #C4B5FD, #8B5CF6)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <CardHeader className="relative pb-0">
        <div className="absolute -top-12 left-4 rounded-full border-4 border-background">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>
              <User className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="ml-auto flex items-center gap-2 pt-2">
          {!isCurrentUser ? (
            <>
              <Button variant="outline" size="sm">
                <MessageSquare className="mr-1 h-4 w-4" />
                Message
              </Button>
              <Button
                variant={isFollowed ? "outline" : "default"}
                size="sm"
                onClick={handleFollow}
                className={!isFollowed ? "bg-social hover:bg-social-hover" : ""}
              >
                {isFollowed ? "Following" : "Follow"}
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-sm text-muted-foreground">@{username}</p>
          <p className="mt-2">{bio}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {location && (
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {location}
              </div>
            )}
            {website && (
              <div className="flex items-center">
                <LinkIcon className="mr-1 h-4 w-4" />
                <a
                  href={website.startsWith("http") ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-social hover:underline"
                >
                  {website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              Joined {new Date(joinDate).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
            </div>
          </div>
          <div className="mt-3 flex gap-4 text-sm">
            <div>
              <span className="font-bold">{following}</span>
              <span className="ml-1 text-muted-foreground">Following</span>
            </div>
            <div>
              <span className="font-bold">{followerCount}</span>
              <span className="ml-1 text-muted-foreground">Followers</span>
            </div>
            <div>
              <span className="font-bold">{posts}</span>
              <span className="ml-1 text-muted-foreground">Posts</span>
            </div>
          </div>
        </div>
        <Tabs defaultValue="posts" className="mt-6">
          <TabsList className="w-full">
            <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
            <TabsTrigger value="media" className="flex-1">Media</TabsTrigger>
            <TabsTrigger value="likes" className="flex-1">Likes</TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="pt-4">
            {/* Content for posts tab */}
          </TabsContent>
          <TabsContent value="media" className="pt-4">
            {/* Content for media tab */}
          </TabsContent>
          <TabsContent value="likes" className="pt-4">
            {/* Content for likes tab */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
