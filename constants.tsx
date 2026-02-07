
import { EmployeeProfile, TeamMember, EmployeeProductivity, AppUsage, HourlyAppStat, Task } from './types';

export const TASK_TREND_DATA = [
  { day: 'Mon', completed: 4, active: 8 },
  { day: 'Tue', completed: 7, active: 6 },
  { day: 'Wed', completed: 5, active: 9 },
  { day: 'Thu', completed: 12, active: 4 },
  { day: 'Fri', completed: 8, active: 7 },
  { day: 'Sat', completed: 3, active: 2 },
  { day: 'Sun', completed: 6, active: 5 },
];

export const PRODUCTIVITY_DATA: (EmployeeProductivity & { pendingCount: number, completedCount: number })[] = [
  { id: '1', name: 'Rekha Verma', role: 'UI/UX Designer', avatar: 'Rekha', totalWorkingTime: '23:54', idleTime: '04:25', productiveTime: '19:29', productivity: 80, pendingCount: 4, completedCount: 12, leavesTaken: 5, pendingLeaves: 2, unpaidLeaves: 0, baseSalary: 7500, bonus: 450, deductions: 120 },
  { id: '2', name: 'Ms. Kennith Abernathy', role: 'Software Engineer', avatar: 'Kennith', totalWorkingTime: '19:38', idleTime: '06:03', productiveTime: '13:51', productivity: 63, pendingCount: 7, completedCount: 8, leavesTaken: 8, pendingLeaves: 3, unpaidLeaves: 1, baseSalary: 8200, bonus: 200, deductions: 150 },
  { id: '3', name: 'Anuradha Sharma', role: 'Data Analyst', avatar: 'Anuradha', totalWorkingTime: '28:43', idleTime: '02:25', productiveTime: '26:18', productivity: 93, pendingCount: 2, completedCount: 24, leavesTaken: 3, pendingLeaves: 0, unpaidLeaves: 0, baseSalary: 9000, bonus: 1200, deductions: 200 },
  { id: '4', name: 'Sunita Chauhan', role: 'Project Manager', avatar: 'Sunita', totalWorkingTime: '21:08', idleTime: '12:25', productiveTime: '08:51', productivity: 46, pendingCount: 9, completedCount: 5, leavesTaken: 12, pendingLeaves: 4, unpaidLeaves: 2, baseSalary: 9500, bonus: 0, deductions: 350 },
  { id: '5', name: 'Kalpana Kaushik', role: 'DevOps Lead', avatar: 'Kalpana', totalWorkingTime: '26:34', idleTime: '04:54', productiveTime: '21:35', productivity: 91, pendingCount: 3, completedCount: 19, leavesTaken: 4, pendingLeaves: 1, unpaidLeaves: 0, baseSalary: 8800, bonus: 850, deductions: 180 },
  { id: '6', name: 'Sarita Sharma', role: 'Designer', avatar: 'Sarita', totalWorkingTime: '12:39', idleTime: '04:25', productiveTime: '08:14', productivity: 73, pendingCount: 5, completedCount: 11, leavesTaken: 7, pendingLeaves: 2, unpaidLeaves: 1, baseSalary: 6800, bonus: 150, deductions: 100 },
];

export const MOCK_TASKS: Task[] = [
  { id: 'T1', title: 'Site Inspection: Tech Park', description: 'Safety compliance audit for Phase 2', status: 'pending', dueDate: '2024-05-20', priority: 'high', location: '7th Ave Tech Park', assigneeId: '1' },
  { id: 'T2', title: 'UI Design Refinement', description: 'Monthly project sync and asset review', status: 'completed', dueDate: '2024-05-15', priority: 'medium', location: 'Downtown Plaza', assigneeId: '1' },
  { id: 'T3', title: 'Route Optimization', description: 'Review fuel efficiency for field team', status: 'pending', dueDate: '2024-05-22', priority: 'low', assigneeId: '2' },
  { id: 'T4', title: 'Database Migration', description: 'Scale production DB cluster', status: 'pending', dueDate: '2024-05-25', priority: 'high', assigneeId: '3' },
  { id: 'T5', title: 'Client Onboarding', description: 'Walkthrough of dashboard for new enterprise client', status: 'pending', dueDate: '2024-05-21', priority: 'medium', assigneeId: '4' },
];

export const APP_USAGE_DAILY: AppUsage[] = [
  { name: 'Adobe Xd', duration: '05:38', percentage: 36, icon: 'fa-adobe', color: '#470137' },
  { name: 'Adobe Illustrator', duration: '02:41', percentage: 28, icon: 'fa-palette', color: '#330000' },
  { name: 'Google Chrome', duration: '01:52', percentage: 16, icon: 'fa-chrome', color: '#4285F4' },
  { name: 'Slack', duration: '00:36', percentage: 7, icon: 'fa-slack', color: '#4A154B' },
  { name: 'TrackWick Desktop', duration: '00:21', percentage: 4, icon: 'fa-desktop', color: '#111827' },
];

export const HOURLY_STATS: HourlyAppStat[] = [
  { time: '09:00 am', apps: [{ name: 'Xd', value: 45, icon: 'fa-adobe', color: '#4f46e5' }, { name: 'Ch', value: 15, icon: 'fa-chrome', color: '#0ea5e9' }, { name: 'Sl', value: 10, icon: 'fa-slack', color: '#f43f5e' }] },
  { time: '10:00 am', apps: [{ name: 'Ch', value: 30, icon: 'fa-chrome', color: '#0ea5e9' }, { name: 'Ai', value: 20, icon: 'fa-palette', color: '#f59e0b' }] },
  { time: '11:00 am', apps: [{ name: 'Xd', value: 25, icon: 'fa-adobe', color: '#4f46e5' }, { name: 'Ch', value: 25, icon: 'fa-chrome', color: '#0ea5e9' }] },
  { time: '12:00 pm', apps: [{ name: 'Ps', value: 50, icon: 'fa-image', color: '#2563eb' }, { name: 'Ch', value: 15, icon: 'fa-chrome', color: '#0ea5e9' }, { name: 'Sl', value: 12, icon: 'fa-slack', color: '#f43f5e' }] },
  { time: '01:00 pm', apps: [{ name: 'Sl', value: 40, icon: 'fa-slack', color: '#f43f5e' }, { name: 'Ch', value: 10, icon: 'fa-chrome', color: '#0ea5e9' }] },
  { time: '02:00 pm', apps: [{ name: 'Xd', value: 35, icon: 'fa-adobe', color: '#4f46e5' }, { name: 'Ch', value: 20, icon: 'fa-chrome', color: '#0ea5e9' }, { name: 'Sl', value: 15, icon: 'fa-slack', color: '#f43f5e' }] },
  { time: '03:00 pm', apps: [{ name: 'Ai', value: 30, icon: 'fa-palette', color: '#f59e0b' }, { name: 'Xd', value: 20, icon: 'fa-adobe', color: '#4f46e5' }, { name: 'Ps', value: 10, icon: 'fa-image', color: '#2563eb' }] },
  { time: '04:00 pm', apps: [{ name: 'Xd', value: 55, icon: 'fa-adobe', color: '#4f46e5' }, { name: 'Ch', value: 15, icon: 'fa-chrome', color: '#0ea5e9' }] },
  { time: '05:00 pm', apps: [{ name: 'Ai', value: 25, icon: 'fa-palette', color: '#f59e0b' }, { name: 'Ch', value: 35, icon: 'fa-chrome', color: '#0ea5e9' }, { name: 'Sl', value: 15, icon: 'fa-slack', color: '#f43f5e' }] },
  { time: '06:00 pm', apps: [{ name: 'Xd', value: 20, icon: 'fa-adobe', color: '#4f46e5' }, { name: 'Ch', value: 15, icon: 'fa-chrome', color: '#0ea5e9' }] },
];

export const MOCK_USER: EmployeeProfile = {
  id: 'EMP-001',
  name: 'Alex Sterling',
  role: 'Field Manager',
  email: 'alex.sterling@nexushr.com',
  totalLeaves: 25,
  leavesTaken: 12,
  pendingLeaves: 3,
  averageSleepScore: 82,
  tasks: MOCK_TASKS,
  attendance: [
    { id: 'A1', date: '2024-05-15', loginTime: '08:45 AM', logoutTime: '05:30 PM', status: 'present', locationName: 'Main Office' },
    { id: 'A2', date: '2024-05-16', loginTime: '09:15 AM', logoutTime: '06:00 PM', status: 'present', locationName: 'Tech Park Site' },
  ],
  salaryHistory: [
    { id: 'S1', month: 'April', year: 2024, baseSalary: 8500, bonus: 500, deductions: 200, netPay: 8800, status: 'paid' },
    { id: 'S2', month: 'March', year: 2024, baseSalary: 8500, bonus: 200, deductions: 200, netPay: 8500, status: 'paid' },
  ]
};

export const MOCK_TEAM: TeamMember[] = [
  { id: 'M1', name: 'Sarah Chen', role: 'Sales Lead', status: 'on-site', lastLocation: 'Central Mall', avatar: 'Sarah', battery: 84, speed: '12 km/h', signal: 'Excellent', lastSeen: '2m ago' },
  { id: 'M2', name: 'James Wilson', role: 'Operations', status: 'online', lastLocation: 'Headquarters', avatar: 'James', battery: 42, speed: '0 km/h', signal: 'Good', lastSeen: 'Just now' },
  { id: 'M3', name: 'Elena Rodriguez', role: 'Support', status: 'offline', lastLocation: 'Home Office', avatar: 'Elena', battery: 15, speed: '0 km/h', signal: 'Poor', lastSeen: '1h ago' },
  { id: 'M4', name: 'David Kim', role: 'Field Tech', status: 'on-site', lastLocation: 'Bridge Project', avatar: 'David', battery: 98, speed: '45 km/h', signal: 'Excellent', lastSeen: '5m ago' },
];

export const NAVIGATION = [
  { name: 'Dashboard', icon: 'fa-gauge-high', id: 'dashboard' },
  { name: 'Field Maps', icon: 'fa-map-location-dot', id: 'maps' },
  { name: 'Attendance', icon: 'fa-clock-rotate-left', id: 'attendance' },
  { name: 'Task Board', icon: 'fa-list-check', id: 'tasks' },
  { name: 'Salary Hub', icon: 'fa-file-invoice-dollar', id: 'salary' },
  { name: 'Leaves', icon: 'fa-calendar-day', id: 'leaves' },
];
