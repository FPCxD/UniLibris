"use client";

import { useState, useEffect } from "react";
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

/* ---------------- Página principal ---------------- */
export default function DashboardBibliotecario() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Mock de dados (poderia vir de uma API)
  const [stats, setStats] = useState({
    emprestimosAtivos: 18,
    livrosDisponiveis: 235,
    alunosCadastrados: 412,
    notificacoesPendentes: 4,
  });

  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      tipo: "Atraso",
      mensagem: "Livro 'Engenharia de Software' atrasado (Maria Souza)",
    },
    { id: 2, tipo: "Backup", mensagem: "Backup automático pendente há 2 dias" },
    {
      id: 3,
      tipo: "Devolução próxima",
      mensagem: "Livro 'Banco de Dados' vence amanhã (João Santos)",
    },
  ]);

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

      {/* Conteúdo principal */}
      <main className="flex-1 p-6 md:ml-64 space-y-8 overflow-x-hidden">
        <header>
          <div className="md:hidden text-center">
            <h1 className="text-2xl font-bold">UniLibris – Bibliotecário</h1>
          </div>
          <p className="text-gray-400">
            Resumo geral do sistema e atividades recentes.
          </p>
        </header>

        {/* Cards de resumo */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow text-center">
            <h3 className="text-gray-400">Empréstimos Ativos</h3>
            <p className="text-3xl font-bold text-blue-400">
              {stats.emprestimosAtivos}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow text-center">
            <h3 className="text-gray-400">Livros Disponíveis</h3>
            <p className="text-3xl font-bold text-green-400">
              {stats.livrosDisponiveis}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow text-center">
            <h3 className="text-gray-400">Alunos Cadastrados</h3>
            <p className="text-3xl font-bold text-yellow-400">
              {stats.alunosCadastrados}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow text-center">
            <h3 className="text-gray-400">Notificações Pendentes</h3>
            <p className="text-3xl font-bold text-red-400">
              {stats.notificacoesPendentes}
            </p>
          </div>
        </section>

        {/* Atividades recentes / notificações */}
        <section>
          <h2 className="text-xl font-semibold mb-3">🔔 Atividades Recentes</h2>
          <div className="space-y-3">
            {notificacoes.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-md border-l-4 ${
                  n.tipo === "Atraso"
                    ? "border-red-500"
                    : n.tipo === "Backup"
                      ? "border-blue-400"
                      : "border-yellow-400"
                } bg-gray-800`}
              >
                <p className="font-semibold">{n.tipo}</p>
                <p className="text-gray-300">{n.mensagem}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ações rápidas */}
        <section>
          <h2 className="text-xl font-semibold mb-3">⚡ Ações Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/bibliotecario/acervo"
              className="bg-blue-600 hover:bg-blue-500 p-4 rounded-md text-center font-semibold"
            >
              📚 Gerenciar Acervo
            </Link>
            <Link
              href="/bibliotecario/emprestimos"
              className="bg-green-600 hover:bg-green-500 p-4 rounded-md text-center font-semibold"
            >
              🔄 Registrar Empréstimos
            </Link>
            <Link
              href="/bibliotecario/relatorios"
              className="bg-purple-600 hover:bg-purple-500 p-4 rounded-md text-center font-semibold"
            >
              📈 Ver Relatórios
            </Link>
            <Link
              href="/bibliotecario/notificacoes"
              className="bg-red-600 hover:bg-red-500 p-4 rounded-md text-center font-semibold"
            >
              🔔 Notificações
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
