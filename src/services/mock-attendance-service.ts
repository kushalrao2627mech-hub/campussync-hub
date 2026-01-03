import { AttendanceSession, AttendanceRecord, User } from '@/types/attendance';

const STORAGE_KEYS = {
  SESSIONS: 'campussync_sessions',
  ATTENDANCE: 'campussync_attendance',
  CURRENT_USER: 'campussync_current_user',
};

// Mock users for testing
export const MOCK_USERS: User[] = [
  { id: 'teacher-1', name: 'Dr. Smith', email: 'smith@campus.edu', role: 'teacher' },
  { id: 'student-1', name: 'Alice Johnson', email: 'alice@campus.edu', role: 'student' },
  { id: 'student-2', name: 'Bob Williams', email: 'bob@campus.edu', role: 'student' },
  { id: 'student-3', name: 'Carol Davis', email: 'carol@campus.edu', role: 'student' },
];

// Helper to generate unique IDs
const generateId = () => crypto.randomUUID();

// Get all sessions from localStorage
export const getSessions = (): AttendanceSession[] => {
  const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
  return data ? JSON.parse(data) : [];
};

// Get active session
export const getActiveSession = (): AttendanceSession | null => {
  const sessions = getSessions();
  return sessions.find(s => s.isActive) || null;
};

// Create a new attendance session (Teacher starts beacon)
export const createSession = (
  teacherId: string,
  teacherName: string,
  courseName: string,
  roomNumber: string
): AttendanceSession => {
  const sessions = getSessions();
  
  // Deactivate any existing active sessions for this teacher
  const updatedSessions = sessions.map(s => 
    s.teacherId === teacherId ? { ...s, isActive: false } : s
  );
  
  const newSession: AttendanceSession = {
    id: generateId(),
    teacherId,
    teacherName,
    courseName,
    roomNumber,
    startedAt: new Date().toISOString(),
    isActive: true,
  };
  
  updatedSessions.push(newSession);
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updatedSessions));
  
  return newSession;
};

// End an attendance session
export const endSession = (sessionId: string): void => {
  const sessions = getSessions();
  const updatedSessions = sessions.map(s =>
    s.id === sessionId ? { ...s, isActive: false } : s
  );
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updatedSessions));
};

// Get attendance records for a session
export const getAttendanceRecords = (sessionId: string): AttendanceRecord[] => {
  const data = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
  const allRecords: AttendanceRecord[] = data ? JSON.parse(data) : [];
  return allRecords.filter(r => r.sessionId === sessionId);
};

// Mark student as present
export const markAttendance = (
  sessionId: string,
  studentId: string,
  studentName: string,
  bluetoothDeviceId?: string
): AttendanceRecord => {
  const data = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
  const allRecords: AttendanceRecord[] = data ? JSON.parse(data) : [];
  
  // Check if already marked
  const existing = allRecords.find(
    r => r.sessionId === sessionId && r.studentId === studentId
  );
  
  if (existing) {
    return existing;
  }
  
  const newRecord: AttendanceRecord = {
    id: generateId(),
    sessionId,
    studentId,
    studentName,
    checkInTime: new Date().toISOString(),
    bluetoothDeviceId,
  };
  
  allRecords.push(newRecord);
  localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(allRecords));
  
  // Dispatch custom event for real-time updates
  window.dispatchEvent(new CustomEvent('attendance-update', { 
    detail: { sessionId, record: newRecord } 
  }));
  
  return newRecord;
};

// Get/Set current user (for demo purposes)
export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
};

export const setCurrentUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};
