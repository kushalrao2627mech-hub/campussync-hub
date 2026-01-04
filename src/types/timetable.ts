export interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
}

export interface TimetableSlot {
  id: string;
  roomId: string;
  courseId: string;
  courseName: string;
  teacherId: string;
  teacherName: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string; // HH:MM format
  endTime: string;   // HH:MM format
}

export interface FreeSpace {
  room: Room;
  freeUntil: Date | null; // null means free for the rest of the day
  minutesRemaining: number | null;
}
