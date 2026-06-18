"use client"

import { useState } from "react"
import { transactions } from "@/lib/bank-data"
import { cn } from "@/lib/utils"
import { AnimatedAmount } from "./animated-amount"

const filters = ["All", "Income", "Expenses"] as const

export function TransactionsList() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")

  const visible = transactions.filter((t) => {
    if (filter === "Income") return t.amount > 0
    if (filter === "Expenses") return t.amount < 0
    return true
  })

  return (
    <section className="pixel-card animate-pixel-rise p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-pixel text-[11px] uppercase tracking-wide text-foreground">Transactions</h2>
        <div className="flex items-center gap-1 border-2 border-foreground bg-secondary p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 font-pixel text-[8px] uppercase transition-colors",
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {visible.map((t, i) => {
          const incoming = t.amount > 0
          return (
            <li
              key={t.id}
              className="pixel-lift flex items-center gap-3 border-2 border-foreground bg-card px-3 py-2.5 animate-pixel-rise"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span
                className={cn(
                  "inline-flex h-10 w-10 shrink-0 items-center justify-center border-2 border-foreground font-pixel text-[8px]",
                  incoming ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground",
                )}
              >
                {t.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{t.merchant}</p>
                <p className="text-xs text-muted-foreground">
                  {t.category} · {t.date}
                </p>
              </div>
              <div className="text-right">
                <AnimatedAmount
                  value={t.amount}
                  sign
                  className={cn(
                    "block font-pixel text-[10px] tabular-nums",
                    incoming ? "text-success" : "text-foreground",
                  )}
                />
                {t.status === "pending" && (
                  <span className="font-pixel text-[7px] uppercase text-muted-foreground">Pending</span>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
