
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-social"></div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Interacto</h1>
          <p className="text-xl text-muted-foreground">Connect with friends and the world around you.</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Interacto</CardTitle>
            <CardDescription>Login or create a new account to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full bg-social hover:bg-social-hover">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/signup">Create new account</Link>
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/home" className="text-sm text-social hover:underline">
              Continue as guest
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
