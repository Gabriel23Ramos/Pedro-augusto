import { useState } from "react";
import { Lock, X } from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminLoginModal({ onClose }) {
  const { login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(password);
    setLoading(false);
    if (ok) {
      onClose();
    } else {
      setError("Senha incorreta.");
      setPassword("");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-navy/70 px-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xs rounded-2xl border border-white/10 bg-navy-deep p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 text-white/40 hover:text-white/70"
        >
          <X size={16} />
        </button>

        <div className="mb-5 flex items-center gap-2 text-teal-bright">
          <Lock size={16} />
          <p className="text-sm font-semibold text-white">Acesso administrador</p>
        </div>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="mb-3 w-full rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white focus:border-teal-bright focus:outline-none"
        />

        {error && <p className="mb-3 text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-teal py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-bright disabled:opacity-50"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
