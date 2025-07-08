'use client';

import { useState, useEffect } from 'react';
import Curso from '@/components/curso';
import { ListarCursos, ListarCursosComInscricao, getSession } from '@/lib/methods';
import type { Curso as CursoType } from '@/lib/mockup';

export default function Page() {
  const [cursos, setCursos] = useState<CursoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoading(true);
        
        // Verificar se o usuário está logado
        const userSession = await getSession();
        setSession(userSession);
        
        // Usar rota diferente baseada no status de autenticação
        const result = userSession 
          ? await ListarCursosComInscricao({})
          : await ListarCursos({});
        
        if (result.error) {
          setError(result.error);
          setCursos([]);
        } else {
          // Converter os dados do backend para o formato esperado pelo componente
          const cursosFormatados = result.map((curso: any) => ({
            id: curso.id.toString(),
            nome: curso.nome,
            descricao: curso.descricao,
            capa: curso.capa,
            inscricoes: curso.inscricoes,
            inicio: new Date(curso.inicio.split('/').reverse().join('-')), // Converter DD/MM/YYYY para Date
            inscrito: curso.inscrito || false,
            inscricao_cancelada: curso.inscricao_cancelada || false
          }));
          setCursos(cursosFormatados);
        }
      } catch (error) {
        setError('Erro ao carregar cursos');
        setCursos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  if (loading) {
    return (
      <main>
        <h2 className="page-title">Cursos</h2>
        <div className="flex justify-center items-center h-32">
          <p>Carregando cursos...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h2 className="page-title">Cursos</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main>
      <h2 className="page-title">Cursos</h2>
      {cursos.length === 0 ? (
        <div className="text-center py-8">
          <p>Nenhum curso disponível no momento.</p>
        </div>
      ) : (
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
          {cursos.map((curso: CursoType) => (
            <Curso data={curso} key={curso.id} />
          ))}
        </div>
      )}
    </main>
  );
}
