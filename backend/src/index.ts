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
import { pool } from './db';
import { pathToFileURL } from 'url';

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(cors());

async function fetchUserById(userId: number): Promise<User | null> {
  const result = await pool.query(
    `
    SELECT id, email, name, created_at, updated_at
    FROM users
    WHERE id = $1
    `,
    [userId]
  );

  if (result.rowCount === 0) {
    return null;
  }

  const row = result.rows[0];

  const user: User = {
    id: row.id,
    email: row.email,
    name: row.name,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };

  return user;
}


async function fetchWalletsByUserId(userId: number): Promise<Wallet[]> {
  const result = await pool.query(
    `
    SELECT id, user_id, currency, balance, updated_at
    FROM wallets
    WHERE user_id = $1
    ORDER BY currency
    `,
    [userId]
  );

  const wallets: Wallet[] = result.rows.map((row) => ({
    id: row.id,
    userId: row.user_id,
    currency: row.currency,
    balance: Number(row.balance),
    updatedAt: row.updated_at.toISOString(),
  }));

  return wallets;
}

async function fetchPaymentsByUserId(userId: number): Promise<Payment[]> {
  const result = await pool.query(
    `
    SELECT 
      id,
      user_id,
      title,
      amount,
      currency,
      status,
      direction,
      occurred_at,
      created_at
    FROM payments
    WHERE user_id = $1
    ORDER BY occurred_at DESC, id DESC
    `,
    [userId]
  );

  const payments: Payment[] = result.rows.map((row) => ({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    amount: Number(row.amount),
    currency: row.currency,
    status: row.status,
    direction: row.direction,
    occurredAt: row.occurred_at.toISOString(),
    createdAt: row.created_at.toISOString(),
  }));

  return payments;
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

app.listen(PORT, () => {
  console.log(`API server (TS) is running at http://localhost:${PORT}`);
});

