# 💸 Controle de Gastos — API REST

API REST para controle de gastos pessoais, desenvolvida como projeto final do BootCamp.

## 👥 Integrantes
| Nome | Matrícula |
|------|-----------|
| Ian Clau | 000001 |

## 🚀 Tecnologias
- Node.js + Express
- Supabase (PostgreSQL)
- Jest + Supertest
- GitHub Actions (CI)
- Render (Deploy)

## 🔗 Links
- **API em produção:** https://seu-app.onrender.com
- **Repositório:** https://github.com/Ian07312/controle-de-gastos

## ⚙️ Como rodar localmente
```bash
git clone https://github.com/Ian07312/controle-de-gastos.git
cd controle-de-gastos
npm install
cp .env.example .env  # preencha com suas credenciais Supabase
npm run dev
```

## 📋 Endpoints
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /expenses | Lista todos os gastos |
| GET | /expenses/summary | Resumo total por categoria |
| POST | /expenses | Cria um novo gasto |
| PATCH | /expenses/:id | Edita um gasto |
| DELETE | /expenses/:id | Remove um gasto |

## 📦 Exemplo de uso

### Criar um gasto
```json
POST /expenses
{
  "title": "Mercado",
  "amount": 150.00,
  "category": "Alimentação"
}
```