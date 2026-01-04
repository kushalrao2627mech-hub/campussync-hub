import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock } from 'lucide-react';
import { getFreeSpaces } from '@/services/mock-timetable-service';
import { FreeSpace } from '@/types/timetable';
export function FreeSpaceCard() {
  const [freeSpaces, setFreeSpaces] = useState<FreeSpace[]>([]);
  useEffect(() => {
    // Initial load
    setFreeSpaces(getFreeSpaces());

    // Refresh every minute
    const interval = setInterval(() => {
      setFreeSpaces(getFreeSpaces());
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  const formatTimeRemaining = (minutes: number | null): string => {
    if (minutes === null) return 'Free all day';
    if (minutes < 60) return `${minutes}m remaining`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m remaining` : `${hours}h remaining`;
  };
  const getUrgencyColor = (minutes: number | null): string => {
    if (minutes === null) return 'bg-success text-success-foreground';
    if (minutes > 60) return 'bg-success text-success-foreground';
    if (minutes > 30) return 'bg-amber-500 text-white';
    return 'bg-destructive text-destructive-foreground';
  };
  return <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Find a Quiet Space
        </CardTitle>
      </CardHeader>
      <CardContent>
        {freeSpaces.length === 0 ? <p className="text-sm text-muted-foreground text-center py-4">
            No free rooms available right now
          </p> : <div className="space-y-3">
            {freeSpaces.slice(0, 5).map(space => <div key={space.room.id} className="flex items-center justify-between p-3 rounded-md bg-muted">
                <div>
                  <p className="font-medium">{space.room.name}</p>
                  <p className="text-sm text-muted-foreground">{space.room.building}</p>
                </div>
                <Badge className={getUrgencyColor(space.minutesRemaining)}>
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTimeRemaining(space.minutesRemaining)}
                </Badge>
              </div>)}
          </div>}
      </CardContent>
    </Card>;
}