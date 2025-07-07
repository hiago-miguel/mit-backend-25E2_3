const db = require('../config/database');

class Inscricao {
  static async criar(usuarioId, cursoId) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO inscricoes (usuario_id, curso_id)
        VALUES (?, ?)
      `;
      
      db.run(sql, [usuarioId, cursoId], function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            reject(new Error('Usuário já está inscrito neste curso'));
          } else {
            reject(err);
          }
        } else {
          resolve({ id: this.lastID, usuario_id: usuarioId, curso_id: cursoId });
        }
      });
    });
  }

  static async cancelar(usuarioId, cursoId) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE inscricoes 
        SET cancelada = TRUE, data_cancelamento = CURRENT_TIMESTAMP
        WHERE usuario_id = ? AND curso_id = ? AND cancelada = FALSE
      `;
      
      db.run(sql, [usuarioId, cursoId], function(err) {
        if (err) {
          reject(err);
        } else {
          if (this.changes === 0) {
            reject(new Error('Inscrição não encontrada ou já cancelada'));
          } else {
            resolve({ usuario_id: usuarioId, curso_id: cursoId });
          }
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
        SELECT 
          c.id,
          c.nome,
          c.descricao,
          c.capa,
          c.inicio,
          COUNT(i2.id) as inscricoes,
          CASE WHEN i1.cancelada = TRUE THEN TRUE ELSE FALSE END as inscricao_cancelada,
          TRUE as inscrito
        FROM inscricoes i1
        JOIN cursos c ON i1.curso_id = c.id
        LEFT JOIN inscricoes i2 ON c.id = i2.curso_id AND i2.cancelada = FALSE
        WHERE i1.usuario_id = ?
        GROUP BY c.id
        ORDER BY c.inicio ASC
      `;
      
      db.all(sql, [usuarioId], (err, rows) => {
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
            inscricao_cancelada: row.inscricao_cancelada,
            inscrito: row.inscrito
          })));
        }
      });
    });
  }

  static async verificarInscricaoAtiva(usuarioId, cursoId) {
    const inscricao = await this.verificarInscricao(usuarioId, cursoId);
    
    if (!inscricao) {
      return false;
    }
    
    // Se a inscrição foi cancelada, não pode se inscrever novamente
    if (inscricao.cancelada) {
      throw new Error('Inscrição cancelada anteriormente. Não é possível se inscrever novamente.');
    }
    
    return true;
  }
}

module.exports = Inscricao; 