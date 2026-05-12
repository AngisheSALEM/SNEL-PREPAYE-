import { Transaction, DashboardStats } from './types';

export function generateSTSToken(meterNumber: string): string {
  // Simple deterministic generation for demo purposes
  // A real STS token is much more complex
  const seed = meterNumber + Date.now().toString();
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  const absHash = Math.abs(hash).toString().padEnd(20, '0');
  const token = absHash.substring(0, 20);

  // Format as XXXX XXXX XXXX XXXX XXXX
  return token.replace(/(.{4})/g, '$1 ').trim();
}

export const mockTransactions: Transaction[] = [
  {
    id: 'TX1001',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    meterNumber: '14253647586',
    amount: 15000,
    kwh: 45.5,
    status: 'Reconciled',
    provider: 'M-PESA'
  },
  {
    id: 'TX1002',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    meterNumber: '98765432101',
    amount: 5000,
    kwh: 15.2,
    status: 'Reconciled',
    provider: 'ORANGE'
  },
  {
    id: 'TX1003',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    meterNumber: '11223344556',
    amount: 50000,
    kwh: 152.0,
    status: 'Pending',
    provider: 'AIRTEL'
  },
  {
    id: 'TX1004',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    meterNumber: '55667788990',
    amount: 10000,
    kwh: 30.4,
    status: 'Reconciled',
    provider: 'M-PESA'
  }
];

export const mockStats: DashboardStats = {
  dailyRevenue: 1250000,
  dailyKwh: 3800,
  fraudAlerts: 2,
  successRate: 98.5
};
