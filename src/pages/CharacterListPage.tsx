import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchCharacters, CharacterApiResponse } from '@/api/rickAndMorty';
import CharacterTable from '@/components/CharacterTable';
import CharacterCard from '@/components/CharacterCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';

const CharacterListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const navigate = useNavigate();

  const { data, isFetching, refetch } = useQuery<CharacterApiResponse, Error>({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleCharacterClick = (id: number) => {
    navigate(`/character/${id}`);
  };

  const nextPage = () => {
    if (data?.info.next) {
      setPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cosmic">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Card className="mb-8 bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-portal bg-clip-text text-transparent">
                  Rick & Morty Characters
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Explore the multiverse • Page {page} of {data?.info.pages || '...'}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="glow"
                  size="sm"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                  {isFetching ? 'Loading...' : 'Refresh'}
                </Button>
                
                <div className="flex rounded-lg border border-border/50 bg-muted/30">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-portal-green/20 text-portal-green' : ''}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className={viewMode === 'table' ? 'bg-portal-green/20 text-portal-green' : ''}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Loading State */}
        {isFetching && !data && (
          <Card className="bg-card/30 border-border/50">
            <CardContent className="py-12">
              <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-muted-foreground">Loading characters from the multiverse...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content */}
        {data && (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {data.results.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    onClick={handleCharacterClick}
                  />
                ))}
              </div>
            ) : (
              <div className="mb-8">
                <CharacterTable 
                  data={data.results} 
                  onRowClick={handleCharacterClick}
                />
              </div>
            )}

            {/* Pagination */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="cosmic"
                    onClick={prevPage}
                    disabled={page === 1 || isFetching}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      Page {page} of {data.info.pages}
                    </span>
                    <div className="w-2 h-2 bg-portal-green rounded-full animate-glow" />
                  </div>
                  
                  <Button
                    variant="cosmic"
                    onClick={nextPage}
                    disabled={!data.info.next || isFetching}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterListPage;