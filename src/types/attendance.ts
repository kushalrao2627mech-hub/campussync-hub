export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AttendanceSession {
  id: string;
  teacherId: string;
  teacherName: string;
  courseName: string;
  roomNumber: string;
  startedAt: string;
  isActive: boolean;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  studentId: string;
  studentName: string;
  checkInTime: string;
  bluetoothDeviceId?: string;
}
