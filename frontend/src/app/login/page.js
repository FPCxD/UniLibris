"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const emailLower = email.toLowerCase();

    // ① Permitir Fatec, CPS e o e-mail da biblioteca
    const dominioValido =
      emailLower.endsWith("@fatec.sp.gov.br") ||
      emailLower.endsWith("@cps.sp.gov.br") ||
      emailLower === "f288bibli@cps.sp.gov.br";

    if (!dominioValido) {
      setErro(
        "⚠️ Utilize apenas e-mails institucionais (@fatec.sp.gov.br ou @cps.sp.gov.br).",
      );
      return;
    }

    // ② Direcionar o bibliotecário para o painel correto
    if (emailLower === "f288bibli@cps.sp.gov.br") {
      router.push("/bibliotecario");
      return;
    }

    // ③ Caso contrário, rota de aluno
    router.push("/aluno");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-6 text-center">🔐 UniLibris</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail institucional"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {erro && <p className="text-red-400 text-sm">{erro}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-semibold"
          >
            Entrar
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm text-blue-400">
          <button
            onClick={() => router.push("/forgot-password")}
            className="hover:underline"
          >
            Esqueci minha senha
          </button>
          <button
            onClick={() => router.push("/register")}
            className="hover:underline"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
