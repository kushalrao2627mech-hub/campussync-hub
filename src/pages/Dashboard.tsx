import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { FreeSpaceCard } from '@/components/dashboard/FreeSpaceCard';
import { TodayScheduleCard } from '@/components/dashboard/TodayScheduleCard';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back. Here's what's happening today.
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
