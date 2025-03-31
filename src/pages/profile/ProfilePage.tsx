
import { ProfileCard, ProfileProps } from "@/components/profile/ProfileCard";
import { PostCard, PostProps } from "@/components/post/PostCard";

// Mock profile data
const profileData: ProfileProps = {
  id: "user1",
  name: "John Doe",
  username: "johndoe",
  bio: "Software engineer and amateur photographer. Passionate about technology, travel, and good coffee.",
  location: "San Francisco, CA",
  website: "johndoe.dev",
  joinDate: "2022-03-15T00:00:00Z",
  avatar: "/placeholder.svg",
  coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
  followers: 584,
  following: 267,
  posts: 42,
  isFollowed: false,
  isCurrentUser: true,
};

// Mock posts data
const posts: PostProps[] = [
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
    id: "3",
    user: {
      id: "user1",
      name: "John Doe",
      username: "johndoe",
      avatar: "/placeholder.svg",
    },
    content: "Spent the weekend working on my coding skills. Making progress on my React project!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    likes: 87,
    comments: 32,
    shares: 12,
    liked: true,
    saved: false,
  },
  {
    id: "4",
    user: {
      id: "user1",
      name: "John Doe",
      username: "johndoe",
      avatar: "/placeholder.svg",
    },
    content: "Beautiful sunset at the beach today. Nature is truly amazing!",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2073&ixlib=rb-4.0.3",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    likes: 215,
    comments: 45,
    shares: 23,
    liked: false,
    saved: false,
  },
];

export function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileCard {...profileData} />
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
