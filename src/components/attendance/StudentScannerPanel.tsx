import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bluetooth, BluetoothSearching, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { CAMPUSSYNC_SERVICE_UUID } from '@/lib/bluetooth-constants';
import { 
  getActiveSession, 
  markAttendance,
  MOCK_USERS 
} from '@/services/mock-attendance-service';
import { useToast } from '@/hooks/use-toast';

// Type assertion for Web Bluetooth API
const getBluetoothAPI = () => (navigator as Navigator & { bluetooth?: Bluetooth }).bluetooth;

type ScanStatus = 'idle' | 'scanning' | 'found' | 'marked' | 'error' | 'no-session';

export function StudentScannerPanel() {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const { toast } = useToast();

  const student = MOCK_USERS.find(u => u.role === 'student')!;

  const scanForBeacon = async () => {
    setStatus('scanning');
    setErrorMessage('');

    // Check if Web Bluetooth is supported
    const bluetooth = getBluetoothAPI();
    if (!bluetooth) {
      setStatus('error');
      setErrorMessage('Web Bluetooth is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    // Check for active session first
    const activeSession = getActiveSession();
    if (!activeSession) {
      setStatus('no-session');
      setErrorMessage('No active attendance session found. Please wait for your teacher to start the beacon.');
      return;
    }

    try {
      // Request Bluetooth device with our specific Service UUID
      const device = await bluetooth.requestDevice({
        filters: [
          { services: [CAMPUSSYNC_SERVICE_UUID] }
        ],
        optionalServices: [CAMPUSSYNC_SERVICE_UUID]
      });

      setDeviceName(device.name || 'Unknown Device');
      setStatus('found');

      // Connect to the device to verify proximity
      const server = await device.gatt?.connect();
      
      if (server) {
        // Mark attendance in our mock backend
        markAttendance(
          activeSession.id,
          student.id,
          student.name,
          device.id
        );

        setStatus('marked');
        
        toast({
          title: 'Attendance Marked!',
          description: `You've been marked present for ${activeSession.courseName}`,
        });

        // Disconnect after marking
        server.disconnect();
      }
    } catch (error) {
      console.error('Bluetooth scan error:', error);
      
      if (error instanceof Error) {
        if (error.name === 'NotFoundError') {
          setStatus('error');
          setErrorMessage('No beacon found nearby. Make sure your teacher has started the session and you are within range.');
        } else if (error.name === 'NotAllowedError') {
          setStatus('error');
          setErrorMessage('Bluetooth permission denied. Please allow Bluetooth access and try again.');
        } else {
          setStatus('error');
          setErrorMessage(error.message);
        }
      }
    }
  };

  const resetScanner = () => {
    setStatus('idle');
    setErrorMessage('');
    setDeviceName('');
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'scanning':
        return <BluetoothSearching className="h-12 w-12 text-primary animate-pulse" />;
      case 'found':
        return <Loader2 className="h-12 w-12 text-primary animate-spin" />;
      case 'marked':
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case 'error':
      case 'no-session':
        return <AlertCircle className="h-12 w-12 text-destructive" />;
      default:
        return <Bluetooth className="h-12 w-12 text-muted-foreground" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'scanning':
        return 'Scanning for teacher beacon...';
      case 'found':
        return `Found: ${deviceName}. Marking attendance...`;
      case 'marked':
        return 'Attendance marked successfully!';
      case 'error':
      case 'no-session':
        return errorMessage;
      default:
        return 'Click the button below to scan for your teacher\'s beacon and mark your attendance.';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bluetooth className="h-5 w-5 text-primary" />
          <CardTitle>Student Scanner</CardTitle>
        </div>
        <CardDescription>
          Scan for nearby beacon to mark your attendance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current User Info */}
        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
          <div>
            <p className="font-medium">{student.name}</p>
            <p className="text-sm text-muted-foreground">{student.email}</p>
          </div>
          <Badge variant="secondary">Student</Badge>
        </div>

        {/* Status Display */}
        <div className="flex flex-col items-center justify-center py-8 text-center">
          {getStatusIcon()}
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            {getStatusMessage()}
          </p>
        </div>

        {/* Action Buttons */}
        {status === 'idle' && (
          <Button onClick={scanForBeacon} className="w-full" size="lg">
            <BluetoothSearching className="mr-2 h-5 w-5" />
            Scan & Mark Attendance
          </Button>
        )}

        {status === 'scanning' && (
          <Button disabled className="w-full" size="lg">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Scanning...
          </Button>
        )}

        {(status === 'marked' || status === 'error' || status === 'no-session') && (
          <Button onClick={resetScanner} variant="outline" className="w-full" size="lg">
            {status === 'marked' ? 'Scan Again' : 'Try Again'}
          </Button>
        )}

        {/* Browser Support Notice */}
        <p className="text-xs text-center text-muted-foreground">
          Requires Chrome or Edge browser with Bluetooth enabled
        </p>
      </CardContent>
    </Card>
  );
}
