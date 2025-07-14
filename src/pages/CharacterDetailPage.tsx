import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById, Character } from '@/api/rickAndMorty';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Globe, Calendar, User } from 'lucide-react';

const CharacterDetailPage: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery<Character, Error>({
    queryKey: ['character', characterId],
    queryFn: () => fetchCharacterById(characterId!),
    enabled: !!characterId,
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-portal-green/20 text-portal-green border-portal-green/30';
      case 'dead':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getGenderIcon = (gender: string) => {
    return <User className="h-4 w-4" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-8">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-center text-muted-foreground">
            Loading character from the multiverse...
          </p>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-8">
          <CardContent className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Portal Malfunction!</h1>
            <p className="text-muted-foreground mb-6">
              Error: {error?.message || 'Character not found in this dimension.'}
            </p>
            <Button variant="portal" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Character List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center">
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-8">
          <CardContent className="text-center">
            <h1 className="text-2xl font-bold text-muted-foreground mb-4">Character Not Found</h1>
            <p className="text-muted-foreground mb-6">
              This character doesn't exist in any known dimension.
            </p>
            <Button variant="portal" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Character List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cosmic">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="glow" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Characters
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Character Image & Status */}
          <div className="lg:col-span-1">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-full h-auto object-cover animate-float"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getStatusColor(data.status)} animate-glow`}>
                      {data.status}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h1 className="text-3xl font-bold bg-gradient-portal bg-clip-text text-transparent mb-2">
                    {data.name}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {getGenderIcon(data.gender)}
                    <span>{data.species} • {data.gender}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Character Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Character Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/30">
                    <User className="h-5 w-5 text-portal-green" />
                    <div>
                      <p className="text-sm text-muted-foreground">Species</p>
                      <p className="font-medium text-foreground">{data.species}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/30">
                    <Calendar className="h-5 w-5 text-space-blue" />
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="font-medium text-foreground">{data.gender}</p>
                    </div>
                  </div>
                </div>

                {data.type && (
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                    <p className="text-sm text-muted-foreground mb-1">Type</p>
                    <p className="font-medium text-foreground">{data.type}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Location Info */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Locations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/30">
                  <Globe className="h-5 w-5 text-portal-green mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Origin</p>
                    <p className="font-medium text-foreground">{data.origin.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/30">
                  <MapPin className="h-5 w-5 text-space-blue mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Last Known Location</p>
                    <p className="font-medium text-foreground">{data.location.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Episodes */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">
                  Episodes ({data.episode.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground">
                  <p>This character appears in {data.episode.length} episode{data.episode.length !== 1 ? 's' : ''} throughout the multiverse.</p>
                  <div className="mt-4 p-4 rounded-lg bg-gradient-glow border border-portal-green/20">
                    <p className="text-sm text-portal-green">
                      🌀 Portal Energy Detected: Character data synchronized across {data.episode.length} dimensional episodes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailPage;