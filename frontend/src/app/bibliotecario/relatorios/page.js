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
      {/* Overlay */}
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

/* ---------------- Helpers ---------------- */
function formatBR(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
function inRange(dateStr, de, ate) {
  return (!de || dateStr >= de) && (!ate || dateStr <= ate);
}
function toDays(iso) {
  return new Date(iso).toISOString().slice(0, 10);
}
const ORDER_TURNO = { Manhã: 0, Tarde: 1, Noite: 2 };

function statusEmprestimo(reg) {
  if (reg.devolvido) return "Devolvido";
  const hoje = toDays(new Date().toISOString().slice(0, 10));
  if (hoje > reg.devolucao) return "Atrasado";
  return "Emprestado";
}

/* ---------------- Página ---------------- */
export default function RelatoriosPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Filtros
  const [de, setDe] = useState("2025-08-01");
  const [ate, setAte] = useState("2025-08-31");
  const [turno, setTurno] = useState("Todos");
  const [tipo, setTipo] = useState("mais_emprestados_periodo"); // mais_emprestados_periodo | pendencias | atividade

  // Formato de exportação
  const [exportFormat, setExportFormat] = useState("detalhado"); // detalhado | tabela

  // Dados mock (cada item = um empréstimo)
  const dados = [
    {
      titulo: "Sistemas Operacionais",
      autor: "Abraham Silberschatz",
      categoria: "TI",
      isbn: "9780133591620",
      aluno: "Ana Lima",
      retirada: "2025-08-02",
      devolucao: "2025-08-14",
      devolvido: true,
      turno: "Manhã",
    },
    {
      titulo: "Sistemas Operacionais",
      autor: "Abraham Silberschatz",
      categoria: "TI",
      isbn: "9780133591620",
      aluno: "João Santos",
      retirada: "2025-08-10",
      devolucao: "2025-08-21",
      devolvido: false,
      turno: "Tarde",
    },
    {
      titulo: "Algoritmos",
      autor: "Sedgewick & Wayne",
      categoria: "TI",
      isbn: "9780321573513",
      aluno: "Maria Souza",
      retirada: "2025-08-03",
      devolucao: "2025-08-16",
      devolvido: true,
      turno: "Noite",
    },
    {
      titulo: "Algoritmos",
      autor: "Sedgewick & Wayne",
      categoria: "TI",
      isbn: "9780321573513",
      aluno: "Carlos Lima",
      retirada: "2025-08-04",
      devolucao: "2025-08-17",
      devolvido: false,
      turno: "Manhã",
    },
    {
      titulo: "BD I",
      autor: "Autor Coletivo",
      categoria: "TI",
      isbn: "9780000000001",
      aluno: "Lia Prado",
      retirada: "2025-08-15",
      devolucao: "2025-08-28",
      devolvido: false,
      turno: "Noite",
    },
    {
      titulo: "BD I",
      autor: "Autor Coletivo",
      categoria: "TI",
      isbn: "9780000000001",
      aluno: "Ana Lima",
      retirada: "2025-08-20",
      devolucao: "2025-09-02",
      devolvido: false,
      turno: "Manhã",
    },
  ];

  const filtrados = useMemo(() => {
    return dados.filter((r) => {
      const okTurno = turno === "Todos" || r.turno === turno;
      const okPeriodo = inRange(r.retirada, de, ate);
      return okTurno && okPeriodo;
    });
  }, [dados, de, ate, turno]);

  // Tabela (apresentação na tela)
  const tabela = useMemo(() => {
    if (tipo === "mais_emprestados_periodo") {
      // agrega por Título + Turno e lista alunos
      const map = new Map();
      filtrados.forEach((r) => {
        const key = `${r.titulo}||${r.turno}`;
        const curr = map.get(key) || {
          titulo: r.titulo,
          turno: r.turno,
          emprestimos: 0,
          alunos: new Set(),
        };
        curr.emprestimos += 1;
        curr.alunos.add(r.aluno);
        map.set(key, curr);
      });
      const rows = Array.from(map.values())
        .map((o) => ({ ...o, alunos: Array.from(o.alunos).join(", ") }))
        .sort((a, b) => {
          if (b.emprestimos !== a.emprestimos)
            return b.emprestimos - a.emprestimos;
          const ta = ORDER_TURNO[a.turno] ?? 99;
          const tb = ORDER_TURNO[b.turno] ?? 99;
          if (ta !== tb) return ta - tb;
          return a.titulo.localeCompare(b.titulo);
        });
      return {
        header: [
          "Título",
          "Turno",
          "Quantidade de empréstimos",
          "Nome do aluno",
        ],
        rows,
      };
    }

    if (tipo === "pendencias") {
      const hoje = toDays(new Date().toISOString().slice(0, 10));
      const rows = filtrados
        .filter((r) => !r.devolvido)
        .map((r) => ({
          titulo: r.titulo,
          aluno: r.aluno,
          devolucao: r.devolucao,
          status: hoje > r.devolucao ? "Atrasado" : "Pendente",
        }))
        .sort((a, b) => a.devolucao.localeCompare(b.devolucao));
      return { header: ["Título", "Aluno", "Devolução", "Status"], rows };
    }

    if (tipo === "atividade") {
      const map = new Map();
      filtrados.forEach((r) => {
        const k = r.retirada;
        map.set(k, (map.get(k) || 0) + 1);
      });
      const rows = Array.from(map.entries())
        .map(([dia, qtd]) => ({ dia, qtd }))
        .sort((a, b) => a.dia.localeCompare(b.dia));
      return { header: ["Dia", "Empréstimos"], rows };
    }

    return { header: [], rows: [] };
  }, [filtrados, tipo]);

  // Dados detalhados para exportação (sempre as colunas pedidas)
  const detalhado = useMemo(() => {
    const header = [
      "Aluno",
      "Título",
      "Autor",
      "Categoria",
      "Status",
      "ISBN",
      "Dia",
      "Período",
    ];
    const rows = filtrados.map((r) => ({
      aluno: r.aluno,
      titulo: r.titulo,
      autor: r.autor,
      categoria: r.categoria,
      status: statusEmprestimo(r),
      isbn: r.isbn,
      dia: r.retirada,
      periodo: r.turno,
    }));
    return { header, rows };
  }, [filtrados]);

  // Mini gráfico (apenas informativo)
  const chartData = useMemo(() => {
    if (tipo === "mais_emprestados_periodo") {
      // pequena visualização: top 6 por (título, turno)
      const list = tabela.rows.slice(0, 6);
      return list.map((r) => ({
        label: `${r.titulo} (${r.turno})`,
        value: r.emprestimos,
      }));
    }
    if (tipo === "atividade") {
      return tabela.rows.map((r) => ({ label: formatBR(r.dia), value: r.qtd }));
    }
    return [];
  }, [tabela, tipo]);

  const maxValue = chartData.reduce((m, r) => Math.max(m, r.value), 0) || 1;

  /* ---------------- Exportações ---------------- */
  function mapKey(h) {
    const map = {
      // tabela atual
      Título: "titulo",
      Turno: "turno",
      "Quantidade de empréstimos": "emprestimos",
      "Nome do aluno": "alunos",
      Aluno: "aluno",
      Devolução: "devolucao",
      Status: "status",
      Dia: "dia",
      Empréstimos: "qtd",
      // detalhado
      Autor: "autor",
      Categoria: "categoria",
      ISBN: "isbn",
      Período: "periodo",
    };
    return map[h] || h;
  }

  function getCurrentExport() {
    return exportFormat === "detalhado" ? detalhado : tabela;
  }

  function exportarCSV() {
    const data = getCurrentExport();
    if (!data || !data.header?.length) {
      alert("Nada para exportar.");
      return;
    }
    const header = data.header;
    const rows = data.rows.map((r) =>
      header.map((h) => {
        const key = mapKey(h);
        const val = r[key];
        return h === "Dia" || h === "Devolução"
          ? formatBR(val)
          : String(val ?? "");
      }),
    );
    const csv = [header.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio_${exportFormat}_${de}_${ate}_${turno}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function exportarPDF() {
    const data = getCurrentExport();
    if (!data || !data.header?.length) {
      alert("Nada para exportar.");
      return;
    }
    const { default: jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF();
    const tituloRel =
      exportFormat === "detalhado"
        ? "Empréstimos – Detalhado"
        : tipo === "mais_emprestados_periodo"
          ? "Livros mais emprestados por período"
          : tipo === "pendencias"
            ? "Empréstimos pendentes/atrasados"
            : "Atividade por dia";

    doc.setFontSize(16);
    doc.text(`UniLibris – ${tituloRel}`, 14, 18);
    doc.setFontSize(11);
    doc.text(
      `Período: ${formatBR(de)} a ${formatBR(ate)} • Turno: ${turno}`,
      14,
      26,
    );

    const header = data.header;
    const body = data.rows.map((r) =>
      header.map((h) => {
        const key = mapKey(h);
        const val = r[key];
        return h === "Dia" || h === "Devolução"
          ? formatBR(val)
          : String(val ?? "");
      }),
    );

    autoTable(doc, {
      startY: 34,
      head: [header],
      body,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [31, 41, 55] },
    });

    doc.save(`relatorio_${exportFormat}_${de}_${ate}_${turno}.pdf`);
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
          <h1 className="text-2xl font-bold">📊 Relatórios & Exportação</h1>
        </header>

        {/* Filtros */}
        <section className="bg-gray-800 rounded-md p-4 shadow space-y-3">
          <h3 className="text-xl font-semibold">Filtros</h3>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
            <div>
              <label className="block text-sm mb-1">De</label>
              <input
                type="date"
                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={de}
                onChange={(e) => setDe(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Até</label>
              <input
                type="date"
                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ate}
                onChange={(e) => setAte(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Turno</label>
              <select
                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={turno}
                onChange={(e) => setTurno(e.target.value)}
              >
                <option>Todos</option>
                <option>Manhã</option>
                <option>Tarde</option>
                <option>Noite</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Tipo de relatório</label>
              <select
                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="mais_emprestados_periodo">
                  Livros mais emprestados por período
                </option>
                <option value="pendencias">Pendências/Atrasos</option>
                <option value="atividade">Atividade por dia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">
                Formato de exportação
              </label>
              <select
                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
              >
                <option value="detalhado">
                  Detalhado (Aluno, Título, Autor, Categoria, Status, ISBN, Dia,
                  Período)
                </option>
                <option value="tabela">Tabela atual</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={exportarPDF}
              className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500"
            >
              Exportar PDF
            </button>
            <button
              onClick={exportarCSV}
              className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500"
            >
              Exportar CSV
            </button>
          </div>
        </section>

        {/* Mini gráfico (informativo) */}
        {chartData.length > 0 && (
          <section className="bg-gray-800 rounded-md p-4 shadow">
            <h3 className="text-lg font-semibold mb-3">
              {tipo === "atividade"
                ? "Atividade por dia (empréstimos)"
                : "Top por título/turno (amostra)"}
            </h3>
            <div className="space-y-2">
              {chartData.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span className="truncate pr-2">{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded">
                    <div
                      className="h-3 bg-blue-600 rounded"
                      style={{ width: `${(item.value / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tabela principal (apresentação) */}
        <section>
          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full bg-gray-800 rounded-md shadow-lg min-w-[700px]">
              <thead className="bg-gray-700">
                <tr>
                  {tabela.header.map((th) => (
                    <th key={th} className="p-2 text-left">
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tabela.rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-gray-700 hover:bg-gray-700 transition-colors"
                  >
                    {tabela.header.map((h) => {
                      const key =
                        h === "Devolução"
                          ? "devolucao"
                          : h === "Título"
                            ? "titulo"
                            : h === "Dia"
                              ? "dia"
                              : h === "Empréstimos"
                                ? "qtd"
                                : h === "Aluno"
                                  ? "aluno"
                                  : h === "Turno"
                                    ? "turno"
                                    : h === "Quantidade de empréstimos"
                                      ? "emprestimos"
                                      : h === "Nome do aluno"
                                        ? "alunos"
                                        : "status";
                      const val = row[key];
                      return (
                        <td key={`${idx}-${h}`} className="p-2">
                          {h === "Devolução" || h === "Dia"
                            ? formatBR(val)
                            : String(val)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {tabela.rows.length === 0 && (
                  <tr>
                    <td
                      className="p-3 text-gray-400"
                      colSpan={tabela.header.length}
                    >
                      Nenhum dado no período/turno selecionado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="sm:hidden grid grid-cols-1 gap-2">
            {tabela.rows.map((row, idx) => (
              <div key={idx} className="bg-gray-800 p-3 rounded-md shadow">
                {tabela.header.map((h) => {
                  const key =
                    h === "Devolução"
                      ? "devolucao"
                      : h === "Título"
                        ? "titulo"
                        : h === "Dia"
                          ? "dia"
                          : h === "Empréstimos"
                            ? "qtd"
                            : h === "Aluno"
                              ? "aluno"
                              : h === "Turno"
                                ? "turno"
                                : h === "Quantidade de empréstimos"
                                  ? "emprestimos"
                                  : h === "Nome do aluno"
                                    ? "alunos"
                                    : "status";
                  const val = row[key];
                  return (
                    <p key={`${idx}-${h}`} className="text-sm">
                      <span className="text-gray-300">{h}:</span>{" "}
                      {h === "Devolução" || h === "Dia"
                        ? formatBR(val)
                        : String(val)}
                    </p>
                  );
                })}
              </div>
            ))}
            {tabela.rows.length === 0 && (
              <div className="text-gray-400">
                Nenhum dado no período/turno selecionado.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
