import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Sparkles, ShieldCheck, Ban } from "lucide-react";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import { useAdminAuth } from "../context/AdminAuthContext";
import {
  MONTH_LABELS,
  WEEKDAY_LABELS,
  TIME_SLOTS,
  startOfDay,
  formatDateKey,
  buildMonthGrid,
} from "../lib/schedule";

const SERVICES = [
  "Bambuterapia",
  "Drenagem linfática",
  "Liberação miofascial",
  "Massagem desportiva",
  "Massagem relaxante",
  "Pedras quentes",
  "Ventosaterapia",
];
const PHONE = "5584996685070";

export default function BookingCalendar() {
  const { isAdmin } = useAdminAuth();
  const today = startOfDay(new Date());
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [schedule, setSchedule] = useState({ blockedDays: [], blockedSlots: {} });
  const [busy, setBusy] = useState(false);
  const timeSlotsRef = useRef(null);

  // Real availability set by Pedro (via the hidden admin gear) — defaults to
  // fully open (every weekday, every slot) until something gets blocked.
  useEffect(() => {
    fetch("/api/schedule")
      .then((r) => r.json())
      .then(setSchedule)
      .catch(() => {});
  }, []);

  const weeks = useMemo(() => buildMonthGrid(cursor), [cursor]);

  const changeMonth = (delta) => {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));
  };

  const isSelectable = (date) => {
    if (!date) return false;
    if (date < today) return false;
    if (date.getDay() === 0) return false; // sem atendimento aos domingos
    if (!isAdmin && schedule.blockedDays.includes(formatDateKey(date))) return false;
    return true;
  };

  const isSameDay = (a, b) => a && b && a.getTime() === b.getTime();

  const selectedKey = selectedDate ? formatDateKey(selectedDate) : null;
  const dayIsBlocked = selectedKey ? schedule.blockedDays.includes(selectedKey) : false;
  const bookedForSelected = selectedKey ? schedule.blockedSlots[selectedKey] || [] : [];

  const whatsappHref = () => {
    const dateLabel = selectedDate
      ? `${selectedDate.getDate()} de ${MONTH_LABELS[selectedDate.getMonth()]}`
      : "";
    const text = `Olá, Pedro! Meu nome é ${name || "___"}. Gostaria de agendar uma sessão de ${service} para o dia ${dateLabel} às ${selectedTime}.`;
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
  };

  const canConfirm = selectedDate && selectedTime && service && name.trim().length > 1;

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

  return (
    <section id="agendamento" className="bg-mist py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          {isAdmin ? (
            <p className="flex items-center gap-1.5 text-teal tracking-[0.25em] text-xs font-semibold mb-4">
              <ShieldCheck size={13} />
              MODO ADMINISTRADOR
            </p>
          ) : (
            <p className="text-teal tracking-[0.25em] text-xs font-semibold mb-4">
              AGENDAMENTO
            </p>
          )}
          <h2 className="font-display text-3xl md:text-4xl text-navy leading-tight">
            {isAdmin ? "Gerencie seus dias e horários" : "Escolha o melhor dia e horário para você"}
          </h2>
          <p className="mt-4 text-navy/65 leading-relaxed">
            {isAdmin
              ? "Clique num dia pra bloquear/reabrir ele por inteiro, ou bloquear horários específicos. As mudanças já aparecem pros clientes na hora."
              : "Selecione uma data disponível, o horário, o serviço desejado e confirme o agendamento diretamente pelo WhatsApp."}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          {/* Calendar */}
          <div className="bg-white rounded-2xl border border-navy/10 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => changeMonth(-1)}
                aria-label="Mês anterior"
                className="h-9 w-9 grid place-items-center rounded-full border border-navy/15 text-navy/60 hover:bg-navy/5 transition-colors"
              >
                <ChevronLeft size={17} />
              </button>
              <p className="font-display text-lg text-navy">
                {MONTH_LABELS[cursor.getMonth()]} {cursor.getFullYear()}
              </p>
              <button
                onClick={() => changeMonth(1)}
                aria-label="Próximo mês"
                className="h-9 w-9 grid place-items-center rounded-full border border-navy/15 text-navy/60 hover:bg-navy/5 transition-colors"
              >
                <ChevronRight size={17} />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {WEEKDAY_LABELS.map((w, i) => (
                <div key={i} className="text-center text-xs font-semibold text-navy/40 py-1">
                  {w}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1.5">
              {weeks.flat().map((date, i) => {
                if (!date) return <div key={i} />;
                const selectable = isSelectable(date);
                const selected = isSameDay(date, selectedDate);
                const blocked = isAdmin && schedule.blockedDays.includes(formatDateKey(date));
                return (
                  <div key={i} className="flex justify-center">
                    <button
                      disabled={!selectable}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                        // On mobile/tablet the panel sits below the
                        // calendar, so bring it into view automatically.
                        if (window.innerWidth < 1024 && timeSlotsRef.current) {
                          setTimeout(() => {
                            timeSlotsRef.current?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }, 60);
                        }
                      }}
                      className={`relative h-10 w-10 rounded-full text-sm font-medium transition-colors
                        ${selected ? "bg-teal text-white" : ""}
                        ${!selected && selectable ? "text-navy hover:bg-teal-soft" : ""}
                        ${!selectable ? "text-navy/20 cursor-not-allowed" : ""}
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
              {isAdmin
                ? "Dias com um risco vermelho embaixo estão bloqueados."
                : "Não atendemos aos domingos. Datas passadas ficam indisponíveis."}
            </p>
          </div>

          {/* Right panel: booking form (customers) or management controls (admin) */}
          <div
            ref={timeSlotsRef}
            className="bg-navy rounded-2xl p-6 md:p-8 text-white flex flex-col scroll-mt-28"
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-4">
              <Clock size={16} className="text-teal-bright" />
              {selectedDate
                ? `${selectedDate.getDate()} de ${MONTH_LABELS[selectedDate.getMonth()]}`
                : "Selecione uma data"}
            </p>

            {isAdmin ? (
              <>
                <button
                  disabled={!selectedDate || busy}
                  onClick={() => toggleDay(selectedDate)}
                  className={`mb-6 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-colors disabled:opacity-30
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
                    const blocked = bookedForSelected.includes(t);
                    return (
                      <button
                        key={t}
                        disabled={!selectedDate || busy || dayIsBlocked}
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
            ) : (
              <>
                <div className="grid grid-cols-3 gap-2.5 mb-7">
                  {TIME_SLOTS.map((t) => {
                    const booked = bookedForSelected.includes(t);
                    const active = selectedTime === t;
                    return (
                      <button
                        key={t}
                        disabled={!selectedDate || booked}
                        onClick={() => setSelectedTime(t)}
                        className={`rounded-lg py-2.5 text-sm font-medium transition-colors border
                          ${active ? "bg-teal border-teal text-white" : "border-white/15 text-white/80 hover:border-teal-bright"}
                          ${booked ? "opacity-30 cursor-not-allowed line-through" : ""}
                          ${!selectedDate ? "opacity-30 cursor-not-allowed" : ""}
                        `}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>

                <label className="flex items-center gap-2 text-xs font-semibold text-white/60 mb-2">
                  <Sparkles size={13} className="text-teal-bright" />
                  QUAL SERVIÇO?
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="mb-6 rounded-lg bg-white/10 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-bright appearance-none"
                >
                  <option value="" disabled className="text-navy">
                    Selecione um serviço
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="text-navy">
                      {s}
                    </option>
                  ))}
                </select>

                <label className="text-xs font-semibold text-white/60 mb-2">SEU NOME</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como podemos te chamar?"
                  className="mb-6 rounded-lg bg-white/10 border border-white/15 px-4 py-3 text-sm placeholder:text-white/35 focus:outline-none focus:border-teal-bright"
                />

                <a
                  href={canConfirm ? whatsappHref() : undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!canConfirm}
                  onClick={(e) => !canConfirm && e.preventDefault()}
                  className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all
                    ${canConfirm ? "bg-teal hover:bg-teal-bright hover:scale-[1.02] active:scale-95 text-white shadow-lg shadow-teal/20" : "bg-white/10 text-white/40 cursor-not-allowed"}
                  `}
                >
                  <WhatsAppIcon size={16} />
                  Confirmar pelo WhatsApp
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
