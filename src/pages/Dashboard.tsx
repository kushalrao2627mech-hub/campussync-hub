import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { FreeSpaceCard } from '@/components/dashboard/FreeSpaceCard';
import { TodayScheduleCard } from '@/components/dashboard/TodayScheduleCard';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground">
            {user?.role === 'teacher' 
              ? "Manage your classes and track student attendance."
              : "Here's your schedule and available study spaces."
            }
          </p>
        </div>

        {/* Quick Stats */}
        <QuickStats />

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <TodayScheduleCard />
          <FreeSpaceCard />
        </div>
      </div>
    </DashboardLayout>
  );
}
