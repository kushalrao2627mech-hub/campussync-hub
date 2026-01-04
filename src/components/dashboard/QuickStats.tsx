import { Card, CardContent } from '@/components/ui/card';
import { Users, Clock, CheckCircle, BookOpen } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
}

function StatCard({ label, value, icon: Icon, description }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-secondary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-semibold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
        {description && (
          <p className="mt-2 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function QuickStats() {
  // In a real app, these would come from the database
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        label="Classes Today" 
        value={5}
        icon={Clock}
      />
      <StatCard 
        label="Present Today" 
        value="32/40"
        icon={CheckCircle}
      />
      <StatCard 
        label="Free Rooms" 
        value={4}
        icon={Users}
      />
      <StatCard 
        label="Topics Completed" 
        value="12/20"
        icon={BookOpen}
      />
    </div>
  );
}
