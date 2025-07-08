import { UsurioMockup, type Curso, type Usuario } from "./mockup";
import router from '@/config/routes'
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const MOCKED = router.root === '#';

async function request(path:string, options : {
    method?: string,
    body?: any
} = { method: "GET" }){
    const url = `${ API_URL }${ path }`;
    
    const fetchOptions: RequestInit = {
        method: options.method || "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Para incluir cookies
    };

    if (options.body && options.method !== 'GET') {
        fetchOptions.body = JSON.stringify(options.body);
    }

    return await fetch( url, fetchOptions )
        .then( async (res) => {
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                // Se o status não é 2xx, retorna erro com status
                return { 
                    error: data.mensagem || `Erro ${res.status}: ${res.statusText}`,
                    status: res.status 
                };
            }
            return data;
        })
        .catch( err => ({ error: err.message }));
}

export async function getSession() : Promise< any >{
    try {
        if(MOCKED){
            return {
                isAuthenticated: true,
                user: UsurioMockup[0]
            }
        }else{
            // Tentar buscar dados do usuário logado através do token JWT
            // O token está armazenado nos cookies e será enviado automaticamente
            const result = await request('/me', {
                method: 'GET'
            });

            if (result.error) {
                // Se não há token válido, retorna null
                return null;
            }

            return {
                isAuthenticated: true,
                user: result
            };
        }
    } catch (error) {
        // Se não há sessão válida, retorna null
        return null;
    }
}

export async function CreateUser({ nome, email, senha, nascimento } : Usuario ) : Promise<Usuario | any>{
    try {
        const result = await request( router["criar-usuario"]() , {
            method: "POST",
            body: {
                nome,
                email,
                senha,
                nascimento
            }
        });

        // Se há erro, retorna diretamente o objeto de erro
        if( result.error ){
            return result;
        }

        return result
    } catch (error) {
        if(MOCKED){
            return UsurioMockup[0]
        }else{
            return {
                error: "Erro ao criar usuário",
                status: 500
            }
        }
    }
}

export async function Login({ email, senha } : { email: string, senha : string }){
    try {
        const result = await request( router["login"]() , {
            method: "POST",
            body: { email, senha }
        });

        // Se há erro, retorna diretamente o objeto de erro
        if( result.error ){
            return result;
        }

        return result
    } catch (error) {
        if(MOCKED){
            return UsurioMockup[0]
        }else{
            return {
                error: "Erro ao fazer login",
                status: 500
            }
        }
    }
}

export async function ListarCursos({ filtro } : { filtro?: string }){
    try{
        const result = await request( router["listar-cursos"]( filtro ));

        if( result.error ){
            return result;
        }

        return result
    } catch (error) {
        if(MOCKED){
            return []
        }else{
            return {
                error: "Erro ao listar cursos",
                status: 500
            }
        }
    }
}

export async function ListarCursosComInscricao({ filtro } : { filtro?: string }){
    try{
        const result = await request( router["listar-cursos-com-inscricao"]( filtro ));

        if( result.error ){
            return result;
        }

        return result
    } catch (error) {
        if(MOCKED){
            return []
        }else{
            return {
                error: "Erro ao listar cursos com inscrição",
                status: 500
            }
        }
    }
}

export async function Inscricao({ idCurso } : { idCurso : string }){
    try {
        const result = await request( router["inscrever-curso"]( idCurso ), {
            method: "POST"
        });

        if( result.error ){
            return result;
        }

        return result
    } catch (error) {
        if(MOCKED){
            return { error: "Funcionalidade não implementada no mockup" }
        }else{
            return {
                error: "Erro ao inscrever no curso",
                status: 500
            }
        }
    }
}

export async function Cancelar({ idCurso } : { idCurso : string }){
    try {
        const result = await request( router["cancelar-curso"]( idCurso ), {
            method: "DELETE"
        });

        if( result.error ){
            return result;
        }

        return result
    } catch (error) {
        if(MOCKED){
            return { error: "Funcionalidade não implementada no mockup" }
        }else{
            return {
                error: "Erro ao cancelar inscrição",
                status: 500
            }
        }
    }
}

export async function MeusCursos({ idUsuario }:{ idUsuario : string }){
    try {
        const result = await request( router["meus-cursos"]( idUsuario ));

        if( result.error ){
            return result;
        }

        return result
    } catch (error) {
        if(MOCKED){
            return []
        }else{
            return {
                error: "Erro ao listar meus cursos",
                status: 500
            }
        }
    }
}

export async function logout() {
  await fetch(`${API_URL}/logout`, { method: 'POST', credentials: 'include' });
  window.location.assign('/login');
}
