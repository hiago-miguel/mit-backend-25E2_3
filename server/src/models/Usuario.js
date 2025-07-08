const db = require('../config/database');
const bcrypt = require('bcryptjs');

class Usuario {
  static async criar({ nome, email, senha, nascimento }) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO usuarios (nome, email, senha, nascimento) VALUES (?, ?, ?, ?)`;
      db.query(sql, [nome, email, senha, nascimento], function (err, result) {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            reject(new Error('Email já cadastrado'));
          } else {
            reject(err);
          }
        } else {
          resolve({
            id: result.insertId,
            nome,
            email,
            nascimento
          });
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
      const sql = `SELECT id, nome, email, nascimento FROM usuarios WHERE id = ?`;
      db.query(sql, [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]);
        }
      });
    });
  }

  static async autenticar(email, senha) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM usuarios WHERE email = ?`;
      db.query(sql, [email], (err, rows) => {
        if (err) {
          reject(err);
        } else if (!rows.length) {
          reject(new Error('Usuário não encontrado'));
        } else {
          const usuario = rows[0];
          if (usuario.senha !== senha) {
            reject(new Error('Senha incorreta'));
          } else {
            resolve(usuario);
          }
        }
      });
    });
  }

  static async verificarExistencia(id) {
    const usuario = await this.buscarPorId(id);
    return !!usuario;
  }
}

module.exports = Usuario; 