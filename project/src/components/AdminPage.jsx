import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Lock, LogOut, Ban } from "lucide-react";
import {
  MONTH_LABELS,
  WEEKDAY_LABELS,
  TIME_SLOTS,
  startOfDay,
  formatDateKey,
  buildMonthGrid,
} from "../lib/schedule";

function LoginForm({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (r.ok) {
        onSuccess();
      } else {
        setError("Senha incorreta.");
      }
    } catch {
      setError("Não foi possível conectar. Tenta de novo.");
    } finally {
      setLoading(false);
      setPassword("");
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-navy px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs rounded-2xl border border-white/10 bg-white/5 p-8"
      >
        <div className="flex items-center gap-2 text-teal-bright mb-6">
          <Lock size={18} />
          <p className="font-display text-lg text-white">Área do administrador</p>
        </div>

        <label className="mb-2 block text-xs font-semibold text-white/60">SENHA</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mb-4 w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm text-white focus:border-teal-bright focus:outline-none"
        />

        {error && <p className="mb-4 text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-teal py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-bright disabled:opacity-50"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>

        <a
          href="/"
          className="mt-5 block text-center text-xs text-white/40 hover:text-white/70"
        >
          Voltar ao site
        </a>
      </form>
    </div>
  );
}

function Panel({ onLogout }) {
  const today = startOfDay(new Date());
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [schedule, setSchedule] = useState({ blockedDays: [], blockedSlots: {} });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/schedule")
      .then((r) => r.json())
      .then(setSchedule)
      .catch(() => {});
  }, []);

  const weeks = useMemo(() => buildMonthGrid(cursor), [cursor]);

  async function toggleDay(date) {
    const key = formatDateKey(date);
    setBusy(true);
    try {
      const r = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "day", date: key }),
      });
      if (r.ok) setSchedule(await r.json());
    } finally {
      setBusy(false);
    }
  }

  async function toggleSlot(date, time) {
    const key = formatDateKey(date);
    setBusy(true);
    try {
      const r = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "slot", date: key, time }),
      });
      if (r.ok) setSchedule(await r.json());
    } finally {
      setBusy(false);
    }
  }

  const selectedKey = selectedDate ? formatDateKey(selectedDate) : null;
  const dayIsBlocked = selectedKey ? schedule.blockedDays.includes(selectedKey) : false;
  const blockedSlotsForSelected = selectedKey ? schedule.blockedSlots[selectedKey] || [] : [];

  return (
    <div className="min-h-screen bg-mist">
      <header className="flex items-center justify-between bg-navy px-6 py-5 text-white">
        <p className="font-display text-lg">Painel de agendamentos</p>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          <LogOut size={15} />
          Sair
        </button>
      </header>

      <main className="mx-auto grid max-w-4xl gap-8 px-6 py-10 md:grid-cols-[1.1fr_0.9fr]">
        {/* Calendar */}
        <div className="rounded-2xl border border-navy/10 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
              className="grid h-9 w-9 place-items-center rounded-full border border-navy/15 text-navy/60 transition-colors hover:bg-navy/5"
            >
              <ChevronLeft size={17} />
            </button>
            <p className="font-display text-lg text-navy">
              {MONTH_LABELS[cursor.getMonth()]} {cursor.getFullYear()}
            </p>
            <button
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
              className="grid h-9 w-9 place-items-center rounded-full border border-navy/15 text-navy/60 transition-colors hover:bg-navy/5"
            >
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7">
            {WEEKDAY_LABELS.map((w, i) => (
              <div key={i} className="py-1 text-center text-xs font-semibold text-navy/40">
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1.5">
            {weeks.flat().map((date, i) => {
              if (!date) return <div key={i} />;
              const key = formatDateKey(date);
              const past = date < today;
              const blocked = schedule.blockedDays.includes(key);
              const selected = selectedKey === key;
              return (
                <div key={i} className="flex justify-center">
                  <button
                    disabled={past}
                    onClick={() => setSelectedDate(date)}
                    className={`relative h-10 w-10 rounded-full text-sm font-medium transition-colors
                      ${selected ? "bg-teal text-white" : ""}
                      ${!selected && !past ? "text-navy hover:bg-teal-soft" : ""}
                      ${past ? "text-navy/20 cursor-not-allowed" : ""}
                      ${blocked && !selected ? "text-red-400" : ""}
                    `}
                  >
                    {date.getDate()}
                    {blocked && (
                      <span className="absolute inset-x-2 bottom-1 h-[2px] bg-red-400" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-xs text-navy/45">
            Dias em vermelho estão marcados como indisponíveis. Clique num dia pra
            ajustar horários ao lado.
          </p>
        </div>

        {/* Day detail */}
        <div className="rounded-2xl bg-navy p-6 text-white">
          {!selectedDate ? (
            <p className="text-sm text-white/50">Selecione um dia no calendário.</p>
          ) : (
            <>
              <p className="mb-5 text-sm font-semibold text-white/80">
                {selectedDate.getDate()} de {MONTH_LABELS[selectedDate.getMonth()]}
              </p>

              <button
                disabled={busy}
                onClick={() => toggleDay(selectedDate)}
                className={`mb-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-colors disabled:opacity-50
                  ${dayIsBlocked ? "bg-teal hover:bg-teal-bright" : "bg-red-500/20 text-red-300 hover:bg-red-500/30"}
                `}
              >
                <Ban size={15} />
                {dayIsBlocked ? "Reabrir esse dia" : "Bloquear o dia inteiro"}
              </button>

              <p className="mb-3 text-xs font-semibold tracking-wide text-white/50">
                HORÁRIOS (clique pra bloquear/liberar)
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                {TIME_SLOTS.map((t) => {
                  const blocked = blockedSlotsForSelected.includes(t);
                  return (
                    <button
                      key={t}
                      disabled={busy || dayIsBlocked}
                      onClick={() => toggleSlot(selectedDate, t)}
                      className={`rounded-lg border py-2.5 text-sm font-medium transition-colors disabled:opacity-30
                        ${blocked ? "border-red-400/60 bg-red-500/15 text-red-300 line-through" : "border-white/15 text-white/80 hover:border-teal-bright"}
                      `}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => r.json())
      .then((d) => setAuthenticated(!!d.authenticated))
      .catch(() => {})
      .finally(() => setChecked(true));
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    setAuthenticated(false);
  }

  if (!checked) {
    return (
      <div className="grid min-h-screen place-items-center bg-navy text-sm text-white/50">
        Carregando…
      </div>
    );
  }

  if (!authenticated) {
    return <LoginForm onSuccess={() => setAuthenticated(true)} />;
  }

  return <Panel onLogout={handleLogout} />;
}
