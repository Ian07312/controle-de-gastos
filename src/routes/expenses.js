// Rotas CRUD para controle de gastos
const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');

// GET /expenses — listar todos os gastos
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET /expenses/summary — resumo total dos gastos
router.get('/summary', async (req, res) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('amount, category');
  if (error) return res.status(500).json({ error: error.message });
  const total = data.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const porCategoria = data.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});
  res.json({ total: total.toFixed(2), por_categoria: porCategoria });
});

// POST /expenses — criar novo gasto
router.post('/', async (req, res) => {
  const { title, amount, category } = req.body;
  if (!title || !amount || !category) {
    return res.status(400).json({ error: 'title, amount e category são obrigatórios' });
  }
  const { data, error } = await supabase
    .from('expenses')
    .insert([{ title, amount, category }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// PATCH /expenses/:id — editar gasto
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, amount, category } = req.body;
  const { data, error } = await supabase
    .from('expenses')
    .update({ title, amount, category })
    .eq('id', id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// DELETE /expenses/:id — deletar gasto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

module.exports = router;