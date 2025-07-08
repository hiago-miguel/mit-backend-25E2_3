const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/usuarioController');
const CursoController = require('../controllers/cursoController');
const { authMiddleware } = require('../middleware/auth');
const { validateCadastro, validateLogin, validateFiltro } = require('../middleware/validation');

// Rotas de usuário
router.post('/usuarios', validateCadastro, UsuarioController.cadastrar);
router.post('/login', validateLogin, UsuarioController.login);
router.get('/me', authMiddleware, UsuarioController.getMe);

// Rotas de cursos (públicas) - DEVEM vir ANTES das rotas com parâmetros
router.get('/cursos', CursoController.listarCursos);
router.post('/cursos', validateFiltro, CursoController.listarCursos);

// Rotas de cursos (autenticadas)
router.get('/cursos/inscritos', authMiddleware, CursoController.listarCursosComInscricao);
router.post('/cursos/inscritos', authMiddleware, validateFiltro, CursoController.listarCursosComInscricao);
router.post('/cursos/:idCurso', authMiddleware, CursoController.inscreverEmCurso);
router.delete('/cursos/:idCurso', authMiddleware, CursoController.cancelarInscricao);

// Rotas de usuário com parâmetros - DEVEM vir DEPOIS das rotas específicas
router.get('/:idUsuario', authMiddleware, UsuarioController.buscarPorId);
router.get('/:idUsuario/cursos', authMiddleware, CursoController.listarCursosInscritos);

// Rota de logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', { path: '/' });
  res.status(200).json({ mensagem: 'Logout realizado com sucesso' });
});

module.exports = router; 