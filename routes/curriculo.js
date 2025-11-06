const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  // ===== ENTIDADE PESSOAS =====
  
  // GET todas as pessoas
  router.get('/pessoas', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM pessoas');
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET pessoa por ID
  router.get('/pessoas/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM pessoas WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Pessoa não encontrada' });
      }
      
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST criar pessoa
  router.post('/pessoas', async (req, res) => {
    try {
      const { nome, email, telefone, endereco, resumo } = req.body;
      const result = await pool.query(
        'INSERT INTO pessoas (nome, email, telefone, endereco, resumo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nome, email, telefone, endereco, resumo]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT atualizar pessoa
  router.put('/pessoas/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email, telefone, endereco, resumo } = req.body;
      const result = await pool.query(
        'UPDATE pessoas SET nome = $1, email = $2, telefone = $3, endereco = $4, resumo = $5 WHERE id = $6 RETURNING *',
        [nome, email, telefone, endereco, resumo, id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Pessoa não encontrada' });
      }
      
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE pessoa
  router.delete('/pessoas/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('DELETE FROM pessoas WHERE id = $1 RETURNING *', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Pessoa não encontrada' });
      }
      
      res.json({ message: 'Pessoa deletada com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ===== ENTIDADE EXPERIENCIAS =====
  
  // GET todas as experiências
  router.get('/experiencias', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT e.*, p.nome as pessoa_nome 
        FROM experiencias e 
        JOIN pessoas p ON e.pessoa_id = p.id
      `);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET experiências por pessoa
  router.get('/experiencias/pessoa/:pessoa_id', async (req, res) => {
    try {
      const { pessoa_id } = req.params;
      const result = await pool.query(
        'SELECT * FROM experiencias WHERE pessoa_id = $1',
        [pessoa_id]
      );
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST criar experiência
  router.post('/experiencias', async (req, res) => {
    try {
      const { pessoa_id, empresa, cargo, periodo, descricao } = req.body;
      const result = await pool.query(
        'INSERT INTO experiencias (pessoa_id, empresa, cargo, periodo, descricao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [pessoa_id, empresa, cargo, periodo, descricao]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT atualizar experiência
  router.put('/experiencias/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { empresa, cargo, periodo, descricao } = req.body;
      const result = await pool.query(
        'UPDATE experiencias SET empresa = $1, cargo = $2, periodo = $3, descricao = $4 WHERE id = $5 RETURNING *',
        [empresa, cargo, periodo, descricao, id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Experiência não encontrada' });
      }
      
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE experiência
  router.delete('/experiencias/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('DELETE FROM experiencias WHERE id = $1 RETURNING *', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Experiência não encontrada' });
      }
      
      res.json({ message: 'Experiência deletada com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ===== ENTIDADE EDUCACAO =====
  
  // GET toda a educação
  router.get('/educacao', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT ed.*, p.nome as pessoa_nome 
        FROM educacao ed 
        JOIN pessoas p ON ed.pessoa_id = p.id
      `);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET educação por pessoa
  router.get('/educacao/pessoa/:pessoa_id', async (req, res) => {
    try {
      const { pessoa_id } = req.params;
      const result = await pool.query(
        'SELECT * FROM educacao WHERE pessoa_id = $1',
        [pessoa_id]
      );
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST criar educação
  router.post('/educacao', async (req, res) => {
    try {
      const { pessoa_id, instituicao, curso, periodo, descricao } = req.body;
      const result = await pool.query(
        'INSERT INTO educacao (pessoa_id, instituicao, curso, periodo, descricao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [pessoa_id, instituicao, curso, periodo, descricao]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT atualizar educação
  router.put('/educacao/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { instituicao, curso, periodo, descricao } = req.body;
      const result = await pool.query(
        'UPDATE educacao SET instituicao = $1, curso = $2, periodo = $3, descricao = $4 WHERE id = $5 RETURNING *',
        [instituicao, curso, periodo, descricao, id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Educação não encontrada' });
      }
      
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE educação
  router.delete('/educacao/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('DELETE FROM educacao WHERE id = $1 RETURNING *', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Educação não encontrada' });
      }
      
      res.json({ message: 'Educação deletada com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ===== ENTIDADE HABILIDADES =====
  
  // GET todas as habilidades
  router.get('/habilidades', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT h.*, p.nome as pessoa_nome 
        FROM habilidades h 
        JOIN pessoas p ON h.pessoa_id = p.id
      `);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET habilidades por pessoa
  router.get('/habilidades/pessoa/:pessoa_id', async (req, res) => {
    try {
      const { pessoa_id } = req.params;
      const result = await pool.query(
        'SELECT * FROM habilidades WHERE pessoa_id = $1',
        [pessoa_id]
      );
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST criar habilidade
  router.post('/habilidades', async (req, res) => {
    try {
      const { pessoa_id, habilidade, nivel } = req.body;
      const result = await pool.query(
        'INSERT INTO habilidades (pessoa_id, habilidade, nivel) VALUES ($1, $2, $3) RETURNING *',
        [pessoa_id, habilidade, nivel]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT atualizar habilidade
  router.put('/habilidades/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { habilidade, nivel } = req.body;
      const result = await pool.query(
        'UPDATE habilidades SET habilidade = $1, nivel = $2 WHERE id = $3 RETURNING *',
        [habilidade, nivel, id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Habilidade não encontrada' });
      }
      
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE habilidade
  router.delete('/habilidades/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('DELETE FROM habilidades WHERE id = $1 RETURNING *', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Habilidade não encontrada' });
      }
      
      res.json({ message: 'Habilidade deletada com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};