# 📘 Planejamento do Projeto UniLibris  
## 5W2H + Planejamento de Investimento  

---

# 🧩 1. WHY – Por que o UniLibris deve ser desenvolvido?

O UniLibris nasce da necessidade real de modernizar e automatizar o processo de gestão de bibliotecas acadêmicas.  
Problemas atuais:

- Empréstimos feitos de forma manual ou em planilhas.  
- Falta de organização e demora na emissão de relatórios.  
- Ausência de catálogo digital com disponibilidade em tempo real.  
- Falta de notificação de atrasos e histórico de empréstimos.  
- Dificuldade de controle do acervo.

**Impactos e razões comerciais:**

- Automatiza processos, reduz erros e aumenta eficiência.  
- Reduz extravios de livros e atrasos.  
- Cria base para futuros contratos com Fatecs e bibliotecas.  
- Possibilidade de modelo SaaS de baixo custo.  
- Projeto escalável e open-source.

---

# 🏗️ 2. WHAT – O que será desenvolvido? (Escopo Técnico)

O projeto seguirá *exatamente* a arquitetura do repositório:

### ✔ Módulo de Autenticação
- Login Admin  
- Login Usuário  
- Permissões e níveis de acesso

### ✔ Módulo de Acervo
- Cadastro de livros, autores, categorias, editoras  
- Edição e exclusão  
- Listagem paginada

### ✔ Módulo de Empréstimos
- Criar, renovar, devolver  
- Penalidades automáticas  
- Histórico de usuários

### ✔ Dashboard Administrativo
- Indicadores  
- Livros emprestados  
- Livros atrasados  
- Logs e relatórios

### ✔ Catálogo Público
- Busca  
- Detalhes do livro  
- Disponibilidade em tempo real

### ✔ Documentação
- Diagramas  
- Fluxos  
- API  
- Arquitetura

### ✔ Deploy
- Docker + Docker Compose  
- Deploy em VPS/Render/Railway

---

# 🗓️ 3. WHEN – Cronograma e Entregas (4 meses)

### **Cronograma Oficial**
| Etapa | Entrega | Período | Marco |
|------|---------|---------|--------|
| **1. Planejamento e Setup** | Estrutura base + docs | Semanas 1–2 | ✔ Planejamento entregue |
| **2. Backend – Autenticação** | Login + Prisma + PostgreSQL | Semanas 3–4 | ✔ Login funcionando |
| **3. Backend – Acervo** | CRUD de livros e autores | Semanas 5–6 | ✔ Acervo funcional |
| **4. Backend – Empréstimos** | Regras completas | Semanas 7–8 | ✔ Empréstimos ativos |
| **5. Frontend – Público** | Catálogo + busca | Semanas 9–10 | ✔ Catálogo online |
| **6. Frontend – Administrador** | Dashboard + CRUD | Semanas 11–12 | ✔ Dashboard |
| **7. Documentação Final** | Manual + API | Semana 13 | ✔ Documentação |
| **8. Deploy Final** | Docker + VPS | Semanas 14–16 | ✔ Sistema no ar |

---

# 👥 4. WHO – Papéis e Responsabilidades

| Papel | Pessoas | Responsabilidades |
|-------|---------|------------------|
| Product Owner | 1 | Requisitos, visão do produto |
| Tech Lead | 1 | Arquitetura, revisão técnica |
| Backend Dev | 1–2 | API, banco, Prisma |
| Frontend Dev | 1–2 | Telas, UX, integração |
| DevSecOps | 1 | Docker, deploy, CI/CD |
| UX/UI Designer | 1 | Wireframes, protótipos |
| QA Tester | 1 | Testes, cenários, validação |

**Total recomendado: 6 pessoas**

---

# 📍 5. WHERE – Localização das Atividades

- **Repositório GitHub**: código, issues, documentação  
- **GitHub Projects**: gestão do projeto  
- **VPS / Render / Railway**: ambiente de produção  
- **Usuários finais**: bibliotecários, alunos e professores  
- **Clientes**: Fatecs e bibliotecas

---

# ⚙️ 6. HOW – Como o projeto será desenvolvido? (Estratégia)

### Estratégia Técnica
- Frontend: **Next.js + React**  
- Backend: **Node.js + Express + Prisma**  
- Banco: **PostgreSQL**  
- Deploy: **Docker**  
- Padrões REST  
- Autenticação JWT  
- Testes com Jest/Supertest  
- Code Review obrigatório

### Estratégia Gerencial
- Metodologia: **Scrum Adaptado**  
- Sprints semanais  
- Kanban no GitHub Projects  
- Releases versionadas (`v0.1`, `v0.2` etc.)  

---

# 💰 7. HOW MUCH – Quanto custará?

### Estimativa Realista (4 meses)
| Item | Custo |
|------|--------|
| Desenvolvimento (4 devs por 4 meses) | R$ 64.000 |
| UX/UI Designer | R$ 5.000 |
| DevSecOps | R$ 4.000 |
| QA | R$ 8.000 |
| Infra | R$ 1.500 |
| Ferramentas | R$ 500 |
| **Total** | **R$ 83.000** |

### Valor solicitado aos investidores:
## **➡️ R$ 85.000**

---

# 🏆 Proposta dos Investidores – Respostas

### ✔ 1. Quanto vocês querem?  
**R$ 85.000**

### ✔ 2. Etapas com datas  
(Ver cronograma acima — principal artefato)

### ✔ 3. Quantas pessoas por especialidade?  
**6 pessoas** (tabela WHO)

### ✔ 4. Como definir papéis e responsabilidades?  
- Por função  
- Por especialidade  
- Por senioridade  
- Por propriedade das entregas  

### ✔ 5. Como manter a equipe motivada?
- Cultura de propósito (impacto social)  
- Bônus por milestone entregue  
- Transparência total no GitHub  
- Deploy contínuo mostrando progresso  
- Reuniões curtas e objetivas  
- Reconhecimento no documento e landing page
