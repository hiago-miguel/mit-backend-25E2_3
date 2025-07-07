'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { getSession, logout } from "@/lib/methods";

export default function DynamicHeader() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await getSession();
        setSession(userSession);
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <header className="layout-guide h-[16rem] flex flex-col justify-end">
      <h1 className="text-5xl font-bold py-5">
        <Link href="/" className="text-indigo-800 hover:text-indigo-900">
          Bastet
        </Link>
      </h1>
      <p>Uma nova plataforma de cursos</p>
      <menu className="flex flex-row gap-4">
        {!session ? (
          <>
            <Link className="text-indigo-600" href="/cadastro">
              Fazer cadastro
            </Link>
            <Link className="text-indigo-600" href="/login">
              Fazer login
            </Link>
          </>
        ) : (
          <>
            <span className="text-indigo-600">
              Olá, {session.user?.nome}
            </span>
            <Link 
              className="text-indigo-600" 
              href={`/usuario/${session.user?.id}`}
            >
              Meus cursos
            </Link>
            <Link
              className="text-red-600 hover:text-red-800 cursor-pointer"
              href="#"
              onClick={e => { e.preventDefault(); logout(); }}
            >
              Sair
            </Link>
          </>
        )}
      </menu>
    </header>
  );
} 