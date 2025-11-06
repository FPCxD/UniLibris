"use client";

import { useMemo, useState } from "react";
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
export default function AcervoPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  /* ========= Formulário Normalizado ========= */
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [categoria, setCategoria] = useState("TI");
  const [quantidade, setQuantidade] = useState(1);
  const [localizacao, setLocalizacao] = useState("Estante A-3");

  /* ========= MARC 21 (ISO 2709) =========
     Importação (.mrc) + editor de texto MARC + exportação (.mrc)
  */
  const [marcText, setMarcText] = useState("");

  // Importar arquivo .mrc e preencher campos normalizados (mock de endpoint)
  const handleMarcImportFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/acervo/marc/import", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        alert("Erro ao importar MARC 21 (.mrc).");
        return;
      }
      const data = await res.json(); // { titulo, autor, isbn, categoria, marcText? }
      if (isbn && data.isbn && data.isbn !== isbn) {
        alert("⚠ Conflito de ISBN entre formulário e registro MARC.");
      }
      setTitulo(data.titulo || "");
      setAutor(data.autor || "");
      setIsbn(data.isbn || "");
      setCategoria(data.categoria || "TI");
      if (data.marcText) setMarcText(data.marcText);
      alert("MARC 21 importado e mapeado com sucesso.");
    } catch (e) {
      console.error(e);
      alert("Falha ao importar MARC 21.");
    }
  };

  // Salvar área de texto MARC (mock)
  const handleMarcSaveText = async () => {
    try {
      const res = await fetch("/api/acervo/marc/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          marc: marcText,
          titulo,
          autor,
          isbn,
          categoria,
        }),
      });
      if (res.ok) alert("Registro MARC 21 salvo com sucesso.");
      else alert("Erro ao salvar registro MARC 21.");
    } catch (e) {
      console.error(e);
      alert("Falha ao salvar registro MARC 21.");
    }
  };

  // Exportar .mrc (mock de um registro salvo com id 1)
  const handleMarcExportFile = async () => {
    try {
      const res = await fetch(`/api/acervo/1/marc/export`);
      if (!res.ok) {
        alert("Erro ao exportar MARC 21 (.mrc).");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `registro_${isbn || "sem_isbn"}.mrc`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Falha ao exportar MARC 21 (.mrc).");
    }
  };

  /* ========= Lista / Gestão do Acervo (Mock) ========= */
  const [busca, setBusca] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [livros, setLivros] = useState([
    {
      id: 1,
      titulo: "Introdução a IA",
      autor: "Ana Lima",
      categoria: "TI",
      isbn: "9781234567890",
      status: "Disponível",
      quantidade: 5,
      localizacao: "A-3",
      marcText: "",
    },
    {
      id: 2,
      titulo: "Compiladores",
      autor: "A. Aho",
      categoria: "TI",
      isbn: "9780321486813",
      status: "Emprestado",
      quantidade: 2,
      localizacao: "B-1",
      marcText: "",
    },
    {
      id: 3,
      titulo: "História Geral",
      autor: "M. Santos",
      categoria: "História",
      isbn: "9788508154038",
      status: "Disponível",
      quantidade: 3,
      localizacao: "C-2",
      marcText: "",
    },
  ]);

  const filtrados = useMemo(() => {
    const q = busca.toLowerCase();
    return livros.filter((l) => {
      const matchBusca =
        !q ||
        l.titulo.toLowerCase().includes(q) ||
        l.autor.toLowerCase().includes(q) ||
        l.isbn.toLowerCase().includes(q);
      const matchCat = !filtroCategoria || l.categoria === filtroCategoria;
      return matchBusca && matchCat;
    });
  }, [livros, busca, filtroCategoria]);

  function limparForm() {
    setTitulo("");
    setAutor("");
    setIsbn("");
    setCategoria("TI");
    setQuantidade(1);
    setLocalizacao("Estante A-3");
    setMarcText("");
  }

  function salvarLivro(e) {
    e.preventDefault();
    const normTitulo = (titulo || "").trim();
    const normAutor = (autor || "").trim();
    const normIsbn = (isbn || "").trim();

    if (!normTitulo || !normAutor || !normIsbn) {
      alert("Título, Autor e ISBN são obrigatórios.");
      return;
    }
    if (livros.some((l) => l.isbn === normIsbn)) {
      alert("ISBN já cadastrado.");
      return;
    }

    const novo = {
      id: Date.now(),
      titulo: normTitulo,
      autor: normAutor,
      categoria,
      isbn: normIsbn,
      status: "Disponível",
      quantidade: Number(quantidade) || 1,
      localizacao,
      marcText, // armazenamos o texto MARC (se houver)
    };
    setLivros((prev) => [novo, ...prev]);
    limparForm();
    alert("Livro cadastrado com sucesso.");
  }

  function editarLivro(id) {
    const l = livros.find((x) => x.id === id);
    if (!l) return;
    setTitulo(l.titulo);
    setAutor(l.autor);
    setIsbn(l.isbn);
    setCategoria(l.categoria);
    setQuantidade(l.quantidade);
    setLocalizacao(l.localizacao);
    setMarcText(l.marcText || "");
    // remove temporariamente na edição (mock simples)
    setLivros((prev) => prev.filter((x) => x.id !== id));
  }

  function removerLivro(id) {
    const l = livros.find((x) => x.id === id);
    if (l?.status === "Emprestado") {
      alert("Não é possível remover um livro emprestado.");
      return;
    }
    setLivros((prev) => prev.filter((x) => x.id !== id));
  }

  function baixarMarcText(registro) {
    const blob = new Blob([registro.marcText || ""], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `marc_text_${registro.isbn || registro.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Botão drawer mobile */}
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
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">📚 Cadastro de Livro</h1>
        </header>

        {/* ====== Seção 1: Cadastro Normalizado (sempre visível) ====== */}
        <section className="bg-gray-800 rounded-md p-4 shadow space-y-3">
          <h2 className="text-xl font-semibold">
            Cadastro Normalizado (AACR2 / FRBR / ISBD)
          </h2>
          <form
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
            onSubmit={salvarLivro}
          >
            <input
              className="p-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <input
              className="p-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
            <select
              className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="TI">TI</option>
              <option value="História">História</option>
              <option value="Literatura">Literatura</option>
              <option value="Matemática">Matemática</option>
            </select>
            <input
              className="p-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
            <input
              type="number"
              min={1}
              className="p-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
            <input
              className="p-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Localização (ex.: Estante A-3)"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
            />
            <div className="flex gap-2 md:col-span-3">
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={limparForm}
                className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500"
              >
                Limpar
              </button>
            </div>
          </form>
        </section>

        {/* ====== Seção 2: MARC 21 (ISO 2709) — Importar, Editar e Exportar ====== */}
        <section className="bg-gray-800 rounded-md p-4 shadow space-y-4">
          <h2 className="text-xl font-semibold">
            MARC 21 (ISO 2709) — Importar, Editar (texto) e Exportar
          </h2>

          {/* Upload .mrc */}
          <div>
            <label className="block text-sm mb-1">
              Importar arquivo MARC (.mrc)
            </label>
            <input
              type="file"
              accept=".mrc"
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (file) handleMarcImportFile(file);
              }}
              className="block w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-500"
            />
          </div>

          {/* Editor de texto MARC */}
          <div>
            <label className="block text-sm mb-1">Área MARC 21 (texto)</label>
            <textarea
              className="w-full h-56 p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="Insira ou edite o conteúdo MARC (texto puro). Ex.: campos/linhas conforme sua rotina de catalogação."
              value={marcText}
              onChange={(e) => setMarcText(e.target.value)}
            />
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={handleMarcSaveText}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500"
              >
                Salvar MARC (texto)
              </button>
              <button
                onClick={handleMarcExportFile}
                className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500"
              >
                Exportar .mrc
              </button>
              <button
                onClick={() => {
                  // opcional: baixar o texto MARC direto (sem converter para .mrc)
                  const blob = new Blob([marcText || ""], {
                    type: "text/plain;charset=utf-8",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `marc_text_${isbn || "sem_isbn"}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
              >
                Baixar texto MARC
              </button>
            </div>
          </div>
        </section>

        {/* ====== Seção 3: Gestão do Acervo (busca/filtro/lista) ====== */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Gestão do Acervo</h2>
            {/* exemplo de “próxima etapa” com abas/rota separada */}
            {/* <Link href="/bibliotecario/acervo/gestao" className="text-sm text-blue-400 hover:underline">
              Abrir em aba própria
            </Link> */}
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              className="flex-1 p-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar por título, autor ou ISBN"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <select
              className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              <option value="TI">TI</option>
              <option value="História">História</option>
              <option value="Literatura">Literatura</option>
              <option value="Matemática">Matemática</option>
            </select>
          </div>

          {/* Tabela desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full bg-gray-800 rounded-md shadow-lg min-w-[820px]">
              <thead className="bg-gray-700">
                <tr>
                  {[
                    "Título",
                    "Autor",
                    "Categoria",
                    "ISBN",
                    "Status",
                    "Qtd",
                    "Local",
                    "MARC (texto)",
                    "Ações",
                  ].map((th) => (
                    <th key={th} className="p-2 text-left">
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrados.map((l) => (
                  <tr
                    key={l.id}
                    className="border-t border-gray-700 hover:bg-gray-700 transition-colors"
                  >
                    <td className="p-2">{l.titulo}</td>
                    <td className="p-2">{l.autor}</td>
                    <td className="p-2">{l.categoria}</td>
                    <td className="p-2">{l.isbn}</td>
                    <td
                      className={`p-2 font-semibold ${
                        l.status === "Disponível"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {l.status}
                    </td>
                    <td className="p-2">{l.quantidade}</td>
                    <td className="p-2">{l.localizacao}</td>
                    <td className="p-2">
                      {l.marcText ? (
                        <button
                          onClick={() => baixarMarcText(l)}
                          className="px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-500"
                        >
                          Baixar texto
                        </button>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => editarLivro(l.id)}
                          className="px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-500"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => removerLivro(l.id)}
                          className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-500"
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtrados.length === 0 && (
                  <tr>
                    <td className="p-3 text-gray-400" colSpan={9}>
                      Nenhum livro encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cards mobile */}
          <div className="sm:hidden grid grid-cols-1 gap-2">
            {filtrados.map((l) => (
              <div key={l.id} className="bg-gray-800 p-3 rounded-md shadow">
                <p className="font-semibold text-lg">{l.titulo}</p>
                <p className="text-sm text-gray-300">
                  {l.autor} • {l.categoria}
                </p>
                <p className="text-sm">ISBN: {l.isbn}</p>
                <p
                  className={`font-semibold ${
                    l.status === "Disponível"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {l.status}
                </p>
                <div className="flex gap-2 mt-2">
                  {l.marcText ? (
                    <button
                      onClick={() => baixarMarcText(l)}
                      className="flex-1 px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-500"
                    >
                      Baixar texto MARC
                    </button>
                  ) : (
                    <span className="text-gray-400">Sem MARC (texto)</span>
                  )}
                  <button
                    onClick={() => editarLivro(l.id)}
                    className="flex-1 px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-500"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => removerLivro(l.id)}
                    className="flex-1 px-3 py-1 rounded-md bg-red-600 hover:bg-red-500"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
            {filtrados.length === 0 && (
              <div className="text-gray-400">Nenhum livro encontrado.</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
