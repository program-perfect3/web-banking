import { Sidebar } from "@/components/banking/sidebar"
import { Topbar } from "@/components/banking/topbar"
import { BalanceSummary } from "@/components/banking/balance-summary"
import { AccountsStrip } from "@/components/banking/accounts-strip"
import { CardsPanel } from "@/components/banking/cards-panel"
import { TransactionsList } from "@/components/banking/transactions-list"
import { QuickSend } from "@/components/banking/quick-send"
import { CryptoWallet } from "@/components/banking/crypto-wallet"
import { SpendingBreakdown } from "@/components/banking/spending-breakdown"

export default function Page() {
  return (
    <div className="flex min-h-svh bg-background">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
              Welcome back, Alex
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Here&apos;s an overview of your money across accounts and the BLOK chain.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* Left / main column */}
            <div className="flex flex-col gap-5 lg:col-span-2">
              <BalanceSummary />
              <AccountsStrip />
              <CardsPanel />
              <TransactionsList />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              <QuickSend />
              <CryptoWallet />
              <SpendingBreakdown />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
