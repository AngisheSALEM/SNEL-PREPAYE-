export interface Transaction {
  id: string;
  timestamp: string;
  meterNumber: string;
  amount: number;
  kwh: number;
  status: 'Reconciled' | 'Pending' | 'Failed';
  provider: 'M-PESA' | 'ORANGE' | 'AIRTEL';
}

export interface DashboardStats {
  dailyRevenue: number;
  dailyKwh: number;
  fraudAlerts: number;
  successRate: number;
}
