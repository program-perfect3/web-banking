"use client"

import { ArrowUpRight, ArrowDownLeft, Repeat } from "lucide-react"
import { cryptoAssets } from "@/lib/bank-data"
import { cn } from "@/lib/utils"
import { AnimatedAmount } from "./animated-amount"

const symbolStyles: Record<string, string> = {
  BLOK: "bg-primary text-primary-foreground",
  BYTE: "bg-accent text-accent-foreground",
  USDT: "bg-secondary text-secondary-foreground",
}

export function CryptoWallet() {
  const totalValue = cryptoAssets.reduce((s, a) => s + a.amount * a.priceUsd, 0)

  return (
    <section className="pixel-card animate-pixel-rise p-5 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-pixel text-[11px] uppercase tracking-wide text-foreground">BLOK Wallet</h2>
          <p className="mt-1.5 text-xs text-muted-foreground">BLOK & BYTE assets</p>
        </div>
        <span className="border-2 border-foreground bg-accent px-2.5 py-1 font-pixel text-[8px] uppercase text-accent-foreground">
          On-chain
        </span>
      </div>

      <AnimatedAmount
        value={totalValue}
        animateOnMount
        className="mt-4 block font-pixel text-lg text-foreground tabular-nums sm:text-xl"
      />

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "Receive", icon: ArrowDownLeft },
          { label: "Send", icon: ArrowUpRight },
          { label: "Swap", icon: Repeat },
        ].map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="pixel-btn flex flex-col items-center gap-1.5 bg-card py-3 font-pixel text-[8px] uppercase text-foreground"
          >
            <Icon className="h-4 w-4 text-primary" />
            {label}
          </button>
        ))}
      </div>

      <ul className="mt-5 flex flex-col gap-2">
        {cryptoAssets.map((a) => {
          const value = a.amount * a.priceUsd
          const up = a.change24h >= 0
          return (
            <li
              key={a.id}
              className="pixel-lift flex items-center gap-3 border-2 border-foreground bg-card px-3 py-2.5"
            >
              <span
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center border-2 border-foreground font-pixel text-[8px]",
                  symbolStyles[a.symbol] ?? "bg-secondary text-secondary-foreground",
                )}
              >
                {a.symbol.slice(0, 2)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{a.name}</p>
                <p className="text-xs tabular-nums text-muted-foreground">
                  {a.amount.toLocaleString()} {a.symbol}
                </p>
              </div>
              <div className="text-right">
                <AnimatedAmount
                  value={value}
                  className="block font-pixel text-[10px] text-foreground tabular-nums"
                />
                <p
                  className={cn(
                    "font-pixel text-[8px] tabular-nums",
                    up ? "text-success" : "text-destructive",
                  )}
                >
                  {up ? "+" : ""}
                  {a.change24h}%
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
