"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EMAIL_DOMINIOS = ["@fatec.sp.gov.br", "@cps.sp.gov.br"];
const RA_REGEX = /^\d{6,12}$/;

export default function RegisterRequestPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [ra, setRa] = useState("");
  const [email, setEmail] = useState("");
  const [observacao, setObservacao] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  function isEmailInstitucional(v) {
    const e = String(v || "")
      .toLowerCase()
      .trim();
    return EMAIL_DOMINIOS.some((dom) => e.endsWith(dom));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!nome.trim()) {
      setErro("Informe o nome completo.");
      return;
    }
    if (!RA_REGEX.test(ra)) {
      setErro("RA inválido. Use apenas números (6 a 12 dígitos).");
      return;
    }
    if (!isEmailInstitucional(email)) {
      setErro(
        "⚠️ Utilize apenas e-mail institucional (@fatec.sp.gov.br ou @cps.sp.gov.br).",
      );
      return;
    }

    setLoading(true);
    try {
      // Simulação de envio (aqui entrará o fetch real para o backend futuramente)
      await new Promise((r) => setTimeout(r, 800));

      setSucesso(
        "✅ Solicitação enviada à biblioteca para aprovação. Você receberá acesso após análise.",
      );
      setTimeout(() => {
        router.push("/login");
      }, 2200);
    } catch (err) {
      setErro("Não foi possível enviar a solicitação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
          📝 Solicitar Cadastro – UniLibris
        </h1>
        <p className="text-xs text-gray-400 text-center mb-6">
          Utilize seu e-mail institucional (<code>@fatec.sp.gov.br</code>).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value.toUpperCase())} // 👈 converte tudo para maiúsculo
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
            required
          />

          <input
            type="text"
            inputMode="numeric"
            placeholder="RA (somente números)"
            value={ra}
            onChange={(e) => setRa(e.target.value.replace(/\D/g, ""))}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            placeholder="E-mail institucional"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            placeholder="Observações para a biblioteca (opcional)"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
          />

          {erro && <p className="text-red-400 text-sm">{erro}</p>}
          {sucesso && <p className="text-green-400 text-sm">{sucesso}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-600/60 text-white px-4 py-2 rounded font-semibold"
          >
            {loading ? "Enviando..." : "Enviar solicitação"}
          </button>
        </form>

        <div className="mt-4 text-center space-y-2">
          <p className="text-xs text-gray-400">
            Após aprovação, sua conta será criada pela biblioteca com senha
            provisória igual ao RA. No primeiro acesso, será solicitada a troca
            de senha.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="text-blue-400 hover:underline text-sm"
          >
            Voltar ao login
          </button>
        </div>
      </div>
    </div>
  );
}
