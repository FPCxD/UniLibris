"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/* ---------------- Sidebar (mesmo do /aluno) ---------------- */
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
    router.push("/aluno#historico");
    onClose?.();
  };
  const goNotificacoes = () => {
    router.push("/aluno#notificacoes");
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
            disabled
            className={itemClass("/perfilaluno")}
            title="Você já está no Perfil"
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

/* ---------------- Página: Perfil do Aluno (somente leitura) ---------------- */
export default function PerfilAlunoPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [perfil] = useState({
    nome: "Nome Sobrenome",
    email: "nome.sobrenome@fatec.sp.gov.br",
    ra: "12345678",
    curso: "ADS",
    periodo: "2º semestre",
    turno: "Matutino",
    telefone: "",
  });

  const [prefs] = useState({
    emailAtraso: true,
    emailVencimento: true,
    resumoSemanal: false,
    pushPWA: false,
  });

  const [pwd, setPwd] = useState({ atual: "", nova: "", confirmar: "" });
  const [mensagem, setMensagem] = useState("");

  const exportarDados = () => {
    const linhas = [
      ["Campo", "Valor"],
      ["Nome", perfil.nome],
      ["E-mail", perfil.email],
      ["RA", perfil.ra],
      ["Curso", perfil.curso],
      ["Período", perfil.periodo],
      ["Turno", perfil.turno],
      ["Telefone", perfil.telefone || "-"],
    ];
    const csv = linhas
      .map((l) => l.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";"))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meus_dados_unilibris.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const solicitarAtualizacao = () => {
    const assunto = encodeURIComponent(
      "Solicitação de atualização de cadastro - UniLibris",
    );
    const corpo = encodeURIComponent(
      `Prezada equipe da biblioteca,\n\n` +
        `Gostaria de solicitar a atualização dos meus dados cadastrais no sistema UniLibris.\n\n` +
        `Nome: ${perfil.nome}\nRA: ${perfil.ra}\nE-mail: ${perfil.email}\nCurso: ${perfil.curso}\n\n` +
        `Por favor, informe caso seja necessário apresentar documentos comprobatórios.\n\nAtenciosamente,\n${perfil.nome}`,
    );
    window.location.href = `mailto:f288bibli@cps.sp.gov.br?subject=${assunto}&body=${corpo}`;
  };

  const alterarSenha = () => {
    if (!pwd.atual || !pwd.nova || !pwd.confirmar) {
      setMensagem("Preencha todos os campos de senha.");
      return;
    }
    if (pwd.nova.length < 8) {
      setMensagem("A nova senha deve ter ao menos 8 caracteres.");
      return;
    }
    if (pwd.nova !== pwd.confirmar) {
      setMensagem("A confirmação de senha não confere.");
      return;
    }
    setMensagem("Senha alterada com sucesso.");
    setPwd({ atual: "", nova: "", confirmar: "" });
  };

  const inputRO =
    "w-full p-2 rounded-md bg-gray-700/60 border border-gray-600 text-gray-300 cursor-not-allowed";
  const boxRO = "opacity-50 cursor-not-allowed";

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
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h1 className="text-2xl font-bold">👤 Meu Perfil</h1>
          <p className="text-gray-400">
            Seus dados são exibidos abaixo. Alterações só podem ser feitas pela
            biblioteca.
          </p>
        </header>

        {mensagem && (
          <div className="p-3 rounded-md bg-gray-800 border-l-4 border-blue-500 text-sm">
            {mensagem}
          </div>
        )}

        {/* Aviso de somente leitura */}
        <div className="p-3 rounded-md bg-amber-900/30 border border-amber-700 text-amber-200 text-sm">
          🔒 Este perfil está em <strong>modo somente leitura</strong>. Para
          solicitar correções de nome, RA, curso, turno ou contato, clique em
          <em> “Solicitar atualização ao bibliotecário”</em>.
        </div>

        {/* Dados Pessoais (somente leitura) */}
        <section className="bg-gray-800 rounded-md p-4 shadow space-y-4">
          <h2 className="text-lg font-semibold">Dados pessoais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Nome completo
              </label>
              <input
                type="text"
                value={perfil.nome}
                readOnly
                className={inputRO}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                E-mail institucional
              </label>
              <input
                type="email"
                value={perfil.email}
                readOnly
                className={inputRO}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">RA</label>
              <input
                type="text"
                value={perfil.ra}
                readOnly
                className={inputRO}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Curso</label>
              <input
                type="text"
                value={perfil.curso}
                readOnly
                className={inputRO}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Período
              </label>
              <input
                type="text"
                value={perfil.periodo}
                readOnly
                className={inputRO}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Turno</label>
              <input
                type="text"
                value={perfil.turno}
                readOnly
                className={inputRO}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Telefone
              </label>
              <input
                type="tel"
                value={perfil.telefone}
                readOnly
                className={inputRO}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-end">
            <button
              onClick={solicitarAtualizacao}
              className="px-5 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
            >
              Solicitar atualização ao bibliotecário
            </button>
            <button
              onClick={exportarDados}
              className="px-5 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
            >
              Exportar meus dados (CSV)
            </button>
          </div>
        </section>

        {/* Preferências (somente leitura) */}
        <section className="bg-gray-800 rounded-md p-4 shadow space-y-4">
          <h2 className="text-lg font-semibold">
            Preferências de notificações
          </h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-3 opacity-50 cursor-not-allowed`}
          >
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={prefs.emailVencimento} disabled />{" "}
              E-mail de devolução próxima
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={prefs.emailAtraso} disabled />{" "}
              E-mail em caso de atraso
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={prefs.resumoSemanal} disabled />{" "}
              Resumo semanal
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={prefs.pushPWA} disabled />{" "}
              Notificações push (PWA)
            </label>
          </div>
          <p className="text-xs text-gray-400">
            * Alterações devem ser solicitadas à biblioteca.
          </p>
        </section>

        {/* Troca de Senha */}
        <section className="bg-gray-800 rounded-md p-4 shadow space-y-4">
          <h2 className="text-lg font-semibold">Alterar senha</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Senha atual
              </label>
              <input
                type="password"
                value={pwd.atual}
                onChange={(e) =>
                  setPwd((s) => ({ ...s, atual: e.target.value }))
                }
                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Nova senha
              </label>
              <input
                type="password"
                value={pwd.nova}
                onChange={(e) =>
                  setPwd((s) => ({ ...s, nova: e.target.value }))
                }
                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Confirmar nova senha
              </label>
              <input
                type="password"
                value={pwd.confirmar}
                onChange={(e) =>
                  setPwd((s) => ({ ...s, confirmar: e.target.value }))
                }
                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="text-right">
            <button
              onClick={alterarSenha}
              className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-500 font-semibold"
            >
              Alterar senha
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
