"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ---------------- Sidebar ---------------- */
function Sidebar({ open, onClose }) {
  const pathname = usePathname();
  const items = [
    { href: "/bibliotecario", label: "Dashboard" },
    { href: "/bibliotecario/acervo", label: "Gestão do acervo" },
    { href: "/bibliotecario/emprestimos", label: "Empréstimos" },
    { href: "/bibliotecario/relatorios", label: "Relatórios" },
    { href: "/bibliotecario/usuarios", label: "Usuários" },
    { href: "/bibliotecario/notificacoes", label: "Notificações" },
    { href: "/logout", label: "Logout" },
  ];

  return (
    <>
      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] md:hidden transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 p-6 z-[70] transform transition-transform duration-300 md:relative md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6">UniLibris</h2>
        <nav className="flex flex-col space-y-2">
          {items.map((it) => {
            const active = pathname === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`px-4 py-2 rounded-md transition-colors ${
                  active
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-700 text-gray-200"
                }`}
                onClick={onClose}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

/* ---------------- Página ---------------- */
export default function NotificacoesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      tipo: "Devolução próxima",
      mensagem:
        "O aluno João Santos deve devolver 'Redes de Computadores' até amanhã.",
      data: "2025-10-08",
      lido: false,
    },
    {
      id: 2,
      tipo: "Atraso",
      mensagem:
        "O aluno Maria Souza está com 'Banco de Dados I' atrasado desde 05/10.",
      data: "2025-10-07",
      lido: false,
    },
    {
      id: 3,
      tipo: "Backup",
      mensagem: "Backup do servidor não foi realizado nas últimas 48h.",
      data: "2025-10-06",
      lido: true,
    },
    {
      id: 4,
      tipo: "Sistema",
      mensagem: "Nova atualização do UniLibris disponível: v1.2.4.",
      data: "2025-10-05",
      lido: true,
    },
  ]);

  /* ---------------- Funções ---------------- */
  function marcarComoLido(id) {
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lido: true } : n)),
    );
  }

  function excluirNotificacao(id) {
    setNotificacoes((prev) => prev.filter((n) => n.id !== id));
  }

  function marcarTodasComoLidas() {
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lido: true })));
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Botão mobile */}
      <button
        className="fixed top-4 left-4 z-[80] md:hidden bg-gray-800 p-2 rounded-md hover:bg-gray-700"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Abrir menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Conteúdo */}
      <main className="flex-1 p-6 md:ml-64 space-y-8 overflow-x-hidden">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl font-bold">🔔 Notificações</h1>
          <div className="flex gap-2">
            <button
              onClick={marcarTodasComoLidas}
              className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500"
            >
              Marcar todas como lidas
            </button>
          </div>
        </header>

        {/* Lista */}
        <section className="space-y-3">
          {notificacoes.length === 0 && (
            <p className="text-gray-400">Nenhuma notificação no momento.</p>
          )}

          {notificacoes.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-md shadow border-l-4 ${
                n.tipo === "Atraso"
                  ? "border-red-500 bg-gray-800/90"
                  : n.tipo === "Devolução próxima"
                    ? "border-yellow-400 bg-gray-800/90"
                    : n.tipo === "Backup"
                      ? "border-blue-400 bg-gray-800/90"
                      : "border-green-500 bg-gray-800/90"
              } ${n.lido ? "opacity-70" : "opacity-100"}`}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold">{n.tipo}</h3>
                <span className="text-sm text-gray-400">{n.data}</span>
              </div>
              <p className="text-gray-200">{n.mensagem}</p>
              <div className="flex gap-2 mt-3">
                {!n.lido && (
                  <button
                    onClick={() => marcarComoLido(n.id)}
                    className="px-3 py-1 rounded-md bg-green-600 hover:bg-green-500 text-sm"
                  >
                    Marcar como lido
                  </button>
                )}
                <button
                  onClick={() => excluirNotificacao(n.id)}
                  className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-sm"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
