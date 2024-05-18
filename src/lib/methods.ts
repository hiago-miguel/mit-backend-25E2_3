import type { Curso, Usuario } from "./mockup";

export async function getSession(){
    const user = {}
    throw new Error("TODO");
    return user
}

export async function CreateUser({ nome, email, senha, nascimento } : Usuario ) {
    const status_code : number = 400;
    const result : any = {}

    throw new Error("TODO");

    if( status_code != 200 ){
        return {
            error: result?.mensagem
        };
    }else{
        return result
    }
}

export async function Login({ email, senha } : { email: string, senha : string }){
    const status_code : number = 400;
    const result : any = {}

    throw new Error("TODO");

    if( status_code != 200 ){
        return {
            error: result?.mensagem
        };
    }else{
        return result
    }
}

export async function ListarCursos({ filtro } : { filtro?: string }){
    const result : Curso[] = []
    throw new Error("TODO");
    return result
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
