const Curso = require('../models/Curso');
const Inscricao = require('../models/Inscricao');

class CursoController {
  static async listarCursos(req, res) {
    try {
      const { filtro } = req.body;
      const cursos = await Curso.listarTodos(filtro);
      
      res.status(200).json(cursos);
    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async listarCursosComInscricao(req, res) {
    try {
      const { filtro } = req.body;
      const usuarioId = req.usuario.id;
      
      const cursos = await Curso.listarComInscricaoUsuario(usuarioId, filtro);
      
      res.status(200).json(cursos);
    } catch (error) {
      console.error('Erro ao listar cursos com inscrição:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async inscreverEmCurso(req, res) {
    try {
      const { idCurso } = req.params;
      const usuarioId = req.usuario.id;

      // Verificar se o curso existe
      const cursoExiste = await Curso.verificarExistencia(idCurso);
      if (!cursoExiste) {
        return res.status(404).json({ mensagem: 'Curso não encontrado' });
      }

      // Verificar se já está inscrito
      const jaInscrito = await Inscricao.verificarInscricaoAtiva(usuarioId, idCurso);
      if (jaInscrito) {
        return res.status(400).json({ mensagem: 'Usuário já está inscrito neste curso' });
      }

      // Fazer inscrição
      await Inscricao.criar(usuarioId, idCurso);

      res.status(200).json({ mensagem: 'Inscrição realizada com sucesso' });
    } catch (error) {
      if (error.message.includes('já está inscrito') || 
          error.message.includes('cancelada anteriormente')) {
        return res.status(400).json({ mensagem: error.message });
      }
      
      console.error('Erro ao inscrever em curso:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async cancelarInscricao(req, res) {
    try {
      const { idCurso } = req.params;
      const usuarioId = req.usuario.id;

      // Verificar se o curso existe
      const cursoExiste = await Curso.verificarExistencia(idCurso);
      if (!cursoExiste) {
        return res.status(404).json({ mensagem: 'Curso não encontrado' });
      }

      // Cancelar inscrição
      await Inscricao.cancelar(usuarioId, idCurso);

      res.status(200).json({ mensagem: 'Inscrição cancelada com sucesso' });
    } catch (error) {
      if (error.message.includes('não encontrada') || 
          error.message.includes('já cancelada')) {
        return res.status(400).json({ mensagem: error.message });
      }
      
      console.error('Erro ao cancelar inscrição:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async listarCursosInscritos(req, res) {
    try {
      const { idUsuario } = req.params;
      const usuarioLogado = req.usuario;

      // Verificar se o usuário está tentando acessar seus próprios dados
      if (parseInt(idUsuario) !== usuarioLogado.id) {
        return res.status(403).json({ mensagem: 'Acesso negado' });
      }

      const cursos = await Inscricao.listarCursosInscritos(idUsuario);
      
      res.status(200).json(cursos);
    } catch (error) {
      console.error('Erro ao listar cursos inscritos:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }
}

module.exports = CursoController; 