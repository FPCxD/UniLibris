"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* --------------- Sidebar reutilizável --------------- */
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

/* --------------- Util: adicionar dias úteis (ignora sábado/domingo) --------------- */
function addBusinessDaysYYYYMMDD(dateStr, daysToAdd) {
  const d = new Date(dateStr);
  let added = 0;
  while (added < daysToAdd) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay(); // 0 dom, 6 sáb
    if (wd !== 0 && wd !== 6) added++;
  }
  return d.toISOString().slice(0, 10); // yyyy-mm-dd
}

/* --------------- Página Empréstimos --------------- */
export default function EmprestimosPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Form de empréstimo
  const today = new Date().toISOString().slice(0, 10);
  const [ra, setRa] = useState("");
  const [alunoNome, setAlunoNome] = useState("");
  const [codigoOuIsbn, setCodigoOuIsbn] = useState("");
  const [retirada, setRetirada] = useState(today);
  const [devolucao, setDevolucao] = useState(addBusinessDaysYYYYMMDD(today, 7));

  // Form de devolução
  const [codigoDevolucao, setCodigoDevolucao] = useState("");

  // Filtro de lista
  const [q, setQ] = useState("");

  // Mock de reservas ativas (ISBNs com reserva → bloqueia renovação)
  const [reservas] = useState([
    // "9780321486813"
  ]);

  // Empréstimos ativos (mock)
  const [emprestimos, setEmprestimos] = useState([
    {
      id: 1001,
      ra: "000123",
      aluno: "Maria Souza",
      titulo: "Sistemas Operacionais",
      isbn: "9780133591620",
      retirada: "2025-10-01",
      devolucao: "2025-10-10",
      renovacoes: 1, // já renovou 1x
      maxRenovacoes: 2,
    },
    {
      id: 1002,
      ra: "000456",
      aluno: "João Silva",
      titulo: "Algoritmos",
      isbn: "9780321573513",
      retirada: "2025-10-03",
      devolucao: "2025-10-14",
      renovacoes: 0,
      maxRenovacoes: 2,
    },
  ]);

  const filtrados = useMemo(() => {
    const query = q.toLowerCase();
    return emprestimos.filter((e) => {
      if (!query) return true;
      return (
        e.aluno.toLowerCase().includes(query) ||
        e.ra.toLowerCase().includes(query) ||
        e.titulo.toLowerCase().includes(query) ||
        e.isbn.toLowerCase().includes(query)
      );
    });
  }, [emprestimos, q]);

  function limparEmprestimo() {
    setRa("");
    setAlunoNome("");
    setCodigoOuIsbn("");
    setRetirada(today);
    setDevolucao(addBusinessDaysYYYYMMDD(today, 7));
  }

  function registrarEmprestimo(e) {
    e.preventDefault();
    if (!ra.trim() || !alunoNome.trim() || !codigoOuIsbn.trim()) {
      alert("Preencha RA, Nome do aluno e Livro/ISBN.");
      return;
    }
    const novo = {
      id: Date.now(),
      ra,
      aluno: alunoNome,
      titulo: `Exemplar ${codigoOuIsbn}`, // mock: depois, buscar título real do acervo por ISBN
      isbn: codigoOuIsbn,
      retirada,
      devolucao,
      renovacoes: 0,
      maxRenovacoes: 2,
    };
    setEmprestimos((prev) => [novo, ...prev]);
    limparEmprestimo();
    alert("Empréstimo registrado.");
  }

  function registrarDevolucao() {
    if (!codigoDevolucao.trim()) {
      alert("Informe o código/ISBN do exemplar a devolver.");
      return;
    }
    const alvo = emprestimos.find(
      (e) => e.isbn === codigoDevolucao || String(e.id) === codigoDevolucao,
    );
    if (!alvo) {
      alert("Empréstimo não encontrado para este código/ISBN.");
      return;
    }
    setEmprestimos((prev) => prev.filter((e) => e !== alvo));
    setCodigoDevolucao("");
    alert("Devolução registrada.");
  }

  function podeRenovar(reg) {
    const hoje = new Date().toISOString().slice(0, 10);
    const atrasado = hoje > reg.devolucao;
    const temReserva = reservas.includes(reg.isbn);
    const limite = reg.renovacoes >= reg.maxRenovacoes;
    return {
      ok: !atrasado && !temReserva && !limite,
      atrasado,
      temReserva,
      limite,
    };
  }

  function renovarEmprestimo(id) {
    const idx = emprestimos.findIndex((e) => e.id === id);
    if (idx < 0) return;
    const reg = emprestimos[idx];
    const check = podeRenovar(reg);

    if (!check.ok) {
      if (check.atrasado)
        return alert("Empréstimo em atraso. Regularize antes de renovar.");
      if (check.temReserva)
        return alert(
          "Este exemplar possui reserva ativa. Renovação bloqueada.",
        );
      if (check.limite) return alert("Limite de renovações atingido (2).");
      return;
    }

    const novaDevolucao = addBusinessDaysYYYYMMDD(reg.devolucao, 7);
    const atualizado = {
      ...reg,
      devolucao: novaDevolucao,
      renovacoes: reg.renovacoes + 1,
    };
    const nova = [...emprestimos];
    nova[idx] = atualizado;
    setEmprestimos(nova);
    alert(`Renovação confirmada. Nova devolução em ${novaDevolucao}.`);
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
          <h1 className="text-2xl font-bold">📕 Empréstimos & Devoluções</h1>
        </header>

        {/* Registro de Empréstimo */}
        <section className="bg-gray-800 rounded-md p-4 shadow space-y-3">
          <h3 className="text-xl font-semibold">Registrar Empréstimo</h3>
          <form
            className="grid grid-cols-1 md:grid-cols-4 gap-3"
            onSubmit={registrarEmprestimo}
          >
            <input
              className="p-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="RA do aluno"
              value={ra}
              onChange={(e) => setRa(e.target.value)}
            />
            <input
              className="p-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
              placeholder="Nome do aluno"
              value={alunoNome}
              onChange={(e) => setAlunoNome(e.target.value)}
            />
            <input
              className="p-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Livro (código/ISBN)"
              value={codigoOuIsbn}
              onChange={(e) => setCodigoOuIsbn(e.target.value)}
            />
            <div>
              <label className="block text-sm mb-1 text-gray-300">
                Data de retirada
              </label>
              <input
                type="date"
                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={retirada}
                onChange={(e) => {
                  setRetirada(e.target.value);
                  setDevolucao(addBusinessDaysYYYYMMDD(e.target.value, 7));
                }}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300">
                Devolução prevista
              </label>
              <input
                type="date"
                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={devolucao}
                onChange={(e) => setDevolucao(e.target.value)}
              />
            </div>
            <div className="flex items-end gap-2 md:col-span-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500"
              >
                Confirmar Empréstimo
              </button>
              <button
                type="button"
                onClick={limparEmprestimo}
                className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500"
              >
                Limpar
              </button>
            </div>
          </form>
          <p className="text-sm text-gray-400">
            Regra (mock): prazo padrão 7 dias úteis; máximo 2 renovações;
            bloqueio se houver reserva para o ISBN.
          </p>
        </section>

        {/* Registro de Devolução */}
        <section className="bg-gray-800 rounded-md p-4 shadow space-y-3">
          <h3 className="text-xl font-semibold">Registrar Devolução</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              className="p-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:col-span-2"
              placeholder="Código do empréstimo ou ISBN"
              value={codigoDevolucao}
              onChange={(e) => setCodigoDevolucao(e.target.value)}
            />
            <button
              onClick={registrarDevolucao}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500"
            >
              Confirmar Devolução
            </button>
          </div>
        </section>

        {/* Filtros da lista */}
        <section className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              className="flex-1 p-2 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar por aluno, RA, título ou ISBN"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          {/* Tabela desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full bg-gray-800 rounded-md shadow-lg min-w-[720px]">
              <thead className="bg-gray-700">
                <tr>
                  {[
                    "ID",
                    "RA",
                    "Aluno",
                    "Título",
                    "ISBN",
                    "Retirada",
                    "Devolução",
                    "Renov.",
                    "Ações",
                  ].map((th) => (
                    <th key={th} className="p-2 text-left">
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrados.map((e) => {
                  const hoje = new Date().toISOString().slice(0, 10);
                  const atrasado = hoje > e.devolucao;
                  return (
                    <tr
                      key={e.id}
                      className="border-t border-gray-700 hover:bg-gray-700 transition-colors"
                    >
                      <td className="p-2">{e.id}</td>
                      <td className="p-2">{e.ra}</td>
                      <td className="p-2">{e.aluno}</td>
                      <td className="p-2">{e.titulo}</td>
                      <td className="p-2">{e.isbn}</td>
                      <td className="p-2">{e.retirada}</td>
                      <td
                        className={`p-2 font-semibold ${atrasado ? "text-red-400" : "text-green-400"}`}
                      >
                        {e.devolucao}
                      </td>
                      <td className="p-2">
                        {e.renovacoes}/{e.maxRenovacoes}
                      </td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => renovarEmprestimo(e.id)}
                            className="px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-500"
                          >
                            Renovar
                          </button>
                          <button
                            onClick={() => {
                              setCodigoDevolucao(String(e.id));
                              registrarDevolucao();
                            }}
                            className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500"
                          >
                            Devolver
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtrados.length === 0 && (
                  <tr>
                    <td className="p-3 text-gray-400" colSpan={9}>
                      Nenhum empréstimo encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cards mobile */}
          <div className="sm:hidden grid grid-cols-1 gap-2">
            {filtrados.map((e) => {
              const hoje = new Date().toISOString().slice(0, 10);
              const atrasado = hoje > e.devolucao;
              return (
                <div
                  key={e.id}
                  className="bg-gray-800 p-3 rounded-md shadow space-y-1"
                >
                  <p className="font-semibold">{e.titulo}</p>
                  <p className="text-sm text-gray-300">
                    {e.aluno} • RA {e.ra}
                  </p>
                  <p className="text-sm">ISBN: {e.isbn}</p>
                  <p className="text-sm">Retirada: {e.retirada}</p>
                  <p
                    className={`font-semibold ${atrasado ? "text-red-400" : "text-green-400"}`}
                  >
                    Devolução: {e.devolucao}
                  </p>
                  <p className="text-sm">
                    Renovações: {e.renovacoes}/{e.maxRenovacoes}
                  </p>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => renovarEmprestimo(e.id)}
                      className="flex-1 px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-500"
                    >
                      Renovar
                    </button>
                    <button
                      onClick={() => {
                        setCodigoDevolucao(String(e.id));
                        registrarDevolucao();
                      }}
                      className="flex-1 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500"
                    >
                      Devolver
                    </button>
                  </div>
                </div>
              );
            })}
            {filtrados.length === 0 && (
              <div className="text-gray-400">Nenhum empréstimo encontrado.</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
