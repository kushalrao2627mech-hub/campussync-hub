import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FreeSpaceCard } from '@/components/dashboard/FreeSpaceCard';
import { getFullWeekSchedule, MOCK_ROOMS } from '@/services/mock-timetable-service';
import { cn } from '@/lib/utils';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

export default function Timetable() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'rooms'>('schedule');
  const weekSchedule = getFullWeekSchedule();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Timetable</h1>
          <p className="text-muted-foreground">
            View class schedules and find available rooms.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList>
            <TabsTrigger value="schedule">Week Schedule</TabsTrigger>
            <TabsTrigger value="rooms">Find a Room</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="mt-6">
            <div className="grid gap-4">
              {DAYS.map((day) => (
                <Card key={day}>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base font-medium">{day}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {weekSchedule[day]?.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-2">No classes</p>
                    ) : (
                      <div className="divide-y divide-border">
                        {weekSchedule[day]?.map((slot) => {
                          const room = MOCK_ROOMS.find(r => r.id === slot.roomId);
                          return (
                            <div 
                              key={slot.id}
                              className="flex items-center gap-4 py-3"
                            >
                              <div className="font-mono text-sm text-muted-foreground w-28 shrink-0">
                                {slot.startTime} - {slot.endTime}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{slot.courseName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {slot.teacherName} • {room?.name}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rooms" className="mt-6">
            <div className="max-w-md">
              <FreeSpaceCard />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
