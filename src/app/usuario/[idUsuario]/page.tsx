import Curso from '@/components/curso'
import { CursosMockup } from '@/lib/mockup'
import type { Curso as CursoType } from '@/lib/mockup'

export default function Page() {
  return (
    <main>
      <h2 className="page-title">Meus cursos</h2>
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
        { CursosMockup.map( (curso : CursoType) => <Curso data={ curso } key={ curso.id } /> ) }
      </div>
    </main>
  );
}
