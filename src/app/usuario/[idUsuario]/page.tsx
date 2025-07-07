'use client';

import { useState, useEffect } from 'react';
import Curso from '@/components/curso';
import { MeusCursos } from '@/lib/methods';
import type { Curso as CursoType } from '@/lib/mockup';

export default function Page({ params }: { params: { idUsuario: string } }) {
  const [cursos, setCursos] = useState<CursoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoading(true);
        const result = await MeusCursos({ idUsuario: params.idUsuario });
        
        if (result.error) {
          setError(result.error);
          setCursos([]);
        } else {
          setCursos(Array.isArray(result) ? result : []);
        }
      } catch (error) {
        setError('Erro ao carregar cursos');
        setCursos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, [params.idUsuario]);

  if (loading) {
    return (
      <main>
        <h2 className="page-title">Meus cursos</h2>
        <div className="flex justify-center items-center h-32">
          <p>Carregando...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h2 className="page-title">Meus cursos</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main>
      <h2 className="page-title">Meus cursos</h2>
      {cursos.length === 0 ? (
        <div className="text-center py-8">
          <p>Você ainda não está inscrito em nenhum curso.</p>
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
