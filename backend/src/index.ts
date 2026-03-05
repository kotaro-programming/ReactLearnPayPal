import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors'
import {
  User,
  Wallet,
  Payment,
  MeResponse,
  WalletsResponse,
  PaymentsResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
} from './types';
import { prisma } from "./db";

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(cors());

async function fetchUserById(userId: number): Promise<User | null> {
  const row = await prisma.user.findUnique({
    where: {id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!row) return null;

  return {
    id: row.id,
    email: row.email,
    name: row.name,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}


async function fetchWalletsByUserId(userId: number): Promise<Wallet[]> {
  const rows = await prisma.wallet.findMany({
    where: { userId },
    orderBy: { currency: "asc"},
    select: {
      id: true,
      userId: true,
      currency: true,
      balance: true,
      updatedAt: true,
    },
  });

  return rows.map((row) => ({
    id: row.id,
    userId: row.userId,
    currency: row.currency,
    balance: Number(row.balance),
    updatedAt: row.updatedAt.toISOString(),
  }));
  
}

async function fetchPaymentsByUserId(userId: number): Promise<Payment[]> {
  const rows = await prisma.payment.findMany({
    where: { userId },
    orderBy: [
      { occurredAt: "desc" },
      { id: "desc" },
    ],
    select: {
      id: true,
      userId: true,
      title: true,
      amount: true,
      currency: true,
      status: true,
      direction: true,
      occurredAt: true,
      createdAt: true,
    },
  });

  return rows.map((row) => ({
    id: row.id,
    userId: row.userId,
    title: row.title,
    amount: Number(row.amount),
    currency: row.currency,
    status: row.status,
    direction: row.direction,
    occurredAt: row.occurredAt.toISOString(),
    createdAt: row.createdAt.toISOString(),
  }));
}


const FIXED_USER_ID = 1;

app.get('/api/me', async (req: Request, res: Response<MeResponse | { error: string }>) => {
  try {
    const user = await fetchUserById(FIXED_USER_ID);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    console.error('Error in /api/me:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get(
  '/api/wallets',
  async (req: Request, res: Response<WalletsResponse | { error: string }>) => {
    try {
      const wallets = await fetchWalletsByUserId(FIXED_USER_ID);
      res.json({ wallets });
    } catch (err) {
      console.error('Error in /api/wallets:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

app.get(
  '/api/payments',
  async (req: Request, res: Response<PaymentsResponse | { error: string }>) => {
    try {
      const payments = await fetchPaymentsByUserId(FIXED_USER_ID);
      res.json({ payments });
    } catch (err) {
      console.error('Error in /api/payments:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

app.post(
  '/api/payments',
  async (
    req: Request<{}, CreatePaymentResponse | { error: string }, CreatePaymentRequest>,
    res: Response<CreatePaymentResponse | { error: string }>
  ) => {
    try {
      const { toEmail, amount, note } = req.body;

      if (!toEmail || typeof toEmail !== 'string') {
        return res.status(400).json({ error: 'toEmail is required' });
      }
      if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({ error: 'amount must be a positive number' });
      }

      const title =
        note && note.trim().length > 0 ? `${toEmail} (${note.trim()})` : toEmail;

      const row = await prisma.payment.create({
        data: {
          userId: FIXED_USER_ID,
          title,
          amount: BigInt(amount),
          currency: "JPY",
          status: "completed",
          direction: "out",
          occurredAt: new Date(),
        },
        select: {   
          id: true,
          userId: true,
          title: true,
          amount: true,
          currency: true,
          status: true,
          direction: true,
          occurredAt: true,
          createdAt: true,
        },
      });
      const payment: Payment = {
        id: row.id,
        userId: row.userId,
        title: row.title,
        amount: Number(row.amount),
        currency: row.currency,
        status: row.status,
        direction: row.direction,
        occurredAt: row.occurredAt.toISOString(),
        createdAt: row.createdAt.toISOString(),
      };
      return res.status(201).json({ payment });

    } catch (err) {
      console.error('Error in POST /api/payments:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

app.listen(PORT, () => {
  console.log(`API server (TS) is running at http://localhost:${PORT}`);
});

