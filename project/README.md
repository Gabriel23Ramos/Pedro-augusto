# Pedro Augusto — Massoterapeuta

Landing page em React (Vite + Tailwind CSS) para divulgação dos serviços e agendamento de sessões.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:5173

## Build de produção

```bash
npm run build
npm run preview   # para conferir o build antes de publicar
```

## Deploy no Vercel

Opção mais simples (sem terminal):
1. Suba esta pasta para um repositório no GitHub.
2. Acesse vercel.com → **Add New Project** → importe o repositório.
3. O Vercel detecta automaticamente que é um projeto Vite — não precisa mudar nada.
4. Clique em **Deploy**.

Ou pelo terminal:
```bash
npm install -g vercel
vercel
```

## Estrutura

- `src/components/` — cada seção da página (Header, Hero, Sobre, Serviços, Benefícios, Agendamento, Footer)
- `src/assets/` — logo e foto (já com fundo transparente)
- `tailwind.config.js` — paleta de cores e tipografia da marca

## Sobre o calendário de agendamento

A seção "Agendamento" já é funcional: o cliente escolhe dia e horário, preenche o nome
e é direcionado ao WhatsApp com a mensagem pronta. Os horários "ocupados" mostrados hoje
são só um exemplo visual — quando vocês decidirem a próxima etapa, dá pra conectar isso
a uma agenda de verdade (Google Calendar, Cal.com, ou um backend próprio) para os
horários ficarem sempre atualizados de fato.

## Próximos passos sugeridos
- Trocar o número de WhatsApp/telefone se necessário (está em três arquivos: `Header.jsx`, `Hero.jsx`, `Footer.jsx`, `BookingCalendar.jsx`)
- Conectar o calendário a uma agenda real
- Adicionar domínio próprio no Vercel
