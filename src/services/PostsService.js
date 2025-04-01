
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, getPostById, createPost, deletePost, getComments, createComment } from "@/api/api";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
};

export const useMyPost = () => {
  return useQuery({
    queryKey: ["myPosts"],
    queryFn: getPostById,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
    },
  });
};

export const useComments = (postId) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });
};

export const useCreateComment = (postId) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (commentData) => createComment(postId, commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
};
