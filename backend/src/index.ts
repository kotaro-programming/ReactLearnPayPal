import express, { Request, Response } from 'express';
import cors from 'cors'
import {
  User,
  Wallet,
  Payment,
  MeResponse,
  WalletsResponse,
  PaymentsResponse,
} from './types';

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(cors());

const mockUser: User = {
  id: 1,
  email: 'user@example.com',
  name: '山田太郎',
  createdAt: "2025-11-25T10:20:00Z",
  updatedAt: '2025-11-25T10:30:00Z',
};

const mockWallets: Wallet[] = [
  {
    id:1,
    userId: 1,
    currency: "JPY",
    balance: 120000,
    updatedAt: '2025-11-25T10:20:00Z',
  },
];

const mockPayments: Payment[] = [
  {
    id: 1,
    userId: 1,
    title: 'オンラインショップA',
    amount: -2500,
    currency: 'JPY',
    status: 'completed',
    direction: 'out',
    occurredAt: '2025-11-25T10:20:00Z',
    createdAt: '2025-11-25T10:21:00Z'
  },
  {
    id: 2,
    userId: 1,
    title: '送金：友人B',
    amount: -1000,
    currency: 'JPY',
    status: "pending",
    direction: 'out',
    occurredAt: '2025-11-24T08:15:00Z',
    createdAt: '2025-11-24T08:16:00Z'
  },
];

app.get('/api/me', (req: Request, res: Response<MeResponse>) => {
  res.json({ user: mockUser });
});

app.get('/api/wallets', (req: Request, res: Response<WalletsResponse>) => {
  res.json({ wallets: mockWallets });
});

app.get('/api/payments', (req: Request, res: Response<PaymentsResponse>) => {
  res.json({ payments: mockPayments });
});

app.listen(PORT, () => {
  console.log(`API server (TS) is running at http://localhost:${PORT}`);
});

