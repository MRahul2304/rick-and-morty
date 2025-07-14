import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Zap } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center px-4">
      <Card className="max-w-md w-full bg-card/50 border-border/50 backdrop-blur-sm text-center">
        <CardHeader>
          <div className="mx-auto mb-4 text-6xl animate-portal-pulse">
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-portal bg-clip-text text-transparent">
            Portal Malfunction!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-xl text-muted-foreground">Dimension Not Found</p>
            <p className="text-sm text-muted-foreground/80">
              The page you're looking for doesn't exist in this reality.
              <br />
              <code className="text-portal-green text-xs">{location.pathname}</code>
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-gradient-glow border border-portal-green/20">
            <p className="text-sm text-portal-green">
              🌀 Redirecting to a stable dimension...
            </p>
          </div>
          
          <Button 
            variant="portal" 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Character List
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
