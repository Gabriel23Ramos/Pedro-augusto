import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Sparkles } from "lucide-react";
import WhatsAppIcon from "./icons/WhatsAppIcon";

const WEEKDAY_LABELS = ["D", "S", "T", "Q", "Q", "S", "S"];
const MONTH_LABELS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
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

function startOfDay(d) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

// Deterministic pseudo-random "already booked" slots per day, just for a realistic preview.
function bookedSlotsFor(date) {
  const seed = date.getFullYear() * 372 + date.getMonth() * 31 + date.getDate();
  return TIME_SLOTS.filter((_, i) => (seed * (i + 7)) % 5 === 0);
}

export default function BookingCalendar() {
  const today = startOfDay(new Date());
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const timeSlotsRef = useRef(null);

  const weeks = useMemo(() => {
    const firstOfMonth = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const startOffset = firstOfMonth.getDay();
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    }
    while (cells.length % 7 !== 0) cells.push(null);

    const rows = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [cursor]);

  const changeMonth = (delta) => {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));
  };

  const isSelectable = (date) => {
    if (!date) return false;
    if (date < today) return false;
    if (date.getDay() === 0) return false; // sem atendimento aos domingos
    return true;
  };

  const isSameDay = (a, b) => a && b && a.getTime() === b.getTime();

  const bookedForSelected = selectedDate ? bookedSlotsFor(selectedDate) : [];

  const whatsappHref = () => {
    const dateLabel = selectedDate
      ? `${selectedDate.getDate()} de ${MONTH_LABELS[selectedDate.getMonth()]}`
      : "";
    const text = `Olá, Pedro! Meu nome é ${name || "___"}. Gostaria de agendar uma sessão de ${service} para o dia ${dateLabel} às ${selectedTime}.`;
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
  };

  const canConfirm = selectedDate && selectedTime && service && name.trim().length > 1;

  return (
    <section id="agendamento" className="bg-mist py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <p className="text-teal tracking-[0.25em] text-xs font-semibold mb-4">
            AGENDAMENTO
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-navy leading-tight">
            Escolha o melhor dia e horário para você
          </h2>
          <p className="mt-4 text-navy/65 leading-relaxed">
            Selecione uma data disponível, o horário, o serviço desejado e
            confirme o agendamento diretamente pelo WhatsApp.
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
                return (
                  <div key={i} className="flex justify-center">
                    <button
                      disabled={!selectable}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                        // On mobile/tablet the time-slots panel sits below the
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
                      className={`h-10 w-10 rounded-full text-sm font-medium transition-colors
                        ${selected ? "bg-teal text-white" : ""}
                        ${!selected && selectable ? "text-navy hover:bg-teal-soft" : ""}
                        ${!selectable ? "text-navy/20 cursor-not-allowed" : ""}
                      `}
                    >
                      {date.getDate()}
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 text-xs text-navy/45">
              Não atendemos aos domingos. Datas passadas ficam indisponíveis.
            </p>
          </div>

          {/* Time slots + form */}
          <div
            ref={timeSlotsRef}
            className="bg-navy rounded-2xl p-6 md:p-8 text-white flex flex-col scroll-mt-28"
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-4">
              <Clock size={16} className="text-teal-bright" />
              {selectedDate
                ? `Horários para ${selectedDate.getDate()} de ${MONTH_LABELS[selectedDate.getMonth()]}`
                : "Selecione uma data"}
            </p>

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
          </div>
        </div>
      </div>
    </section>
  );
}
