import { Room, TimetableSlot, FreeSpace } from '@/types/timetable';

// Mock rooms data
export const MOCK_ROOMS: Room[] = [
  { id: 'room-101', name: 'Room 101', building: 'Main Block', capacity: 40 },
  { id: 'room-102', name: 'Room 102', building: 'Main Block', capacity: 35 },
  { id: 'room-201', name: 'Lab 201', building: 'Science Block', capacity: 30 },
  { id: 'room-202', name: 'Lab 202', building: 'Science Block', capacity: 25 },
  { id: 'room-301', name: 'Lecture Hall A', building: 'Auditorium', capacity: 150 },
  { id: 'room-302', name: 'Seminar Room', building: 'Auditorium', capacity: 50 },
];

// Mock timetable - realistic college schedule
export const MOCK_TIMETABLE: TimetableSlot[] = [
  // Monday
  { id: 'slot-1', roomId: 'room-101', courseId: 'cs101', courseName: 'Data Structures', teacherId: 't1', teacherName: 'Dr. Smith', dayOfWeek: 'Monday', startTime: '09:00', endTime: '10:30' },
  { id: 'slot-2', roomId: 'room-102', courseId: 'cs102', courseName: 'Algorithms', teacherId: 't2', teacherName: 'Prof. Johnson', dayOfWeek: 'Monday', startTime: '09:00', endTime: '10:00' },
  { id: 'slot-3', roomId: 'room-201', courseId: 'cs201', courseName: 'Database Lab', teacherId: 't1', teacherName: 'Dr. Smith', dayOfWeek: 'Monday', startTime: '11:00', endTime: '13:00' },
  { id: 'slot-4', roomId: 'room-301', courseId: 'cs301', courseName: 'Software Engineering', teacherId: 't3', teacherName: 'Dr. Williams', dayOfWeek: 'Monday', startTime: '14:00', endTime: '15:30' },
  
  // Tuesday
  { id: 'slot-5', roomId: 'room-101', courseId: 'cs103', courseName: 'Operating Systems', teacherId: 't2', teacherName: 'Prof. Johnson', dayOfWeek: 'Tuesday', startTime: '10:00', endTime: '11:30' },
  { id: 'slot-6', roomId: 'room-202', courseId: 'cs202', courseName: 'Networks Lab', teacherId: 't3', teacherName: 'Dr. Williams', dayOfWeek: 'Tuesday', startTime: '14:00', endTime: '16:00' },
  
  // Wednesday
  { id: 'slot-7', roomId: 'room-101', courseId: 'cs101', courseName: 'Data Structures', teacherId: 't1', teacherName: 'Dr. Smith', dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '10:30' },
  { id: 'slot-8', roomId: 'room-301', courseId: 'cs301', courseName: 'Software Engineering', teacherId: 't3', teacherName: 'Dr. Williams', dayOfWeek: 'Wednesday', startTime: '11:00', endTime: '12:30' },
  { id: 'slot-9', roomId: 'room-102', courseId: 'cs104', courseName: 'Computer Architecture', teacherId: 't2', teacherName: 'Prof. Johnson', dayOfWeek: 'Wednesday', startTime: '14:00', endTime: '15:30' },
  
  // Thursday
  { id: 'slot-10', roomId: 'room-201', courseId: 'cs201', courseName: 'Database Lab', teacherId: 't1', teacherName: 'Dr. Smith', dayOfWeek: 'Thursday', startTime: '09:00', endTime: '11:00' },
  { id: 'slot-11', roomId: 'room-302', courseId: 'cs302', courseName: 'AI Seminar', teacherId: 't3', teacherName: 'Dr. Williams', dayOfWeek: 'Thursday', startTime: '14:00', endTime: '16:00' },
  
  // Friday
  { id: 'slot-12', roomId: 'room-101', courseId: 'cs102', courseName: 'Algorithms', teacherId: 't2', teacherName: 'Prof. Johnson', dayOfWeek: 'Friday', startTime: '09:00', endTime: '10:30' },
  { id: 'slot-13', roomId: 'room-301', courseId: 'cs103', courseName: 'Operating Systems', teacherId: 't2', teacherName: 'Prof. Johnson', dayOfWeek: 'Friday', startTime: '11:00', endTime: '12:30' },
];

const DAYS: TimetableSlot['dayOfWeek'][] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as any;

function parseTime(timeStr: string): { hours: number; minutes: number } {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return { hours, minutes };
}

function timeToMinutes(timeStr: string): number {
  const { hours, minutes } = parseTime(timeStr);
  return hours * 60 + minutes;
}

function getCurrentDayName(): TimetableSlot['dayOfWeek'] {
  const day = new Date().getDay();
  return DAYS[day] as TimetableSlot['dayOfWeek'];
}

function getCurrentTimeMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

export function getTodaySchedule(): TimetableSlot[] {
  const today = getCurrentDayName();
  return MOCK_TIMETABLE
    .filter(slot => slot.dayOfWeek === today)
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
}

export function getRoomScheduleToday(roomId: string): TimetableSlot[] {
  const today = getCurrentDayName();
  return MOCK_TIMETABLE
    .filter(slot => slot.roomId === roomId && slot.dayOfWeek === today)
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
}

export function getFreeSpaces(): FreeSpace[] {
  const currentMinutes = getCurrentTimeMinutes();
  const today = getCurrentDayName();
  
  // Weekend check - all rooms free
  const weekday = new Date().getDay();
  if (weekday === 0 || weekday === 6) {
    return MOCK_ROOMS.map(room => ({
      room,
      freeUntil: null,
      minutesRemaining: null
    }));
  }
  
  const freeSpaces: FreeSpace[] = [];
  
  for (const room of MOCK_ROOMS) {
    const roomSchedule = getRoomScheduleToday(room.id);
    
    // Find if room is currently occupied
    const currentClass = roomSchedule.find(slot => {
      const start = timeToMinutes(slot.startTime);
      const end = timeToMinutes(slot.endTime);
      return currentMinutes >= start && currentMinutes < end;
    });
    
    if (currentClass) {
      // Room is occupied, skip
      continue;
    }
    
    // Room is free - find next class
    const nextClass = roomSchedule.find(slot => {
      const start = timeToMinutes(slot.startTime);
      return start > currentMinutes;
    });
    
    if (nextClass) {
      const nextStart = timeToMinutes(nextClass.startTime);
      const minutesRemaining = nextStart - currentMinutes;
      
      const freeUntil = new Date();
      freeUntil.setHours(Math.floor(nextStart / 60), nextStart % 60, 0, 0);
      
      freeSpaces.push({
        room,
        freeUntil,
        minutesRemaining
      });
    } else {
      // Free for rest of day
      freeSpaces.push({
        room,
        freeUntil: null,
        minutesRemaining: null
      });
    }
  }
  
  // Sort by time remaining (longest free first, null = infinite)
  return freeSpaces.sort((a, b) => {
    if (a.minutesRemaining === null) return -1;
    if (b.minutesRemaining === null) return 1;
    return b.minutesRemaining - a.minutesRemaining;
  });
}

export function getFullWeekSchedule(): Record<string, TimetableSlot[]> {
  const schedule: Record<string, TimetableSlot[]> = {};
  const days: TimetableSlot['dayOfWeek'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  for (const day of days) {
    schedule[day] = MOCK_TIMETABLE
      .filter(slot => slot.dayOfWeek === day)
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
  }
  
  return schedule;
}
