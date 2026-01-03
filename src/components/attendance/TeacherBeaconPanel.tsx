import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Radio, Users, Copy, CheckCircle } from 'lucide-react';
import { CAMPUSSYNC_SERVICE_UUID } from '@/lib/bluetooth-constants';
import { 
  createSession, 
  endSession, 
  getActiveSession,
  getAttendanceRecords,
  MOCK_USERS 
} from '@/services/mock-attendance-service';
import { AttendanceRecord, AttendanceSession } from '@/types/attendance';
import { useToast } from '@/hooks/use-toast';

export function TeacherBeaconPanel() {
  const [session, setSession] = useState<AttendanceSession | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [courseName, setCourseName] = useState('Introduction to Computer Science');
  const [roomNumber, setRoomNumber] = useState('Room 101');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const teacher = MOCK_USERS.find(u => u.role === 'teacher')!;

  // Load existing active session on mount
  useEffect(() => {
    const activeSession = getActiveSession();
    if (activeSession && activeSession.teacherId === teacher.id) {
      setSession(activeSession);
      setAttendanceRecords(getAttendanceRecords(activeSession.id));
    }
  }, []);

  // Listen for real-time attendance updates
  useEffect(() => {
    const handleAttendanceUpdate = (event: CustomEvent) => {
      if (session && event.detail.sessionId === session.id) {
        setAttendanceRecords(prev => [...prev, event.detail.record]);
      }
    };

    window.addEventListener('attendance-update', handleAttendanceUpdate as EventListener);
    return () => {
      window.removeEventListener('attendance-update', handleAttendanceUpdate as EventListener);
    };
  }, [session]);

  const startBeacon = () => {
    const newSession = createSession(teacher.id, teacher.name, courseName, roomNumber);
    setSession(newSession);
    setAttendanceRecords([]);
    
    toast({
      title: 'Beacon Started',
      description: `Session active for ${courseName}. Students can now scan to mark attendance.`,
    });
  };

  const stopBeacon = () => {
    if (session) {
      endSession(session.id);
      setSession(null);
      setAttendanceRecords([]);
      
      toast({
        title: 'Beacon Stopped',
        description: 'Attendance session has ended.',
      });
    }
  };

  const copyUUID = () => {
    navigator.clipboard.writeText(CAMPUSSYNC_SERVICE_UUID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-primary" />
          <CardTitle>Teacher Beacon</CardTitle>
        </div>
        <CardDescription>
          Start a BLE beacon session for attendance. Students will scan for this signal.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Beacon Setup Instructions */}
        <div className="rounded-lg bg-muted p-3 text-sm">
          <p className="font-medium mb-2">📱 Setup Instructions:</p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>Install a BLE beacon app (e.g., "nRF Connect")</li>
            <li>Create a peripheral with this Service UUID:</li>
          </ol>
          <div className="mt-2 flex items-center gap-2">
            <code className="flex-1 rounded bg-background px-2 py-1 text-xs">
              {CAMPUSSYNC_SERVICE_UUID}
            </code>
            <Button variant="ghost" size="sm" onClick={copyUUID}>
              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {!session ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="course">Course Name</Label>
              <Input
                id="course"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter course name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="room">Room Number</Label>
              <Input
                id="room"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="Enter room number"
              />
            </div>
            <Button onClick={startBeacon} className="w-full">
              <Radio className="mr-2 h-4 w-4" />
              Start Beacon Session
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Active Session Info */}
            <div className="rounded-lg border border-primary/50 bg-primary/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{session.courseName}</span>
                <Badge variant="default" className="animate-pulse">
                  Live
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{session.roomNumber}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Started: {new Date(session.startedAt).toLocaleTimeString()}
              </p>
            </div>

            {/* Attendance List */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="font-medium">
                  Attendance ({attendanceRecords.length})
                </span>
              </div>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {attendanceRecords.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Waiting for students to scan...
                  </p>
                ) : (
                  attendanceRecords.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between rounded-lg bg-muted p-2"
                    >
                      <span className="text-sm font-medium">{record.studentName}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(record.checkInTime).toLocaleTimeString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <Button onClick={stopBeacon} variant="destructive" className="w-full">
              Stop Beacon Session
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
