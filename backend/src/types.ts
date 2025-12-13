export type User = {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Wallet = {
  id: number;
  userId: number;
  currency: 'JPY' | 'USD';
  balance: number;
  updatedAt: string;
};

export type PaymentStatus = 'completed' | 'pending' | 'failed';
export type PaymentDirection = 'in' | 'out';

export type Payment = {
  id: number;
  userId: number;
  title: string;
  amount: number;
  currency: 'JPY' | 'USD';
  status: PaymentStatus;
  direction: PaymentDirection;
  occurredAt: string;
  createdAt: string;
};

export type MeResponse = {
  user: User;
};

export type WalletsResponse = {
  wallets: Wallet[];
};

export type PaymentsResponse = {
  payments: Payment[];
};
