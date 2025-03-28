
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CloudBackground } from "@/components/CloudBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <CloudBackground />
      
      <div className="ghibli-card text-center z-10 max-w-md mx-auto px-8 py-12">
        <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oh no! It seems we've wandered off the path.
        </p>
        <div className="relative h-48 mb-8">
          <div className="w-12 h-12 bg-ghibli-blue rounded-full absolute top-1/4 left-1/2 transform -translate-x-1/2 opacity-80 animate-float"></div>
          <div className="w-8 h-8 bg-ghibli-blue rounded-full absolute top-1/3 left-1/3 opacity-70 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="w-10 h-10 bg-ghibli-blue rounded-full absolute top-1/2 right-1/3 opacity-80 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <Button className="ghibli-button" asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
