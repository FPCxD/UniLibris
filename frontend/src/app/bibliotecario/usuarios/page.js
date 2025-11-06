"use client";

import { useState, useMemo } from "react";
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
      {/* Overlay para mobile */}
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
export default function UsuariosPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [busca, setBusca] = useState("");

  // Mock de dados
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nome: "Nome Sobrenome",
      email: "nome.sobrenome@cps.sp.gov.br",
      role: "bibliotecario",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "João Santos",
      email: "joao.santos@fatec.sp.gov.br",
      role: "aluno",
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Maria Souza",
      email: "maria.souza@fatec.sp.gov.br",
      role: "aluno",
      status: "Inativo",
    },
  ]);

  const filtrados = useMemo(() => {
    const termo = busca.toLowerCase();
    return usuarios.filter(
      (u) =>
        u.nome.toLowerCase().includes(termo) ||
        u.email.toLowerCase().includes(termo) ||
        u.role.toLowerCase().includes(termo),
    );
  }, [usuarios, busca]);

  /* ---------------- Funções ---------------- */
  function alternarStatus(id) {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Ativo" ? "Inativo" : "Ativo" }
          : u,
      ),
    );
  }

  function exportarCSV() {
    const header = ["Nome", "E-mail", "Função", "Status"];
    const rows = usuarios.map((u) => [u.nome, u.email, u.role, u.status]);
    const csv = [header.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "usuarios_unilibris.csv";
    a.click();
    URL.revokeObjectURL(url);
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

      <main className="flex-1 p-6 md:ml-64 space-y-8 overflow-x-hidden">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl font-bold">👥 Usuários</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar por nome, e-mail ou função"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={exportarCSV}
              className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500"
            >
              Exportar CSV
            </button>
          </div>
        </header>

        {/* Lista */}
        <section className="bg-gray-800 rounded-md p-4 shadow space-y-2">
          <h3 className="text-lg font-semibold mb-3">Lista de Usuários</h3>

          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full bg-gray-800 rounded-md shadow-lg min-w-[650px]">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-2 text-left">Nome</th>
                  <th className="p-2 text-left">E-mail</th>
                  <th className="p-2 text-left">Função</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((u) => (
                  <tr
                    key={u.id}
                    className="border-t border-gray-700 hover:bg-gray-700"
                  >
                    <td className="p-2">{u.nome}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2 capitalize">
                      {u.role === "bibliotecario" ? "Bibliotecário" : "Aluno"}
                    </td>
                    <td className="p-2">{u.status}</td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => alternarStatus(u.id)}
                        className={`px-3 py-1 rounded-md ${
                          u.status === "Ativo"
                            ? "bg-red-600 hover:bg-red-500"
                            : "bg-green-600 hover:bg-green-500"
                        }`}
                      >
                        {u.status === "Ativo" ? "Desativar" : "Ativar"}
                      </button>
                      <button className="px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-500">
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
                {filtrados.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-3 text-gray-400">
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="sm:hidden grid grid-cols-1 gap-2">
            {filtrados.map((u) => (
              <div
                key={u.id}
                className="bg-gray-800 p-3 rounded-md shadow space-y-1"
              >
                <p>
                  <strong>Nome:</strong> {u.nome}
                </p>
                <p>
                  <strong>E-mail:</strong> {u.email}
                </p>
                <p>
                  <strong>Função:</strong> {u.role}
                </p>
                <p>
                  <strong>Status:</strong> {u.status}
                </p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => alternarStatus(u.id)}
                    className={`px-3 py-1 rounded-md ${
                      u.status === "Ativo"
                        ? "bg-red-600 hover:bg-red-500"
                        : "bg-green-600 hover:bg-green-500"
                    }`}
                  >
                    {u.status === "Ativo" ? "Desativar" : "Ativar"}
                  </button>
                  <button className="px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-500">
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Botão para adicionar novo */}
        <div className="text-right">
          <button className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-500 font-semibold">
            ➕ Novo Usuário
          </button>
        </div>
      </main>
    </div>
  );
}
