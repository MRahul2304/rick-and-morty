import { Character } from '@/api/rickAndMorty';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  character: Character;
  onClick: (id: number) => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'alive':
      return 'bg-portal-green';
    case 'dead':
      return 'bg-destructive';
    default:
      return 'bg-muted-foreground';
  }
};

const CharacterCard: React.FC<Props> = ({ character, onClick }) => {
  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-glow hover:scale-105 hover:border-portal-green/50 bg-card border-border/50"
      onClick={() => onClick(character.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-shrink-0">
            <img
              src={character.image}
              alt={character.name}
              className="w-16 h-16 rounded-lg object-cover group-hover:animate-float"
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor(character.status)} rounded-full border-2 border-card animate-glow`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-portal-green transition-colors truncate">
              {character.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {character.species} • {character.status}
            </p>
            <p className="text-xs text-muted-foreground/80 truncate">
              {character.origin.name}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;