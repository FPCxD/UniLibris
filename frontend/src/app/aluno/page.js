"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/* ---------------- Sidebar ---------------- */
function Sidebar({ open, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  // rola para seção quando estiver na /aluno; fora dela, navega com hash
  const scrollOrNavigate = (id) => {
    const section = document.getElementById(id);
    if (pathname === "/aluno" && section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      onClose?.();
    } else {
      router.push(`/aluno#${id}`);
      onClose?.();
    }
  };

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
          {/* Home */}
          <button
            onClick={() => {
              if (pathname !== "/aluno") router.push("/aluno");
              onClose?.();
            }}
            className="px-4 py-2 text-left rounded-md hover:bg-gray-700 text-gray-200"
          >
            Home
          </button>

          {/* Consulta de Livros -> ROTA /aluno/consultalivro */}
          <button
            onClick={() => {
              router.push("/aluno/consultalivro");
              onClose?.();
            }}
            className="px-4 py-2 text-left rounded-md hover:bg-gray-700 text-gray-200"
          >
            Consulta de Livros
          </button>

          {/* Histórico (rola na mesma página / navega com hash) */}
          <button
            onClick={() => scrollOrNavigate("historico")}
            className="px-4 py-2 text-left rounded-md hover:bg-gray-700 text-gray-200"
          >
            Histórico
          </button>

          {/* Notificações (rola na mesma página / navega com hash) */}
          <button
            onClick={() => scrollOrNavigate("notificacoes")}
            className="px-4 py-2 text-left rounded-md hover:bg-gray-700 text-gray-200"
          >
            Notificações
          </button>

          {/* Perfil -> ROTA /aluno/perfilaluno */}
          <button
            onClick={() => {
              router.push("/aluno/perfilaluno");
              onClose?.();
            }}
            className="px-4 py-2 text-left rounded-md hover:bg-gray-700 text-gray-200"
          >
            Perfil
          </button>

          <Link
            href="/logout"
            className="px-4 py-2 rounded-md hover:bg-gray-700 text-gray-200"
            onClick={onClose}
          >
            Logout
          </Link>
        </nav>
      </aside>
    </>
  );
}

/* ---------------- Página ---------------- */
export default function DashboardAluno() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Auto-scroll ao carregar com hash (/aluno#consulta, etc.)
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      }
    }
  }, []);

  // Filtros de consulta
  const [busca, setBusca] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroAutor, setFiltroAutor] = useState("");
  const [filtroDisponibilidade, setFiltroDisponibilidade] = useState("");

  // Mock de dados (substituir por API)
  const livros = [
    {
      id: 1,
      titulo: "Algoritmos",
      autor: "Sedgewick & Wayne",
      categoria: "TI",
      status: "Disponível",
    },
    {
      id: 2,
      titulo: "Banco de Dados I",
      autor: "Autor Coletivo",
      categoria: "TI",
      status: "Emprestado",
    },
    {
      id: 3,
      titulo: "História do Brasil",
      autor: "Bóris Fausto",
      categoria: "História",
      status: "Disponível",
    },
    {
      id: 4,
      titulo: "Cálculo I",
      autor: "Stewart",
      categoria: "Matemática",
      status: "Emprestado",
    },
  ];

  const historico = [
    {
      id: 1,
      titulo: "Linguagens Formais",
      retirada: "2025-09-01",
      devolucao: "2025-09-08",
      status: "Devolvido",
    },
    {
      id: 2,
      titulo: "Redes de Computadores",
      retirada: "2025-09-05",
      devolucao: "2025-09-12",
      status: "Atrasado",
    },
    {
      id: 3,
      titulo: "Estruturas de Dados",
      retirada: "2025-09-20",
      devolucao: "2025-09-27",
      status: "Devolvido",
    },
  ];

  const notificacoes = [
    {
      id: 1,
      tipo: "Aviso",
      mensagem: "Livro 'Redes de Computadores' vence amanhã.",
      cor: "border-yellow-500",
    },
    {
      id: 2,
      tipo: "Atraso",
      mensagem: "Livro 'Banco de Dados I' está atrasado.",
      cor: "border-red-500",
    },
  ];

  /* ----------- Derivados ----------- */
  const livrosFiltrados = useMemo(() => {
    return livros.filter((l) => {
      const okBusca =
        !busca ||
        l.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        l.autor.toLowerCase().includes(busca.toLowerCase());
      const okCategoria = !filtroCategoria || l.categoria === filtroCategoria;
      const okAutor = !filtroAutor || l.autor === filtroAutor;
      const okDisp =
        !filtroDisponibilidade || l.status === filtroDisponibilidade;
      return okBusca && okCategoria && okAutor && okDisp;
    });
  }, [livros, busca, filtroCategoria, filtroAutor, filtroDisponibilidade]);

  const cardsResumo = {
    disponiveis: livros.filter((l) => l.status === "Disponível").length,
    ativos: historico.filter((h) => h.status !== "Devolvido").length,
    notificacoes: notificacoes.length,
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Botão hambúrguer */}
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
        {/* Título em mobile */}
        <div className="md:hidden text-center">
          <h1 className="text-2xl font-bold">UniLibris – Aluno</h1>
        </div>

        {/* Cards resumo */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-md shadow">
            <h4 className="font-semibold text-lg">📚 Livros Disponíveis</h4>
            <p className="text-3xl font-bold text-green-400">
              {cardsResumo.disponiveis}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md shadow">
            <h4 className="font-semibold text-lg">📖 Empréstimos Ativos</h4>
            <p className="text-3xl font-bold text-yellow-400">
              {cardsResumo.ativos}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md shadow">
            <h4 className="font-semibold text-lg">🔔 Notificações</h4>
            <p className="text-3xl font-bold text-red-400">
              {cardsResumo.notificacoes}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md shadow">
            <h4 className="font-semibold text-lg">👤 Perfil</h4>
            <p className="text-xl font-semibold text-blue-400">Aluno</p>
          </div>
        </section>

        {/* Consulta de livros (na home, como preview/atajo) */}
        <section id="consulta" className="space-y-4">
          <h3 className="text-2xl font-semibold">📖 Consulta de Livros</h3>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Buscar por título ou autor..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="flex-1 p-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Categoria</option>
              <option value="TI">TI</option>
              <option value="História">História</option>
              <option value="Matemática">Matemática</option>
            </select>
            <select
              value={filtroAutor}
              onChange={(e) => setFiltroAutor(e.target.value)}
              className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Autor</option>
              <option value="Sedgewick & Wayne">Sedgewick & Wayne</option>
              <option value="Bóris Fausto">Bóris Fausto</option>
              <option value="Stewart">Stewart</option>
            </select>
            <select
              value={filtroDisponibilidade}
              onChange={(e) => setFiltroDisponibilidade(e.target.value)}
              className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Disponibilidade</option>
              <option value="Disponível">Disponível</option>
              <option value="Emprestado">Emprestado</option>
            </select>
          </div>

          {/* Tabela desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full bg-gray-800 rounded-md shadow-lg min-w-[560px]">
              <thead className="bg-gray-700">
                <tr>
                  {["Título", "Autor", "Categoria", "Status", "Ação"].map(
                    (th) => (
                      <th key={th} className="p-2 text-left">
                        {th}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {livrosFiltrados.map((livro) => (
                  <tr
                    key={livro.id}
                    className="border-t border-gray-700 hover:bg-gray-700 transition-colors"
                  >
                    <td className="p-2">{livro.titulo}</td>
                    <td className="p-2">{livro.autor}</td>
                    <td className="p-2">{livro.categoria}</td>
                    <td
                      className={`p-2 font-semibold ${livro.status === "Disponível" ? "text-green-400" : "text-red-400"}`}
                    >
                      {livro.status}
                    </td>
                    <td className="p-2">
                      <button
                        disabled={livro.status !== "Disponível"}
                        className={`px-3 py-1 rounded-md font-medium transition-colors ${
                          livro.status === "Disponível"
                            ? "bg-blue-600 hover:bg-blue-500 text-white"
                            : "bg-gray-600 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Solicitar Empréstimo
                      </button>
                    </td>
                  </tr>
                ))}
                {livrosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-3 text-gray-400">
                      Nenhum livro corresponde ao filtro.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cards mobile */}
          <div className="sm:hidden grid grid-cols-1 gap-2">
            {livrosFiltrados.map((l) => (
              <div key={l.id} className="bg-gray-800 p-3 rounded-md shadow">
                <p className="font-semibold">{l.titulo}</p>
                <p className="text-sm">
                  {l.autor} — {l.categoria}
                </p>
                <p
                  className={`font-semibold ${l.status === "Disponível" ? "text-green-400" : "text-red-400"}`}
                >
                  {l.status}
                </p>
                <button
                  disabled={l.status !== "Disponível"}
                  className={`mt-2 px-3 py-1 rounded-md font-medium transition-colors w-full ${
                    l.status === "Disponível"
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Solicitar Empréstimo
                </button>
              </div>
            ))}
            {livrosFiltrados.length === 0 && (
              <div className="text-gray-400">
                Nenhum livro corresponde ao filtro.
              </div>
            )}
          </div>
        </section>

        {/* Histórico */}
        <section id="historico" className="space-y-4">
          <h3 className="text-2xl font-semibold">
            📑 Histórico de Empréstimos
          </h3>
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full bg-gray-800 rounded-md shadow-lg min-w-[560px]">
              <thead className="bg-gray-700">
                <tr>
                  {["Título", "Data Retirada", "Data Devolução", "Status"].map(
                    (th) => (
                      <th key={th} className="p-2 text-left">
                        {th}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {historico.map((h) => (
                  <tr
                    key={h.id}
                    className="border-t border-gray-700 hover:bg-gray-700 transition-colors"
                  >
                    <td className="p-2">{h.titulo}</td>
                    <td className="p-2">{h.retirada}</td>
                    <td className="p-2">{h.devolucao}</td>
                    <td
                      className={`p-2 font-semibold ${h.status === "Devolvido" ? "text-green-400" : "text-red-400"}`}
                    >
                      {h.status}
                    </td>
                  </tr>
                ))}
                {historico.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-3 text-gray-400">
                      Nenhum registro.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="sm:hidden grid grid-cols-1 gap-2">
            {historico.map((h) => (
              <div key={h.id} className="bg-gray-800 p-3 rounded-md shadow">
                <p className="font-semibold">{h.titulo}</p>
                <p className="text-sm">Retirada: {h.retirada}</p>
                <p className="text-sm">Devolução: {h.devolucao}</p>
                <p
                  className={`font-semibold ${h.status === "Devolvido" ? "text-green-400" : "text-red-400"}`}
                >
                  {h.status}
                </p>
              </div>
            ))}
            {historico.length === 0 && (
              <div className="text-gray-400">Nenhum registro.</div>
            )}
          </div>
        </section>

        {/* Notificações */}
        <section id="notificacoes" className="space-y-4">
          <h3 className="text-2xl font-semibold">🔔 Notificações</h3>
          <ul className="space-y-3">
            {notificacoes.map((n) => (
              <li
                key={n.id}
                className={`p-3 bg-gray-800 border-l-4 ${n.cor} rounded-md`}
              >
                <span className="font-semibold">{n.tipo}: </span>
                {n.mensagem}
              </li>
            ))}
            {notificacoes.length === 0 && (
              <li className="text-gray-400">Sem notificações no momento.</li>
            )}
          </ul>
        </section>

        {/* Perfil (apenas informativo aqui – o menu leva para /aluno/perfilaluno) */}
        <section id="perfil" className="space-y-2">
          <h3 className="text-2xl font-semibold">👤 Perfil</h3>
          <p className="text-gray-300">aluno@fatec.sp.gov.br</p>
          <Link
            href="/aluno/perfilaluno"
            className="inline-block mt-2 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
          >
            Abrir página de Perfil
          </Link>
        </section>
      </main>
    </div>
  );
}
