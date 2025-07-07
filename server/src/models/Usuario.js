const db = require('../config/database');
const bcrypt = require('bcryptjs');

class Usuario {
  static async criar(dados) {
    const { nome, email, senha, nascimento } = dados;
    
    // Verificar se email já existe
    const usuarioExistente = await this.buscarPorEmail(email);
    if (usuarioExistente) {
      throw new Error('Email já cadastrado');
    }

    // Criptografar senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO usuarios (nome, email, senha, nascimento)
        VALUES (?, ?, ?, ?)
      `;
      
      db.run(sql, [nome, email, senhaCriptografada, nascimento], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, nome, email, nascimento });
        }
      });
    });
  }

  static async buscarPorEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM usuarios WHERE email = ?';
      
      db.get(sql, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async buscarPorId(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT id, nome, email, nascimento, created_at FROM usuarios WHERE id = ?';
      
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async autenticar(email, senha) {
    const usuario = await this.buscarPorEmail(email);
    
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    
    if (!senhaValida) {
      throw new Error('Senha incorreta');
    }

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      nascimento: usuario.nascimento
    };
  }

  static async verificarExistencia(id) {
    const usuario = await this.buscarPorId(id);
    return !!usuario;
  }
}

module.exports = Usuario; 