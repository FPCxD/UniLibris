"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // token recebido via URL
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!token) {
      setErro("⚠️ Link inválido ou expirado.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("⚠️ As senhas não coincidem.");
      return;
    }

    setErro("");

    // Aqui entraria a chamada real ao backend:
    // fetch("/api/reset-password", { method: "POST", body: JSON.stringify({ token, senha }) })

    setSucesso("✅ Senha redefinida com sucesso!");
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          🔒 Redefinir Senha
        </h1>

        {!token ? (
          <p className="text-red-400 text-center">
            ⚠️ Este link de redefinição não é válido.
          </p>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="password"
              placeholder="Nova senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Confirmar nova senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {erro && <p className="text-red-400 text-sm">{erro}</p>}
            {sucesso && <p className="text-green-400 text-sm">{sucesso}</p>}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-semibold"
            >
              Redefinir Senha
            </button>
          </form>
        )}

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
