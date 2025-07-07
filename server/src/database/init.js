const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Cria o banco de dados
const dbPath = path.join(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('Inicializando banco de dados...');

// Cria as tabelas
db.serialize(() => {
  // Tabela de usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      nascimento TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de cursos
  db.run(`
    CREATE TABLE IF NOT EXISTS cursos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL,
      capa TEXT NOT NULL,
      inicio TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de inscrições
  db.run(`
    CREATE TABLE IF NOT EXISTS inscricoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      curso_id INTEGER NOT NULL,
      cancelada BOOLEAN DEFAULT FALSE,
      data_cancelamento DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
      FOREIGN KEY (curso_id) REFERENCES cursos (id),
      UNIQUE(usuario_id, curso_id)
    )
  `);

  // Inserir dados de exemplo (todos os cursos do mockup)
  db.run(`
    INSERT OR IGNORE INTO cursos (nome, descricao, capa, inicio) VALUES 
    ('Desenvolvimento Web com React e Next.js', 'Aprenda a criar websites modernos e interativos com as tecnologias mais populares do mercado.', 'https://img-c.udemycdn.com/course/240x135/4160208_71be_5.jpg', '20/06/2024'),
    ('Introdução à Inteligência Artificial', 'Descubra os fundamentos da Inteligência Artificial e suas aplicações no mundo real.', 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~SPECIALIZATION!~bases-de-inteligencia-artificial-para-todos/XDP~SPECIALIZATION!~bases-de-inteligencia-artificial-para-todos.jpeg', '15/07/2024'),
    ('Fotografia para Iniciantes', 'Aprenda os princípios básicos da fotografia e tire fotos incríveis com seu celular ou câmera.', 'https://img-c.udemycdn.com/course/240x135/1680762_24a3_4.jpg', '10/08/2024'),
    ('Inglês Instrumental para o Mercado de Trabalho', 'Aprimore suas habilidades de comunicação em inglês e prepare-se para os desafios do mercado profissional.', 'https://img-c.udemycdn.com/course/240x135/2927102_7440_13.jpg', '05/09/2024'),
    ('Finanças Pessoais para Iniciantes', 'Aprenda a gerenciar seu dinheiro de forma inteligente e alcançar seus objetivos financeiros.', 'https://img-c.udemycdn.com/course/750x422/1021106_fa99_6.jpg', '01/10/2024'),
    ('Culinária Vegetariana', 'Descubra o mundo da culinária vegetariana com receitas deliciosas e nutritivas.', 'https://img-c.udemycdn.com/course/750x422/2846294_d765_5.jpg', '20/10/2024'),
    ('Yoga para Iniciantes', 'Aprenda os princípios básicos da yoga e melhore sua flexibilidade, força e bem-estar.', 'https://img-c.udemycdn.com/course/240x135/1222344_23a3_2.jpg', '15/11/2024'),
    ('Produtividade Pessoal', 'Aprenda técnicas para gerenciar seu tempo, organizar suas tarefas e aumentar sua produtividade.', 'https://img-c.udemycdn.com/course/750x422/1692770_85c5_4.jpg', '05/12/2024')
  `);

  console.log('Banco de dados inicializado com sucesso!');
});

db.close(); 