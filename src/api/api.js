
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs
export const registerUser = (userData) => API.post("/student/register", userData);
export const otpVerification = (credentials) => API.post("/student/verify-otp", credentials);
export const loginUser = (credentials) => API.post("/student/login", credentials);

// Post APIs
export const getPosts = () => API.get("/posts");
export const getPostById = (id) => API.get(`/posts/${id}`);
export const createPost = (postData) => API.post("/posts", postData);

// Comment APIs
export const getComments = (postId) => API.get(`/comment/${postId}`);
export const createComment = (postId, commentData) => API.post(`/comment/${postId}`, commentData);

// Conversation APIs
export const getConversations = (userId) => API.get(`/conversations/${userId}`);
