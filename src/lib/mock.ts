export type Transaction = {
    id: string;
    date: string;
    name: string;
    amount: number;
    status: "完了" | "保留" | "返金";
};

export type Card = {
    id: string;
    brand: "Visa" | "Mastercard" | "JCB";
    last4: string;
}

export const mocBalance = 12500;

export const mackTransaction: Transaction[] = [
    { id: "T-1001", date: "2025-10-20", name: "Acme, Inc", amount: -2500, status: "完了"},
    { id: "T-1002", date: "2025-10-18", name: "Refund", amount: +2500, status: "返金"},
    { id: "T-1003", date: "2025-10-15", name: "コンビニ支払い", amount: -8000, status: "完了"},
];

export const mockCards: Card[] = [
    { id: "c-1", brand: "Visa", last4:"4242" },
    { id: "c-2", brand: "Mastercard", last4: "1234" },
];