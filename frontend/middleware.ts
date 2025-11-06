// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const role = req.cookies.get("userRole")?.value; // "aluno" | "bibliotecario"

  // Protege /bibliotecario/*
  if (url.pathname.startsWith("/bibliotecario")) {
    if (role !== "bibliotecario") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Protege /aluno/*
  if (url.pathname.startsWith("/aluno")) {
    if (role !== "aluno") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Se usuário abrir "/" e já estiver autenticado, manda pro dashboard correto
  if (url.pathname === "/") {
    if (role === "bibliotecario") {
      url.pathname = "/bibliotecario";
      return NextResponse.redirect(url);
    }
    if (role === "aluno") {
      url.pathname = "/aluno";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // redireciona home
    "/aluno/:path*", // protege aluno
    "/bibliotecario/:path*", // protege bibliotecário
  ],
};
