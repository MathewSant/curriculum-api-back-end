-- Tabela de Pessoas
CREATE TABLE IF NOT EXISTS pessoas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT,
    resumo TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Experiências Profissionais
CREATE TABLE IF NOT EXISTS experiencias (
    id SERIAL PRIMARY KEY,
    pessoa_id INTEGER REFERENCES pessoas(id) ON DELETE CASCADE,
    empresa VARCHAR(100) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    periodo VARCHAR(50) NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Educação
CREATE TABLE IF NOT EXISTS educacao (
    id SERIAL PRIMARY KEY,
    pessoa_id INTEGER REFERENCES pessoas(id) ON DELETE CASCADE,
    instituicao VARCHAR(100) NOT NULL,
    curso VARCHAR(100) NOT NULL,
    periodo VARCHAR(50) NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Habilidades
CREATE TABLE IF NOT EXISTS habilidades (
    id SERIAL PRIMARY KEY,
    pessoa_id INTEGER REFERENCES pessoas(id) ON DELETE CASCADE,
    habilidade VARCHAR(100) NOT NULL,
    nivel VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados iniciais para DUAS pessoas

-- Pessoa 1: João Silva
INSERT INTO pessoas (nome, email, telefone, endereco, resumo) VALUES
(
    'João Silva',
    'joao.silva@email.com',
    '(11) 99999-9999',
    'São Paulo, SP',
    'Desenvolvedor Full Stack com 5 anos de experiência em JavaScript, React, Node.js e PostgreSQL. Apaixonado por criar soluções inovadoras e eficientes.'
);

-- Pessoa 2: Maria Santos
INSERT INTO pessoas (nome, email, telefone, endereco, resumo) VALUES
(
    'Maria Santos',
    'maria.santos@email.com',
    '(21) 88888-8888',
    'Rio de Janeiro, RJ',
    'Analista de Dados com expertise em Python, SQL e Machine Learning. Experiência em transformar dados em insights valiosos para negócios.'
);

-- Experiências do João
INSERT INTO experiencias (pessoa_id, empresa, cargo, periodo, descricao) VALUES
(1, 'Tech Solutions Ltda', 'Desenvolvedor Full Stack', '2020 - Presente', 'Desenvolvimento de aplicações web com React e Node.js'),
(1, 'Startup Inovadora', 'Desenvolvedor Front-end', '2018 - 2020', 'Criação de interfaces responsivas e otimização de performance');

-- Experiências da Maria
INSERT INTO experiencias (pessoa_id, empresa, cargo, periodo, descricao) VALUES
(2, 'Data Analytics Corp', 'Analista de Dados Sênior', '2019 - Presente', 'Análise de dados e criação de dashboards para tomada de decisão'),
(2, 'Consultoria Business', 'Analista de Dados Júnior', '2017 - 2019', 'Processamento e limpeza de dados para relatórios gerenciais');

-- Educação do João
INSERT INTO educacao (pessoa_id, instituicao, curso, periodo, descricao) VALUES
(1, 'Universidade Tecnológica', 'Bacharelado em Ciência da Computação', '2014 - 2018', 'Formação em desenvolvimento de software e algoritmos'),
(1, 'Digital College', 'Curso de React Avançado', '2019', 'Curso especializado em React Hooks e Redux');

-- Educação da Maria
INSERT INTO educacao (pessoa_id, instituicao, curso, periodo, descricao) VALUES
(2, 'Faculdade de Estatística', 'Bacharelado em Estatística', '2013 - 2017', 'Formação em análise estatística e probabilidade'),
(2, 'AI Academy', 'Machine Learning Professional', '2018', 'Especialização em algoritmos de machine learning');

-- Habilidades do João
INSERT INTO habilidades (pessoa_id, habilidade, nivel) VALUES
(1, 'JavaScript', 'Avançado'),
(1, 'React', 'Avançado'),
(1, 'Node.js', 'Avançado'),
(1, 'PostgreSQL', 'Intermediário'),
(1, 'Git', 'Avançado');

-- Habilidades da Maria
INSERT INTO habilidades (pessoa_id, habilidade, nivel) VALUES
(2, 'Python', 'Avançado'),
(2, 'SQL', 'Avançado'),
(2, 'Machine Learning', 'Intermediário'),
(2, 'Pandas', 'Avançado'),
(2, 'Tableau', 'Intermediário');