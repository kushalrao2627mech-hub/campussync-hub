import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TeacherBeaconPanel } from '@/components/attendance/TeacherBeaconPanel';
import { StudentScannerPanel } from '@/components/attendance/StudentScannerPanel';
import { useAuth } from '@/contexts/AuthContext';

export default function Attendance() {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Bluetooth Attendance</h1>
          <p className="text-muted-foreground">
            {isTeacher 
              ? 'Start a session to broadcast your beacon and track student check-ins.'
              : 'Scan for your teacher\'s beacon to mark your attendance.'
            }
          </p>
        </div>

        {/* Role-based Panel */}
        <div className="flex justify-center">
          {isTeacher ? (
            <TeacherBeaconPanel />
          ) : (
            <StudentScannerPanel />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
