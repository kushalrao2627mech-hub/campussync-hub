import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TeacherBeaconPanel } from '@/components/attendance/TeacherBeaconPanel';
import { StudentScannerPanel } from '@/components/attendance/StudentScannerPanel';
import { Radio, Bluetooth } from 'lucide-react';

export default function Attendance() {
  const [activeTab, setActiveTab] = useState('teacher');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Bluetooth Attendance</h1>
          <p className="text-muted-foreground">
            Mark attendance using Bluetooth proximity detection.
          </p>
        </div>

        {/* Role Tabs */}
        <div className="flex justify-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-lg">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="teacher" className="flex items-center gap-2">
                <Radio className="h-4 w-4" />
                Teacher
              </TabsTrigger>
              <TabsTrigger value="student" className="flex items-center gap-2">
                <Bluetooth className="h-4 w-4" />
                Student
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="teacher" className="mt-6">
              <TeacherBeaconPanel />
            </TabsContent>
            
            <TabsContent value="student" className="mt-6 flex justify-center">
              <StudentScannerPanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}
