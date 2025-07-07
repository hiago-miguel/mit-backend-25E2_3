const db = require('../config/database');

class Curso {
  static async listarTodos(filtro = null) {
    return new Promise((resolve, reject) => {
      let sql = `
        SELECT 
          c.id,
          c.nome,
          c.descricao,
          c.capa,
          c.inicio,
          COUNT(DISTINCT i.id) as inscricoes
        FROM cursos c
        LEFT JOIN inscricoes i ON c.id = i.curso_id AND i.cancelada = FALSE
        GROUP BY c.id
      `;
      
      const params = [];
      
      if (filtro) {
        sql += ' WHERE (c.nome LIKE ? OR c.descricao LIKE ?)';
        params.push(`%${filtro}%`, `%${filtro}%`);
      }
      
      sql += ' ORDER BY c.inicio ASC';
      
      db.all(sql, params, (err, rows) => {
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
            inscrito: false
          })));
        }
      });
    });
  }

  static async buscarPorId(id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          c.id,
          c.nome,
          c.descricao,
          c.capa,
          c.inicio,
          COUNT(DISTINCT i.id) as inscricoes
        FROM cursos c
        LEFT JOIN inscricoes i ON c.id = i.curso_id AND i.cancelada = FALSE
        WHERE c.id = ?
        GROUP BY c.id
      `;
      
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static async verificarExistencia(id) {
    const curso = await this.buscarPorId(id);
    return !!curso;
  }

  static async listarComInscricaoUsuario(usuarioId, filtro = null) {
    return new Promise((resolve, reject) => {
      let sql = `
        SELECT 
          c.id,
          c.nome,
          c.descricao,
          c.capa,
          c.inicio,
          COUNT(DISTINCT i2.id) as inscricoes,
          CASE WHEN i1.id IS NOT NULL THEN TRUE ELSE FALSE END as inscrito,
          CASE WHEN i1.cancelada = TRUE THEN TRUE ELSE FALSE END as inscricao_cancelada
        FROM cursos c
        LEFT JOIN inscricoes i1 ON c.id = i1.curso_id AND i1.usuario_id = ?
        LEFT JOIN inscricoes i2 ON c.id = i2.curso_id AND i2.cancelada = FALSE
        GROUP BY c.id
      `;
      
      const params = [usuarioId];
      
      if (filtro) {
        sql += ' WHERE (c.nome LIKE ? OR c.descricao LIKE ?)';
        params.push(`%${filtro}%`, `%${filtro}%`);
      }
      
      sql += ' ORDER BY c.inicio ASC';
      
      db.all(sql, params, (err, rows) => {
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
            inscrito: row.inscrito,
            inscricao_cancelada: row.inscricao_cancelada
          })));
        }
      });
    });
  }
}

module.exports = Curso; 