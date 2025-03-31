
import { CreatePostCard } from "@/components/post/CreatePostCard";
import { PostCard, PostProps } from "@/components/post/PostCard";
import { NotificationDropdown } from "@/components/notification/NotificationDropdown";

// Mock data
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
  {
    id: "3",
    user: {
      id: "user3",
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg",
    },
    content: "Just watched the new sci-fi movie everyone's talking about. It was mind-blowing! The visuals were incredible and the story kept me on the edge of my seat the whole time.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    likes: 87,
    comments: 32,
    shares: 12,
    liked: false,
    saved: true,
  },
  {
    id: "4",
    user: {
      id: "user4",
      name: "Sam Williams",
      username: "samw",
      avatar: "/placeholder.svg",
    },
    content: "Finally mastered this recipe after so many attempts! 🍰",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=1965&ixlib=rb-4.0.3",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    likes: 215,
    comments: 45,
    shares: 23,
    liked: false,
    saved: false,
  },
];

export function HomePage() {
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
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
