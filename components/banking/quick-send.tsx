"use client"

import { useState } from "react"
import { Plus, Check, Send } from "lucide-react"
import { contacts } from "@/lib/bank-data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { AnimatedAmount } from "./animated-amount"

const presets = [25, 50, 100, 250]

export function QuickSend() {
  const [selected, setSelected] = useState(contacts[0].id)
  const [amount, setAmount] = useState(50)
  const [sent, setSent] = useState(false)

  function handleSend() {
    setSent(true)
    setTimeout(() => setSent(false), 1800)
  }

  const recipient = contacts.find((c) => c.id === selected)

  return (
    <section className="pixel-card animate-pixel-rise p-5 md:p-6">
      <h2 className="font-pixel text-[11px] uppercase tracking-wide text-foreground">Quick send</h2>

      <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          aria-label="Add recipient"
          className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-dashed border-foreground text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Plus className="h-5 w-5" />
        </button>
        {contacts.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c.id)}
            className="flex shrink-0 flex-col items-center gap-1.5"
            aria-pressed={selected === c.id}
          >
            <Avatar
              className={cn(
                "h-12 w-12 rounded-none border-2 border-foreground transition-all duration-150",
                selected === c.id ? "pixel-shadow-sm -translate-x-px -translate-y-px" : "",
              )}
            >
              <AvatarFallback
                className={cn(
                  "rounded-none font-pixel text-[9px]",
                  selected === c.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {c.initials}
              </AvatarFallback>
            </Avatar>
            <span className="max-w-14 truncate text-[11px] text-muted-foreground">{c.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      <div className="mt-5">
        <div className="border-2 border-foreground bg-secondary p-4 text-center">
          <p className="font-pixel text-[8px] uppercase tracking-wider text-muted-foreground">Amount</p>
          <AnimatedAmount
            value={amount}
            className="mt-2 block font-pixel text-base text-foreground tabular-nums sm:text-lg"
          />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setAmount(p)}
              className={cn(
                "border-2 border-foreground py-2 font-pixel text-[9px] transition-colors",
                amount === p
                  ? "bg-accent text-accent-foreground"
                  : "bg-card text-foreground hover:bg-secondary",
              )}
            >
              ${p}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSend}
        className={cn(
          "pixel-btn mt-4 inline-flex w-full items-center justify-center gap-2 px-4 py-3 font-pixel text-[10px] uppercase",
          sent ? "bg-success text-primary-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        {sent ? (
          <>
            <Check className="h-4 w-4" />
            Sent to {recipient?.name.split(" ")[0]}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send to {recipient?.name.split(" ")[0]}
          </>
        )}
      </button>
    </section>
  )
}
