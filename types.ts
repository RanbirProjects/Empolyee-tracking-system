
export type EmployeeRole = 'Software Engineer' | 'Field Manager' | 'Designer' | 'Sales Executive' | 'DevOps Lead' | 'Project Manager' | 'UI/UX Designer' | 'Data Analyst';

export interface AppUsage {
  name: string;
  duration: string;
  percentage: number;
  icon: string;
  color: string;
}

export interface HourlyAppStat {
  time: string;
  apps: { name: string, value: number, icon: string, color: string }[];
}

export interface EmployeeProductivity {
  id: string;
  name: string;
  avatar: string;
  role: EmployeeRole;
  totalWorkingTime: string;
  idleTime: string;
  productiveTime: string;
  productivity: number;
  leavesTaken: number;
  pendingLeaves: number;
  unpaidLeaves: number;
  // Salary fields
  baseSalary: number;
  bonus: number;
  deductions: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  location?: string;
  assigneeId: string; 
}

export interface AttendanceRecord {
  id: string;
  date: string;
  loginTime: string;
  logoutTime: string | null;
  status: 'present' | 'late' | 'half-day';
  locationName?: string;
  latLng?: { lat: number, lng: number };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'on-site' | 'offline';
  lastLocation: string;
  avatar: string;
  battery?: number;
  speed?: string;
  signal?: 'Excellent' | 'Good' | 'Poor';
  lastSeen?: string;
}

export interface EmployeeProfile {
  id: string;
  name: string;
  role: EmployeeRole;
  email: string;
  totalLeaves: number;
  leavesTaken: number;
  pendingLeaves: number;
  averageSleepScore: number;
  tasks: Task[];
  attendance: AttendanceRecord[];
  salaryHistory: any[];
}
