"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/* ---------------- Sidebar (igual à de /aluno) ---------------- */
function Sidebar({ open, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const goHome = () => {
    if (pathname !== "/aluno") router.push("/aluno");
    onClose?.();
  };

  const goConsulta = () => {
    if (pathname !== "/aluno/consultalivro")
      router.push("/aluno/consultalivro");
    onClose?.();
  };

  const goHistorico = () => {
    // sempre garante que vai para a página /aluno com a seção
    router.push("/aluno#historico");
    onClose?.();
  };

  const goNotificacoes = () => {
    router.push("/aluno#notificacoes");
    onClose?.();
  };

  const goPerfil = () => {
    router.push("/aluno/perfilaluno");
    onClose?.();
  };

  const itemClass = (hrefMatch) =>
    `px-4 py-2 text-left rounded-md transition-colors ${
      pathname === hrefMatch
        ? "bg-gray-700 text-white"
        : "hover:bg-gray-700 text-gray-200"
    }`;

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
          <button onClick={goHome} className={itemClass("/aluno")}>
            Home
          </button>
          <button
            onClick={goConsulta}
            className={itemClass("/aluno/consultalivro")}
          >
            Consulta de Livros
          </button>
          <button
            onClick={goHistorico}
            className="px-4 py-2 text-left rounded-md hover:bg-gray-700 text-gray-200"
          >
            Histórico
          </button>
          <button
            onClick={goNotificacoes}
            className="px-4 py-2 text-left rounded-md hover:bg-gray-700 text-gray-200"
          >
            Notificações
          </button>
          <button
            onClick={goPerfil}
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

/* ------------- Mock de dados (simular API) ------------- */
const MOCK_LIVROS = [
  {
    id: 1,
    titulo: "Algoritmos",
    autor: "Sedgewick & Wayne",
    categoria: "TI",
    ano: 2011,
    status: "Disponível",
    isbn: "9780321573513",
  },
  {
    id: 2,
    titulo: "Banco de Dados I",
    autor: "Autor Coletivo",
    categoria: "TI",
    ano: 2019,
    status: "Emprestado",
    isbn: "9780000000001",
  },
  {
    id: 3,
    titulo: "História do Brasil",
    autor: "Bóris Fausto",
    categoria: "História",
    ano: 2006,
    status: "Disponível",
    isbn: "9788535910235",
  },
  {
    id: 4,
    titulo: "Cálculo I",
    autor: "James Stewart",
    categoria: "Matemática",
    ano: 2013,
    status: "Emprestado",
    isbn: "9788535236991",
  },
  {
    id: 5,
    titulo: "Engenharia de Software",
    autor: "Ian Sommerville",
    categoria: "TI",
    ano: 2011,
    status: "Disponível",
    isbn: "9788577808262",
  },
  {
    id: 6,
    titulo: "Redes de Computadores",
    autor: "Tanenbaum",
    categoria: "TI",
    ano: 2010,
    status: "Disponível",
    isbn: "9788576056183",
  },
  {
    id: 7,
    titulo: "Álgebra Linear",
    autor: "Lay",
    categoria: "Matemática",
    ano: 2015,
    status: "Emprestado",
    isbn: "9788522110503",
  },
  {
    id: 8,
    titulo: "Introdução à IA",
    autor: "Russell & Norvig",
    categoria: "TI",
    ano: 2021,
    status: "Disponível",
    isbn: "9788535289652",
  },
  {
    id: 9,
    titulo: "Sistemas Operacionais",
    autor: "Silberschatz",
    categoria: "TI",
    ano: 2012,
    status: "Disponível",
    isbn: "9780133591620",
  },
  {
    id: 10,
    titulo: "Probabilidade",
    autor: "Montgomery",
    categoria: "Matemática",
    ano: 2014,
    status: "Disponível",
    isbn: "9788521621970",
  },
];

/* ------------- Página ------------- */
export default function ConsultaLivrosPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // busca com debounce
  const [busca, setBusca] = useState("");
  const [debouncedBusca, setDebouncedBusca] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedBusca(busca), 300);
    return () => clearTimeout(t);
  }, [busca]);

  // filtros
  const [categoria, setCategoria] = useState("");
  const [autor, setAutor] = useState("");
  const [disp, setDisp] = useState("");
  const [ano, setAno] = useState("");

  // ordenação e paginação
  const [ordenarPor, setOrdenarPor] = useState("titulo_asc");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const livros = MOCK_LIVROS;

  // coleções de filtros
  const autores = useMemo(
    () => Array.from(new Set(livros.map((l) => l.autor))).sort(),
    [livros],
  );
  const categorias = useMemo(
    () => Array.from(new Set(livros.map((l) => l.categoria))).sort(),
    [livros],
  );
  const anos = useMemo(
    () => Array.from(new Set(livros.map((l) => l.ano))).sort((a, b) => a - b),
    [livros],
  );

  const filtrados = useMemo(() => {
    const termo = debouncedBusca.toLowerCase().trim();
    let data = livros.filter((l) => {
      const okBusca =
        !termo ||
        l.titulo.toLowerCase().includes(termo) ||
        l.autor.toLowerCase().includes(termo) ||
        String(l.isbn).includes(termo);
      const okCat = !categoria || l.categoria === categoria;
      const okAutor = !autor || l.autor === autor;
      const okDisp = !disp || l.status === disp;
      const okAno = !ano || String(l.ano) === String(ano);
      return okBusca && okCat && okAutor && okDisp && okAno;
    });

    // ordenação
    data.sort((a, b) => {
      switch (ordenarPor) {
        case "titulo_asc":
          return a.titulo.localeCompare(b.titulo);
        case "titulo_desc":
          return b.titulo.localeCompare(a.titulo);
        case "autor_asc":
          return a.autor.localeCompare(b.autor);
        case "autor_desc":
          return b.autor.localeCompare(a.autor);
        case "ano_asc":
          return a.ano - b.ano;
        case "ano_desc":
          return b.ano - a.ano;
        default:
          return 0;
      }
    });

    return data;
  }, [livros, debouncedBusca, categoria, autor, disp, ano, ordenarPor]);

  // paginação
  const total = filtrados.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const pageData = filtrados.slice(
    (pageSafe - 1) * pageSize,
    pageSafe * pageSize,
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedBusca, categoria, autor, disp, ano, ordenarPor]);

  function solicitarEmprestimo(l) {
    if (l.status !== "Disponível") return;
    alert(`Solicitação registrada para "${l.titulo}".`);
    // futura chamada: POST /api/emprestimos/solicitar
  }

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
      <main className="flex-1 p-6 md:ml-64 space-y-6 overflow-x-hidden">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">📖 Consulta de Livros</h1>
          <p className="text-gray-400">
            Busque por título, autor, ISBN e aplique filtros.
          </p>
        </header>

        {/* Busca + Filtros */}
        <section className="bg-gray-800 rounded-md p-4 shadow space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Buscar por título, autor ou ISBN..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="flex-1 p-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Categoria</option>
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Autor</option>
              {autores.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            <select
              value={disp}
              onChange={(e) => setDisp(e.target.value)}
              className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Disponibilidade</option>
              <option value="Disponível">Disponível</option>
              <option value="Emprestado">Emprestado</option>
            </select>
            <select
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Ano</option>
              {anos.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
            <div className="flex gap-2">
              <label className="text-sm text-gray-300 self-center">
                Ordenar por:
              </label>
              <select
                value={ordenarPor}
                onChange={(e) => setOrdenarPor(e.target.value)}
                className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="titulo_asc">Título (A–Z)</option>
                <option value="titulo_desc">Título (Z–A)</option>
                <option value="autor_asc">Autor (A–Z)</option>
                <option value="autor_desc">Autor (Z–A)</option>
                <option value="ano_asc">Ano (mais antigo)</option>
                <option value="ano_desc">Ano (mais recente)</option>
              </select>
            </div>

            <div className="text-sm text-gray-400">
              {total} resultado(s)
              {total ? ` • página ${pageSafe}/${totalPages}` : ""}
            </div>
          </div>
        </section>

        {/* Tabela (desktop) */}
        <section className="hidden sm:block overflow-x-auto">
          <table className="w-full bg-gray-800 rounded-md shadow-lg min-w-[720px]">
            <thead className="bg-gray-700">
              <tr>
                {[
                  "Título",
                  "Autor",
                  "Categoria",
                  "Ano",
                  "Status",
                  "ISBN",
                  "Ação",
                ].map((th) => (
                  <th key={th} className="p-2 text-left">
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.map((l) => (
                <tr
                  key={l.id}
                  className="border-t border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  <td className="p-2">{l.titulo}</td>
                  <td className="p-2">{l.autor}</td>
                  <td className="p-2">{l.categoria}</td>
                  <td className="p-2">{l.ano}</td>
                  <td
                    className={`p-2 font-semibold ${l.status === "Disponível" ? "text-green-400" : "text-red-400"}`}
                  >
                    {l.status}
                  </td>
                  <td className="p-2">{l.isbn}</td>
                  <td className="p-2">
                    <button
                      disabled={l.status !== "Disponível"}
                      onClick={() => solicitarEmprestimo(l)}
                      className={`px-3 py-1 rounded-md font-medium transition-colors ${
                        l.status === "Disponível"
                          ? "bg-blue-600 hover:bg-blue-500 text-white"
                          : "bg-gray-600 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Solicitar Empréstimo
                    </button>
                  </td>
                </tr>
              ))}
              {pageData.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-3 text-gray-400">
                    Nenhum livro corresponde ao filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Cards (mobile) */}
        <section className="sm:hidden grid grid-cols-1 gap-2">
          {pageData.map((l) => (
            <div key={l.id} className="bg-gray-800 p-3 rounded-md shadow">
              <p className="font-semibold">{l.titulo}</p>
              <p className="text-sm">
                {l.autor} • {l.categoria} • {l.ano}
              </p>
              <p className="text-sm">ISBN: {l.isbn}</p>
              <p
                className={`font-semibold ${l.status === "Disponível" ? "text-green-400" : "text-red-400"}`}
              >
                {l.status}
              </p>
              <button
                disabled={l.status !== "Disponível"}
                onClick={() => solicitarEmprestimo(l)}
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
          {pageData.length === 0 && (
            <div className="text-gray-400">
              Nenhum livro corresponde ao filtro.
            </div>
          )}
        </section>

        {/* Paginação */}
        <section className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={pageSafe <= 1}
            className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700/50 disabled:text-gray-400"
          >
            ⬅️ Anterior
          </button>
          <span className="text-sm text-gray-300">
            Página {pageSafe} de {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={pageSafe >= totalPages}
            className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700/50 disabled:text-gray-400"
          >
            Próxima ➡️
          </button>
        </section>
      </main>
    </div>
  );
}
