"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    // Validação: apenas e-mails institucionais Fatec
    if (!email.endsWith("@fatec.sp.gov.br")) {
      setErro("⚠️ Utilize apenas seu e-mail institucional (@fatec.sp.gov.br).");
      return;
    }

    setErro("");
    // Aqui entraria a chamada real de API para envio de e-mail
    // Exemplo: fetch("/api/forgot-password", { method: "POST", body: JSON.stringify({ email }) })

    setMensagem(
      "✅ Se este e-mail estiver cadastrado, enviaremos instruções de redefinição.",
    );
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          🔑 Recuperar Senha
        </h1>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail institucional"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {erro && <p className="text-red-400 text-sm">{erro}</p>}
          {mensagem && <p className="text-green-400 text-sm">{mensagem}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-semibold"
          >
            Enviar link de redefinição
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/login")}
            className="text-blue-400 hover:underline text-sm"
          >
            Voltar ao Login
          </button>
        </div>
      </div>
    </div>
  );
}
