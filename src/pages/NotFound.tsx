import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-4">
          <AlertTriangle className="h-24 w-24 text-primary mx-auto animate-pulse-subtle" />
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Access Denied</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The requested resource could not be found in the BlackRat OS database.
            This incident has been logged.
          </p>
          <div className="p-4 bg-glass-gradient border border-glass-border rounded-lg backdrop-blur-glass">
            <p className="text-sm font-mono text-muted-foreground">
              Route: <span className="text-primary">{location.pathname}</span>
            </p>
          </div>
        </div>
        
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
