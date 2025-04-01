
import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, otpVerification } from "@/api/api";
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Register new user
  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await registerUser(userData);
      toast({
        title: "Registration successful",
        description: "Please verify your OTP to continue.",
      });
      return response.data;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await otpVerification(credentials);
      toast({
        title: "OTP verified",
        description: "You can now login with your credentials.",
      });
      return response.data;
    } catch (error) {
      toast({
        title: "OTP verification failed",
        description: error.response?.data?.message || "Invalid OTP",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await loginUser(credentials);
      const { token, user } = response.data;
      
      localStorage.setItem("authToken", token);
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name || "user"}!`,
      });
      
      return response.data;
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  // Context value
  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    register,
    verifyOTP
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
