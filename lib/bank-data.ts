export type Account = {
  id: string
  name: string
  type: "Checking" | "Savings" | "Crypto"
  number: string
  balance: number
  currency: string
  delta: number // % change this month
}

export type CardItem = {
  id: string
  label: string
  holder: string
  last4: string
  expiry: string
  network: "Visa" | "Mastercard"
  variant: "brand" | "ink" | "ghost"
  balance: number
  frozen: boolean
}

export type Tx = {
  id: string
  merchant: string
  category: string
  date: string
  amount: number // negative = outgoing
  status: "completed" | "pending"
  initials: string
}

export type CryptoAsset = {
  id: string
  name: string
  symbol: string
  amount: number
  priceUsd: number
  change24h: number
}

export type Contact = {
  id: string
  name: string
  handle: string
  initials: string
}

export const accounts: Account[] = [
  { id: "main", name: "Main account", type: "Checking", number: "**** 4921", balance: 18420.55, currency: "USD", delta: 4.2 },
  { id: "save", name: "Savings vault", type: "Savings", number: "**** 7730", balance: 52800.0, currency: "USD", delta: 1.8 },
  { id: "blok", name: "BLOK wallet", type: "Crypto", number: "BK...8f2c", balance: 9314.27, currency: "USD", delta: 12.6 },
]

export const totalBalance = accounts.reduce((s, a) => s + a.balance, 0)

export const cards: CardItem[] = [
  { id: "c1", label: "BLOK Metal", holder: "ALEX MORGAN", last4: "4921", expiry: "08/28", network: "Visa", variant: "brand", balance: 18420.55, frozen: false },
  { id: "c2", label: "Everyday", holder: "ALEX MORGAN", last4: "1180", expiry: "03/27", network: "Mastercard", variant: "ink", balance: 2140.1, frozen: false },
  { id: "c3", label: "Travel", holder: "ALEX MORGAN", last4: "5562", expiry: "11/26", network: "Visa", variant: "ghost", balance: 760.42, frozen: true },
]

export const transactions: Tx[] = [
  { id: "t1", merchant: "Apple Store", category: "Electronics", date: "Today, 14:32", amount: -1299.0, status: "completed", initials: "AP" },
  { id: "t2", merchant: "Salary — Vercel Inc.", category: "Income", date: "Today, 09:00", amount: 6800.0, status: "completed", initials: "VC" },
  { id: "t3", merchant: "Spotify", category: "Subscription", date: "Yesterday", amount: -10.99, status: "completed", initials: "SP" },
  { id: "t4", merchant: "Maria Lopez", category: "Transfer", date: "Yesterday", amount: -250.0, status: "pending", initials: "ML" },
  { id: "t5", merchant: "Whole Foods", category: "Groceries", date: "Jun 16", amount: -86.43, status: "completed", initials: "WF" },
  { id: "t6", merchant: "BLOK Staking reward", category: "Crypto", date: "Jun 15", amount: 42.18, status: "completed", initials: "BK" },
  { id: "t7", merchant: "Uber", category: "Transport", date: "Jun 15", amount: -23.7, status: "completed", initials: "UB" },
  { id: "t8", merchant: "Booking.com", category: "Travel", date: "Jun 14", amount: -540.0, status: "completed", initials: "BK" },
]

export const cryptoAssets: CryptoAsset[] = [
  { id: "blok", name: "Blok", symbol: "BLOK", amount: 1240.5, priceUsd: 5.42, change24h: 6.4 },
  { id: "byte", name: "Byte", symbol: "BYTE", amount: 38200, priceUsd: 0.061, change24h: 12.9 },
  { id: "usdt", name: "Tether", symbol: "USDT", amount: 2500, priceUsd: 1.0, change24h: 0.01 },
]

export const contacts: Contact[] = [
  { id: "p1", name: "Maria Lopez", handle: "@maria", initials: "ML" },
  { id: "p2", name: "James Carter", handle: "@jcarter", initials: "JC" },
  { id: "p3", name: "Sofia Reyes", handle: "@sofia", initials: "SR" },
  { id: "p4", name: "Liam Chen", handle: "@liam", initials: "LC" },
]

// 7-month balance trend for the area chart
export const balanceTrend = [
  { month: "Jan", balance: 41200, spending: 3200 },
  { month: "Feb", balance: 44800, spending: 4100 },
  { month: "Mar", balance: 47100, spending: 2900 },
  { month: "Apr", balance: 53600, spending: 5200 },
  { month: "May", balance: 61400, spending: 3800 },
  { month: "Jun", balance: 68900, spending: 4600 },
  { month: "Jul", balance: 80534, spending: 4200 },
]

export const spendingByCategory = [
  { category: "Shopping", value: 1680, fill: "var(--color-chart-1)" },
  { category: "Travel", value: 1080, fill: "var(--color-chart-2)" },
  { category: "Food", value: 640, fill: "var(--color-chart-3)" },
  { category: "Transport", value: 320, fill: "var(--color-chart-4)" },
  { category: "Other", value: 480, fill: "var(--color-chart-5)" },
]

export function formatUsd(n: number, opts?: { sign?: boolean }) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(n))
  if (opts?.sign) return `${n < 0 ? "-" : "+"}${formatted}`
  return n < 0 ? `-${formatted}` : formatted
}
