const Usuario = require('../models/Usuario');
const { generateToken } = require('../middleware/auth');

class UsuarioController {
  static async cadastrar(req, res) {
    try {
      const { nome, email, senha, nascimento } = req.body;
      
      const usuario = await Usuario.criar({
        nome,
        email,
        senha,
        nascimento
      });

      res.status(200).json({
        mensagem: 'Usuário cadastrado com sucesso',
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          nascimento: usuario.nascimento
        }
      });
    } catch (error) {
      if (error.message === 'Email já cadastrado') {
        return res.status(400).json({ mensagem: error.message });
      }
      
      console.error('Erro ao cadastrar usuário:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      
      const usuario = await Usuario.autenticar(email, senha);
      
      // Gerar token JWT
      const token = generateToken(usuario);
      
      // Configurar cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
      });

      res.status(200).json({
        mensagem: 'Login realizado com sucesso',
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        }
      });
    } catch (error) {
      if (error.message === 'Usuário não encontrado' || error.message === 'Senha incorreta') {
        return res.status(400).json({ mensagem: 'Email ou senha incorretos' });
      }
      
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async getMe(req, res) {
    try {
      const usuarioLogado = req.usuario;
      
      const usuario = await Usuario.buscarPorId(usuarioLogado.id);
      
      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      res.status(200).json(usuario);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário logado:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const { idUsuario } = req.params;
      const usuarioLogado = req.usuario;

      // Verificar se o usuário está tentando acessar seus próprios dados
      if (parseInt(idUsuario) !== usuarioLogado.id) {
        return res.status(403).json({ mensagem: 'Acesso negado' });
      }

      const usuario = await Usuario.buscarPorId(idUsuario);
      
      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      res.status(200).json(usuario);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }
}

module.exports = UsuarioController; 