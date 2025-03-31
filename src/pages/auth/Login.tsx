
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OTPInput } from "@/components/auth/OTPInput";
import { CountdownTimer } from "@/components/auth/CountdownTimer";
import { useToast } from "@/hooks/use-toast";

export function Login() {
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+?[0-9]{10,15}$/.test(phone);
  };

  const handleSendOtp = () => {
    if (activeTab === "email" && !validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (activeTab === "phone" && !validatePhone(phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call for sending OTP
    setTimeout(() => {
      setIsOtpSent(true);
      setIsResendDisabled(true);
      setIsSubmitting(false);
      toast({
        title: "OTP sent",
        description: `OTP has been sent to your ${activeTab}`,
      });
    }, 1000);
  };

  const handleResendOtp = () => {
    setIsResendDisabled(true);
    
    // Simulate API call for resending OTP
    setTimeout(() => {
      toast({
        title: "OTP resent",
        description: `A new OTP has been sent to your ${activeTab}`,
      });
    }, 1000);
  };

  const handleVerifyOtp = (otp: string) => {
    setIsSubmitting(true);
    
    // Simulate API call for verifying OTP
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Login successful",
        description: "You have been logged in successfully",
      });
      navigate("/");
    }, 1500);
  };

  const handleTimerComplete = () => {
    setIsResendDisabled(false);
  };

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Login to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          {!isOtpSent ? (
            <Tabs defaultValue="email" value={activeTab} onValueChange={(value) => setActiveTab(value as "email" | "phone")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full bg-social hover:bg-social-hover"
                    onClick={handleSendOtp}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Get OTP"}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="phone">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full bg-social hover:bg-social-hover"
                    onClick={handleSendOtp}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Get OTP"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <p className="mb-2">Enter the OTP sent to</p>
                <p className="font-medium">
                  {activeTab === "email" ? email : phone}
                </p>
              </div>
              <OTPInput
                length={4}
                onComplete={handleVerifyOtp}
                className="mx-auto"
              />
              <div className="flex items-center justify-between text-sm">
                <Button
                  variant="link"
                  size="sm"
                  onClick={handleResendOtp}
                  disabled={isResendDisabled}
                  className="h-auto p-0"
                >
                  Resend OTP
                </Button>
                {isResendDisabled && (
                  <div className="flex items-center gap-1">
                    <span>Resend in</span>
                    <CountdownTimer
                      initialSeconds={30}
                      onComplete={handleTimerComplete}
                    />
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setIsOtpSent(false)}
              >
                Change {activeTab}
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-social hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
