export type Transaction = {
  id: string;
  date: string;
  name: string;
  amount: number;   // プラス：入金、マイナス：支払い
  status: "完了" | "保留" | "返金";
};

export type Card = {
  id: string;
  brand: "Visa" | "Mastercard" | "JCB";
  last4: string;
};

export const mockBalance = 12500; // 残高（円）

export const mockTransactions: Transaction[] = [
  { id: "T-1001", date: "2025-10-20", name: "Acme, Inc.", amount: -2500, status: "完了" },
  { id: "T-1002", date: "2025-10-18", name: "Refund",     amount: +2500, status: "返金" },
  { id: "T-1003", date: "2025-10-15", name: "コンビニ支払い", amount: -800, status: "完了" },
];

export const mockCards: Card[] = [
  { id: "C-1", brand: "Visa",       last4: "4242" },
  { id: "C-2", brand: "Mastercard", last4: "1234" },
];
