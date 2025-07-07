export default {
    'root': 'http://localhost:3001', //Rota da API
    'criar-usuario': () => '/usuarios', //url de criar usuários
    'login': () => '/login', //url de login
    'listar-cursos': ( filtro ?: any ) => '/cursos' + (filtro ? '?' + new URLSearchParams(filtro).toString() : ''), //url de listar cursos
    'inscrever-curso': ( idCurso : string ) => `/cursos/${ idCurso }`, //url de se inscrever em curso,
    'cancelar-curso': ( idCurso : string ) => `/cursos/${ idCurso }`, //url de cancelar inscricao
    'meus-cursos': ( idUsuario : string ) => `/${ idUsuario }/cursos`, //url de listar meus cursos
}