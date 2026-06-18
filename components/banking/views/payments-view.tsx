"use client"

import { useState } from "react"
import { Send, Check, UserPlus, Trash2, ArrowUpRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useStore } from "@/components/banking/store"
import { formatUsd } from "@/lib/bank-data"
import { AnimatedAmount } from "@/components/banking/animated-amount"
import { TransactionsList } from "@/components/banking/transactions-list"
import { PageShell, PixelSection, PixelField } from "@/components/banking/ui-bits"

const presets = [25, 50, 100, 250, 500]

function TransferPanel() {
  const { contacts, sendMoney, accounts } = useStore()
  const [selected, setSelected] = useState(contacts[0]?.id ?? "")
  const [amount, setAmount] = useState("50")
  const [note, setNote] = useState("")
  const [sent, setSent] = useState(false)

  const recipient = contacts.find((c) => c.id === selected) ?? contacts[0]
  const numeric = Number.parseFloat(amount) || 0
  const checking = accounts.find((a) => a.type === "Checking")
  const insufficient = checking ? numeric > checking.balance : false
  const canSend = !!recipient && numeric > 0 && !insufficient

  function handleSend() {
    if (!canSend || !recipient) return
    sendMoney({ contact: recipient, amount: numeric, note })
    setSent(true)
    setNote("")
    setTimeout(() => setSent(false), 2000)
  }

  return (
    <PixelSection title="New transfer">
      <p className="mb-2 font-pixel text-[8px] uppercase tracking-wider text-muted-foreground">Recipient</p>
      <div className="flex items-center gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {contacts.length === 0 && (
          <p className="py-3 text-sm text-muted-foreground">Add a contact first to send money.</p>
        )}
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
                  selected === c.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
                )}
              >
                {c.initials}
              </AvatarFallback>
            </Avatar>
            <span className="max-w-14 truncate text-[11px] text-muted-foreground">{c.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <PixelField label="Amount" value={amount} onChange={setAmount} prefix="$" inputMode="decimal" placeholder="0.00" />
          <div className="mt-3 flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(String(p))}
                className={cn(
                  "border-2 border-foreground px-3 py-1.5 font-pixel text-[9px] transition-colors",
                  numeric === p ? "bg-accent text-accent-foreground" : "bg-card text-foreground hover:bg-secondary",
                )}
              >
                ${p}
              </button>
            ))}
          </div>
        </div>
        <PixelField label="Note (optional)" value={note} onChange={setNote} placeholder="Dinner, rent, gift…" />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-2 border-foreground bg-secondary p-3">
        <div>
          <p className="font-pixel text-[8px] uppercase tracking-wider text-muted-foreground">Sending</p>
          <AnimatedAmount value={numeric} className="block font-pixel text-sm text-foreground tabular-nums" />
        </div>
        <p className="text-xs text-muted-foreground">
          {checking ? `From Main · ${formatUsd(checking.balance)} available` : "No account"}
        </p>
      </div>
      {insufficient && (
        <p className="mt-2 font-pixel text-[8px] uppercase text-destructive">Insufficient balance</p>
      )}

      <button
        onClick={handleSend}
        disabled={!canSend}
        className={cn(
          "pixel-btn mt-4 inline-flex w-full items-center justify-center gap-2 px-4 py-3 font-pixel text-[10px] uppercase disabled:cursor-not-allowed disabled:opacity-50",
          sent ? "bg-success text-primary-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        {sent ? (
          <>
            <Check className="h-4 w-4" /> Sent to {recipient?.name.split(" ")[0]}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send {recipient ? `to ${recipient.name.split(" ")[0]}` : ""}
          </>
        )}
      </button>
    </PixelSection>
  )
}

function ContactsManager() {
  const { contacts, addContact, removeContact } = useStore()
  const [name, setName] = useState("")
  const [handle, setHandle] = useState("")

  function handleAdd() {
    if (!name.trim()) return
    addContact({ name, handle: handle.trim() || name.toLowerCase().replace(/\s+/g, "") })
    setName("")
    setHandle("")
  }

  return (
    <PixelSection title="Contacts">
      <div className="grid gap-3">
        <PixelField label="Name" value={name} onChange={setName} placeholder="Jordan Blake" />
        <PixelField label="Handle" value={handle} onChange={setHandle} prefix="@" placeholder="jordan" />
        <button
          onClick={handleAdd}
          disabled={!name.trim()}
          className="pixel-btn inline-flex items-center justify-center gap-2 bg-primary px-4 py-2.5 font-pixel text-[9px] uppercase text-primary-foreground disabled:opacity-50"
        >
          <UserPlus className="h-4 w-4" /> Add contact
        </button>
      </div>

      <ul className="mt-5 flex flex-col gap-2">
        {contacts.map((c, i) => (
          <li
            key={c.id}
            className="flex items-center gap-3 border-2 border-foreground bg-card px-3 py-2 animate-pixel-rise"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-foreground bg-secondary font-pixel text-[8px] text-secondary-foreground">
              {c.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{c.name}</p>
              <p className="truncate font-mono text-xs text-muted-foreground">{c.handle}</p>
            </div>
            <button
              onClick={() => removeContact(c.id)}
              aria-label={`Remove ${c.name}`}
              className="inline-flex h-8 w-8 items-center justify-center border-2 border-foreground bg-card text-muted-foreground transition-colors hover:bg-destructive hover:text-background"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
        {contacts.length === 0 && (
          <li className="border-2 border-dashed border-foreground p-4 text-center text-sm text-muted-foreground">
            No contacts yet. Add one above.
          </li>
        )}
      </ul>
    </PixelSection>
  )
}

export function PaymentsView() {
  return (
    <PageShell
      eyebrow="Payments"
      title="Send money & manage contacts"
      subtitle="Transfer funds to your people instantly, add new contacts, and review every operation below."
      actions={
        <span className="inline-flex items-center gap-2 border-2 border-foreground bg-accent px-3 py-1.5 font-pixel text-[8px] uppercase text-accent-foreground pixel-shadow-sm">
          <ArrowUpRight className="h-3.5 w-3.5" /> Instant · No fees
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TransferPanel />
        </div>
        <div>
          <ContactsManager />
        </div>
      </div>

      <div className="mt-5">
        <TransactionsList />
      </div>
    </PageShell>
  )
}
