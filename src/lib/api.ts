// src/lib/api.ts

// バックエンドの API が返す型（バックエンド側の定義と対応させる）
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

// 各エンドポイントのレスポンス型
export type MeResponse = {
  user: User;
};

export type WalletsResponse = {
  wallets: Wallet[];
};

export type PaymentsResponse = {
  payments: Payment[];
};

// 開発中はローカルのバックエンドに直接向ける
const API_BASE_URL = 'http://localhost:3001';

// 共通の fetch ヘルパー（エラー処理を一元化）
async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`);

  if (!res.ok) {
    // 必要に応じてステータスごとのエラーハンドリングも可能
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// 各 API ごとの関数

export async function fetchMe(): Promise<MeResponse> {
  return fetchJson<MeResponse>('/api/me');
}

export async function fetchWallets(): Promise<WalletsResponse> {
  return fetchJson<WalletsResponse>('/api/wallets');
}

export async function fetchPayments(): Promise<PaymentsResponse> {
  return fetchJson<PaymentsResponse>('/api/payments');
}
