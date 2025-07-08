const db = require('../config/database');

console.log('Limpando banco de dados MySQL...');

const queries = [
  // Desabilitar verificação de foreign keys temporariamente
  'SET FOREIGN_KEY_CHECKS = 0;',
  
  // Remover tabelas (ordem inversa das dependências)
  'DROP TABLE IF EXISTS inscricoes;',
  'DROP TABLE IF EXISTS cursos;',
  'DROP TABLE IF EXISTS usuarios;',
  
  // Reabilitar verificação de foreign keys
  'SET FOREIGN_KEY_CHECKS = 1;'
];

function runQueries(queries, idx = 0) {
  if (idx >= queries.length) {
    console.log('Banco de dados MySQL limpo com sucesso!');
    process.exit(0);
    return;
  }
  
  db.query(queries[idx], (err) => {
    if (err) {
      console.error('Erro ao executar query:', err.sqlMessage || err);
      process.exit(1);
    } else {
      console.log(`Query ${idx + 1}/${queries.length} executada com sucesso`);
      runQueries(queries, idx + 1);
    }
  });
}

runQueries(queries); 