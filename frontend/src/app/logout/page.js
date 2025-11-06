"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Limpa tokens, sessões e dados locais
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    // Redireciona após 3 segundos
    const timeout = setTimeout(() => {
      router.push("/login");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 text-center px-6">
      <div className="max-w-md p-8 rounded-lg bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold mb-4">👋 Logout efetuado</h1>
        <p className="text-gray-300 mb-6">
          Sua sessão foi encerrada com segurança.
        </p>
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm text-gray-400">
          Você será redirecionado para a tela de login em instantes...
        </p>
      </div>
    </div>
  );
}
