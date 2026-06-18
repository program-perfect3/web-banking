"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { spendingByCategory, formatUsd } from "@/lib/bank-data"
import { AnimatedAmount } from "./animated-amount"

export function SpendingBreakdown() {
  const total = spendingByCategory.reduce((s, c) => s + c.value, 0)

  return (
    <section className="pixel-card animate-pixel-rise p-5 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-[11px] uppercase tracking-wide text-foreground">Spending</h2>
        <span className="font-pixel text-[8px] uppercase text-muted-foreground">This month</span>
      </div>

      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-32 w-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingByCategory}
                dataKey="value"
                nameKey="category"
                innerRadius={42}
                outerRadius={62}
                paddingAngle={0}
                stroke="var(--color-foreground)"
                strokeWidth={2}
                isAnimationActive
                animationDuration={700}
              >
                {spendingByCategory.map((entry) => (
                  <Cell key={entry.category} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-pixel text-[7px] uppercase text-muted-foreground">Total</span>
            <AnimatedAmount
              value={total}
              animateOnMount
              className="block font-pixel text-[9px] text-foreground tabular-nums"
            />
          </div>
        </div>

        <ul className="flex-1 space-y-2">
          {spendingByCategory.map((c) => (
            <li key={c.category} className="flex items-center gap-2 text-sm">
              <span
                className="h-3 w-3 shrink-0 border-2 border-foreground"
                style={{ backgroundColor: c.fill }}
              />
              <span className="flex-1 text-muted-foreground">{c.category}</span>
              <span className="font-pixel text-[9px] tabular-nums text-foreground">{formatUsd(c.value)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
