const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/db/supabase', () => {
  const mockData = [{ id: 'fake-id', title: 'Mercado', amount: 150.00, category: 'Alimentação' }];

  const mockChain = {
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    order: jest.fn().mockResolvedValue({ data: mockData, error: null }),
    eq: jest.fn().mockResolvedValue({ error: null }),
  };

  mockChain.select.mockReturnValue(mockChain);
  mockChain.insert.mockReturnValue({ select: jest.fn().mockResolvedValue({ data: mockData, error: null }) });
  mockChain.delete.mockReturnValue({ eq: jest.fn().mockResolvedValue({ error: null }) });

  return {
    from: jest.fn(() => mockChain),
  };
});

describe('GET /', () => {
  it('deve retornar status online', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('API Controle de Gastos online 🚀');
  });
});

describe('GET /expenses', () => {
  it('deve listar os gastos', async () => {
    const res = await request(app).get('/expenses');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /expenses', () => {
  it('deve retornar 400 se campos obrigatórios não forem enviados', async () => {
    const res = await request(app).post('/expenses').send({});
    expect(res.status).toBe(400);
  });

  it('deve criar um gasto com sucesso', async () => {
    const res = await request(app)
      .post('/expenses')
      .send({ title: 'Mercado', amount: 150.00, category: 'Alimentação' });
    expect(res.status).toBe(201);
  });
});

describe('DELETE /expenses/:id', () => {
  it('deve deletar um gasto', async () => {
    const res = await request(app).delete('/expenses/fake-id');
    expect(res.status).toBe(204);
  });
});