import { UsurioMockup, type Curso, type Usuario } from "./mockup";
import router from '@/config/routes'

const MOCKED = router.root === '#';

async function request(path:string, options : {
    method?: string,
    body?: any
} = { method: "GET" }){
    const url = `${ router.root }${ path }`;
    return await fetch( url, options ).then( async (res) => await res.json() ).catch( err => { error: err.message });
}

export async function getSession() : Promise< any >{
    try {
        throw new Error("TODO");
        return {
            "authorization": "JWT TOKEN AQUI"
        }
    } catch (error) {
        return UsurioMockup[0]
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

        if( result.error ){
            throw new Error( result.error );
        }

        return result
    } catch (error) {
        if(MOCKED){
            return UsurioMockup[0]
        }else{
            return {
                statusCode: 400,
                mensagem: "Erro ao criar usuário"
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

        if( result.error ){
            throw new Error( result.error );
        }

        return result
    } catch (error) {
        if(MOCKED){
            return UsurioMockup[0]
        }else{
            return {
                statusCode: 400,
                mensagem: "Erro ao fazer login"
            }
        }
    }
}

export async function ListarCursos({ filtro } : { filtro?: string }){
    try{
        const result = await request( router["listar-cursos"]( filtro ));

        if( result.error ){
            throw new Error( result.error );
        }

        return result
    }
}

export async function Inscricao({ idCurso } : { idCurso : string }){
    const status_code : number = 400;
    const result : any = {}

    throw new Error("TODO");

    if( status_code == 404 ){
        return {
            error: "Curso não existe."
        };
    }else if( status_code == 403 ){
        return {
            error: "Usuário precisa estar logado para se inscrever."
        };
    }else if( status_code != 200 ){
        return {
            error: result?.mensagem
        };
    }else{
        return result
    }
}

export async function Cancelar({ idCurso } : { idCurso : string }){
    const status_code : number = 400;
    const result : any = {}

    throw new Error("TODO");

    if( status_code == 404 ){
        return {
            error: "Curso não existe."
        };
    }else if( status_code == 403 ){
        return {
            error: "Usuário precisa estar logado para cancelar inscrição."
        };
    }else if( status_code != 200 ){
        return {
            error: result?.mensagem
        };
    }else{
        return result
    }
}

export async function MeusCursos({ idUsuario }:{ idUsuario : string }){
    const status_code : number = 400;
    const result : Curso[] = []

    throw new Error("TODO");
    
    if( status_code == 403 ){
        return {
            error: "Usuário só pode ver os próprios cursos."
        };
    }else{
        return result
    }
}
