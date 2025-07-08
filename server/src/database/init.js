const db = require('../config/database');

console.log('Inicializando banco de dados MySQL...');

const queries = [
  // Tabela de usuários
  `CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nascimento VARCHAR(10) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
  ) ENGINE=InnoDB;`,

  // Tabela de cursos
  `CREATE TABLE IF NOT EXISTS cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    capa VARCHAR(512) NOT NULL,
    inicio VARCHAR(10) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_nome (nome)
  ) ENGINE=InnoDB;`,

  // Tabela de inscrições
  `CREATE TABLE IF NOT EXISTS inscricoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    curso_id INT NOT NULL,
    cancelada BOOLEAN DEFAULT FALSE,
    data_cancelamento DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_usuario_curso (usuario_id, curso_id),
    INDEX idx_usuario (usuario_id),
    INDEX idx_curso (curso_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
  ) ENGINE=InnoDB;`,

  // Inserir dados de exemplo (todos os cursos do mockup)
  `INSERT IGNORE INTO cursos (nome, descricao, capa, inicio) VALUES 
    ('Desenvolvimento Web com React e Next.js', 'Aprenda a criar websites modernos e interativos com as tecnologias mais populares do mercado.', 'https://img-c.udemycdn.com/course/240x135/4160208_71be_5.jpg', '20/06/2025'),
    ('Introdução à Inteligência Artificial', 'Descubra os fundamentos da Inteligência Artificial e suas aplicações no mundo real.', 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~SPECIALIZATION!~bases-de-inteligencia-artificial-para-todos/XDP~SPECIALIZATION!~bases-de-inteligencia-artificial-para-todos.jpeg', '15/07/2025'),
    ('Fotografia para Iniciantes', 'Aprenda os princípios básicos da fotografia e tire fotos incríveis com seu celular ou câmera.', 'https://img-c.udemycdn.com/course/240x135/1680762_24a3_4.jpg', '10/08/2025'),
    ('Inglês Instrumental para o Mercado de Trabalho', 'Aprimore suas habilidades de comunicação em inglês e prepare-se para os desafios do mercado profissional.', 'https://img-c.udemycdn.com/course/240x135/2927102_7440_13.jpg', '05/09/2025'),
    ('Finanças Pessoais para Iniciantes', 'Aprenda a gerenciar seu dinheiro de forma inteligente e alcançar seus objetivos financeiros.', 'https://img-c.udemycdn.com/course/750x422/1021106_fa99_6.jpg', '01/10/2025'),
    ('Culinária Vegetariana', 'Descubra o mundo da culinária vegetariana com receitas deliciosas e nutritivas.', 'https://img-c.udemycdn.com/course/750x422/2846294_d765_5.jpg', '20/10/2025'),
    ('Yoga para Iniciantes', 'Aprenda os princípios básicos da yoga e melhore sua flexibilidade, força e bem-estar.', 'https://img-c.udemycdn.com/course/240x135/1222344_23a3_2.jpg', '15/11/2025'),
    ('Produtividade Pessoal', 'Aprenda técnicas para gerenciar seu tempo, organizar suas tarefas e aumentar sua produtividade.', 'https://img-c.udemycdn.com/course/750x422/1692770_85c5_4.jpg', '05/12/2025')
  ;`
];

function runQueries(queries, idx = 0) {
  if (idx >= queries.length) {
    console.log('Banco de dados MySQL inicializado com sucesso!');
    process.exit(0);
    return;
  }
  db.query(queries[idx], (err) => {
    if (err) {
      console.error('Erro ao executar query:', err.sqlMessage || err);
      process.exit(1);
    } else {
      runQueries(queries, idx + 1);
    }
  });
}

runQueries(queries); 