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

**Total recomendado: 7 pessoas**

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

A estimativa de custos considera uma equipe enxuta, porém qualificada, trabalhando durante 4 meses.  
Todos os salários foram calculados com base na média do mercado brasileiro e ajustados pelo fator **1,8×** para contemplar encargos e impostos do regime CLT.

## 🧑‍🏫 7.1 Custos de Pessoal (com CLT incluso – 1,8×)

| Cargo | Qtde | Salário Médio Mensal (PJ) | Salário CLT (×1,8) | Custo total (4 meses) |
|------|------|----------------------------|---------------------|------------------------|
| Product Owner | 1 | R$ 4.000 | **R$ 7.200** | **R$ 28.800** |
| Tech Lead | 1 | R$ 6.000 | **R$ 10.800** | **R$ 43.200** |
| Backend Developer | 1 | R$ 4.000 | **R$ 7.200** | **R$ 28.800** |
| Frontend Developer | 1 | R$ 4.000 | **R$ 7.200** | **R$ 28.800** |
| DevSecOps (meio período) | 1 | R$ 2.000 | **R$ 3.600** | **R$ 14.400** |
| UX/UI Designer | 1 | R$ 3.000 | **R$ 5.400** | **R$ 5.400** (1 mês) |
| QA Tester | 1 | R$ 2.000 | **R$ 3.600** | **R$ 7.200** (2 meses) |

### ✔ Subtotal de mão de obra  
**R$ 156.600**

---

## 🧩 7.2 Infraestrutura e Ferramentas

| Despesa | Valor |
|--------|--------|
| VPS/Servidor + banco + backups | R$ 1.500 |
| Domínio + DNS + SSL | R$ 150 |
| Ferramentas (Figma, GitHub Pro, testes) | R$ 500 |

### ✔ Subtotal infraestrutura  
**R$ 2.150**

---

## 🧮 7.3 Total Geral do Projeto

| Categoria | Valor |
|----------|-------|
| Mão de obra CLT (4 meses) | R$ 156.600 |
| Infraestrutura | R$ 2.150 |
| **TOTAL FINAL ESTIMADO** | **R$ 158.750** |

---

## 💸 7.4 Valor solicitado ao Investidor

### **➡️ Valor solicitado: R$ 160.000**

Inclui uma reserva operacional de segurança de **0,8%**.

---

# 🎯 7.5 Justificativa Comercial para Investidores

Além do impacto social nas instituições e do potencial de expansão como plataforma SaaS para bibliotecas, foi incluído um benefício exclusivo para o investidor:

### ⭐ **Inserção de marca do investidor na tela de login**
Por contrato, o investidor terá:

- Logotipo exibido na **tela de login** como  
  “Sistema UniLibris – Patrocinado por *NOME DO INVESTIDOR*”
- Exposição por um período pré-definido (1 ano)
- Possibilidade de link para o site da empresa investidora
- Exibição nas versões web e mobile
- Repositório do GitHub conterá menção de:  
  “Financiado por *NOME DO INVESTIDOR* – Programa de Investimento Anjo”

### 🎁 Benefícios para o investidor:
- Fortalecimento de marca associada à educação, tecnologia e inovação  
- Alcance direto em Fatecs, Etecs, escolas e bibliotecas  
- Possibilidade de futuras renovações de branding  
- Utilização da plataforma como *case* de inovação patrocinada  
- Participação em eventos e apresentações do projeto  
- Vantagem de visibilidade em um sistema que será demonstrado publicamente

---

# 📌 7.6 Conclusão Financeira

O valor de **R$ 160.000** cobre:

- 4 meses de desenvolvimento completo  
- Pessoal CLT com encargos  
- Infraestrutura  
- Gestão e documentação completa  
- Margem de segurança  
- Retorno de marketing para o investidor  

O investimento é **sustentado**, **viável** e apresenta **crescimento escalável** para toda a rede de bibliotecas da Fatec e instituições futuras.

---

# 🏆 Proposta dos Investidores – Respostas

### ✔ 1. Quanto vocês querem?  
**R$ 160.000**

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
