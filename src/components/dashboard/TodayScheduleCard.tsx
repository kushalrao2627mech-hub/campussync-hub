import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { getTodaySchedule } from '@/services/mock-timetable-service';
import { TimetableSlot } from '@/types/timetable';
import { cn } from '@/lib/utils';

export function TodayScheduleCard() {
  const [schedule, setSchedule] = useState<TimetableSlot[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setSchedule(getTodaySchedule());
    
    // Update current time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const isCurrentClass = (slot: TimetableSlot): boolean => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    const [startH, startM] = slot.startTime.split(':').map(Number);
    const [endH, endM] = slot.endTime.split(':').map(Number);
    const start = startH * 60 + startM;
    const end = endH * 60 + endM;
    return now >= start && now < end;
  };

  const isPastClass = (slot: TimetableSlot): boolean => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    const [endH, endM] = slot.endTime.split(':').map(Number);
    const end = endH * 60 + endM;
    return now >= end;
  };

  const dayName = currentTime.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Today's Schedule
        </CardTitle>
        <p className="text-sm text-muted-foreground">{dayName}</p>
      </CardHeader>
      <CardContent>
        {schedule.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No classes scheduled for today
          </p>
        ) : (
          <div className="space-y-2">
            {schedule.map((slot) => (
              <div 
                key={slot.id}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-md transition-colors",
                  isCurrentClass(slot) && "bg-primary text-primary-foreground",
                  isPastClass(slot) && "opacity-50",
                  !isCurrentClass(slot) && !isPastClass(slot) && "bg-secondary/50"
                )}
              >
                <div className="font-mono text-sm shrink-0 w-24">
                  {slot.startTime} - {slot.endTime}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{slot.courseName}</p>
                  <p className={cn(
                    "text-sm truncate",
                    isCurrentClass(slot) ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {slot.teacherName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
