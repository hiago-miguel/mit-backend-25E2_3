const db = require('../config/database');

class Inscricao {
  static async criar(usuarioId, cursoId) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO inscricoes (usuario_id, curso_id) VALUES (?, ?)`;
      db.query(sql, [usuarioId, cursoId], function (err, result) {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            reject(new Error('Usuário já está inscrito neste curso'));
          } else {
            reject(err);
          }
        } else {
          resolve({ id: result.insertId });
        }
      });
    });
  }

  static async cancelar(usuarioId, cursoId) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE inscricoes SET cancelada = TRUE, data_cancelamento = NOW() WHERE usuario_id = ? AND curso_id = ? AND cancelada = FALSE`;
      db.query(sql, [usuarioId, cursoId], function (err, result) {
        if (err) {
          reject(err);
        } else if (result.affectedRows === 0) {
          reject(new Error('Inscrição não encontrada ou já cancelada'));
        } else {
          resolve();
        }
      });
    });
  }

  static async verificarInscricao(usuarioId, cursoId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM inscricoes 
        WHERE usuario_id = ? AND curso_id = ?
      `;
      
      db.get(sql, [usuarioId, cursoId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async listarCursosInscritos(usuarioId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT c.id, c.nome, c.descricao, c.capa, c.inicio, COUNT(i2.id) as inscricoes,
          CASE WHEN i1.cancelada = TRUE THEN TRUE ELSE FALSE END as inscricao_cancelada,
          CASE WHEN i1.id IS NOT NULL THEN TRUE ELSE FALSE END as inscrito
        FROM cursos c
        LEFT JOIN inscricoes i1 ON c.id = i1.curso_id AND i1.usuario_id = ?
        LEFT JOIN inscricoes i2 ON c.id = i2.curso_id AND i2.cancelada = FALSE
        WHERE i1.id IS NOT NULL
        GROUP BY c.id
        ORDER BY c.inicio ASC
      `;
      db.query(sql, [usuarioId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map(row => ({
            id: row.id,
            nome: row.nome,
            descricao: row.descricao,
            capa: row.capa,
            inscricoes: row.inscricoes,
            inicio: row.inicio,
            inscricao_cancelada: !!row.inscricao_cancelada,
            inscrito: !!row.inscrito
          })));
        }
      });
    });
  }

  static async verificarInscricaoAtiva(usuarioId, cursoId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM inscricoes WHERE usuario_id = ? AND curso_id = ? AND cancelada = FALSE`;
      db.query(sql, [usuarioId, cursoId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(!!rows.length);
        }
      });
    });
  }
}

module.exports = Inscricao; 