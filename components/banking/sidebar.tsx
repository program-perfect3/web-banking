"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  Wallet,
  PiggyBank,
  Receipt,
  Settings,
  LifeBuoy,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BrandMark } from "./brand-mark"

const nav = [
  { id: "home", label: "Dashboard", icon: LayoutDashboard },
  { id: "cards", label: "Cards", icon: CreditCard },
  { id: "transfer", label: "Payments", icon: ArrowLeftRight },
  { id: "crypto", label: "BLOK Wallet", icon: Wallet },
  { id: "savings", label: "Savings", icon: PiggyBank },
  { id: "bills", label: "Bills", icon: Receipt },
]

export function Sidebar() {
  const [active, setActive] = useState("home")

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r-2 border-foreground bg-sidebar p-4 lg:flex">
      <div className="flex items-center gap-3 px-1 py-2">
        <span className="flex h-9 w-9 items-center justify-center border-2 border-foreground bg-primary text-primary-foreground pixel-shadow-sm">
          <BrandMark className="h-5 w-5" />
        </span>
        <span className="font-pixel text-sm tracking-tight text-foreground">BLOK</span>
      </div>

      <nav className="mt-7 flex flex-col gap-1.5">
        <p className="px-1 pb-2 font-pixel text-[9px] uppercase tracking-wider text-muted-foreground">Menu</p>
        {nav.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={cn(
                "flex items-center gap-3 border-2 px-3 py-2.5 text-sm font-semibold transition-all duration-150",
                isActive
                  ? "border-foreground bg-primary text-primary-foreground pixel-shadow-sm"
                  : "border-transparent text-muted-foreground hover:border-foreground hover:bg-secondary hover:text-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-[18px] w-[18px]" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-1.5">
        <button className="flex items-center gap-3 border-2 border-transparent px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:border-foreground hover:bg-secondary hover:text-foreground">
          <Settings className="h-[18px] w-[18px]" />
          Settings
        </button>
        <button className="flex items-center gap-3 border-2 border-transparent px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:border-foreground hover:bg-secondary hover:text-foreground">
          <LifeBuoy className="h-[18px] w-[18px]" />
          Support
        </button>

        <div className="mt-3 border-2 border-foreground bg-accent p-4 pixel-shadow">
          <p className="font-pixel text-[10px] uppercase leading-relaxed text-accent-foreground">Earn 4.6% APY</p>
          <p className="mt-2 text-xs leading-relaxed text-accent-foreground/80">
            Stake your BLOK directly from your wallet and grow your balance.
          </p>
          <button className="pixel-btn mt-3 w-full bg-primary px-3 py-2 font-pixel text-[9px] uppercase text-primary-foreground">
            Start staking
          </button>
        </div>
      </div>
    </aside>
  )
}
