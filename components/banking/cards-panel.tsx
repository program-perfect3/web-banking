"use client"

import { useState } from "react"
import { Snowflake, Wifi } from "lucide-react"
import { cards as initialCards, type CardItem } from "@/lib/bank-data"
import { BrandMark } from "./brand-mark"
import { AnimatedAmount } from "./animated-amount"
import { cn } from "@/lib/utils"

const variantClasses: Record<CardItem["variant"], string> = {
  brand: "bg-primary text-primary-foreground",
  ink: "bg-foreground text-background",
  ghost: "bg-secondary text-foreground",
}

export function CardsPanel() {
  const [cards, setCards] = useState(initialCards)

  function toggleFreeze(id: string) {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, frozen: !c.frozen } : c)))
  }

  return (
    <section className="pixel-card animate-pixel-rise p-5 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-[11px] uppercase tracking-wide text-foreground">My cards</h2>
        <button className="font-pixel text-[8px] uppercase text-primary transition-opacity hover:opacity-70">
          Manage
        </button>
      </div>

      <div className="mt-4 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cards.map((card) => (
          <div
            key={card.id}
            className={cn(
              "pixel-lift relative flex aspect-[1.586/1] w-[280px] shrink-0 flex-col justify-between border-2 border-foreground p-5 pixel-shadow",
              variantClasses[card.variant],
              card.frozen && "opacity-60",
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <BrandMark className="h-6 w-6" />
                <span className="font-pixel text-[9px] uppercase">{card.label}</span>
              </div>
              <Wifi className="h-5 w-5 rotate-90 opacity-80" />
            </div>

            <div>
              <p className="font-pixel text-xs tracking-[0.12em]">{"•••• "}{card.last4}</p>
              <div className="mt-3 flex items-end justify-between gap-2">
                <div>
                  <p className="font-pixel text-[7px] uppercase tracking-wider opacity-70">Holder</p>
                  <p className="text-xs font-semibold">{card.holder}</p>
                </div>
                <div className="text-right">
                  <p className="font-pixel text-[7px] uppercase tracking-wider opacity-70">Expires</p>
                  <p className="text-xs font-semibold">{card.expiry}</p>
                </div>
                <span className="font-pixel text-[8px] uppercase">{card.network}</span>
              </div>
            </div>

            {card.frozen && (
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 border-2 border-foreground bg-background px-2 py-1 font-pixel text-[7px] uppercase text-foreground">
                <Snowflake className="h-3 w-3" />
                Frozen
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between border-2 border-foreground bg-card px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-foreground">{card.label}</p>
              <AnimatedAmount
                value={card.balance}
                className="block font-pixel text-[9px] text-muted-foreground tabular-nums"
              />
            </div>
            <button
              onClick={() => toggleFreeze(card.id)}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center border-2 border-foreground transition-colors",
                card.frozen
                  ? "bg-accent text-accent-foreground"
                  : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
              aria-label={card.frozen ? `Unfreeze ${card.label}` : `Freeze ${card.label}`}
              aria-pressed={card.frozen}
            >
              <Snowflake className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
