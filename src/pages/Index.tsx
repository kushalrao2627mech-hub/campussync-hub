import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TeacherBeaconPanel } from '@/components/attendance/TeacherBeaconPanel';
import { StudentScannerPanel } from '@/components/attendance/StudentScannerPanel';
import { GraduationCap, Radio, Bluetooth } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('teacher');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">CampusSync</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Bluetooth Attendance System
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
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
            
            <TabsContent value="student" className="mt-6">
              <StudentScannerPanel />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
