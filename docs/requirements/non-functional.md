# 📐 Requisitos Não Funcionais — UniLibris

Os requisitos não funcionais garantem a qualidade, segurança e estabilidade do sistema **UniLibris**, assegurando o bom funcionamento em ambiente acadêmico, tanto para alunos quanto para bibliotecários.

---

## 🎨 Usabilidade

- O sistema deve ser **totalmente responsivo**, oferecendo experiência fluida em **desktop, tablet e mobile (PWA)**.  
- A interface deve priorizar **simplicidade, clareza e acessibilidade**, com **navegação intuitiva**.  
- Elementos de **feedback visual** (toasts, carregamento, confirmações) devem ser consistentes e informativos.

---

## 🔐 Autenticação e Segurança

- **Autenticação híbrida:**
  - **JWT** com senhas hasheadas via **Argon2id (Argon2)** para logins locais;
  - **OAuth (planejado)** via **Microsoft Entra ID (SSO)**, garantindo autenticação segura e integração com o ambiente institucional Microsoft 365;
  - Restrito a e-mails institucionais:
    - `@fatec.sp.gov.br`
    - `@cps.sp.gov.br`
- **Validação:** todas as rotas e formulários devem ser validados com **Zod**.  
- **Criptografia:** comunicações sob **HTTPS/TLS** obrigatórias.  
- **Controle de acesso (RBAC):** perfis **aluno** e **bibliotecário** com permissões distintas.  
- **Monitoramento:** **Sentry** (erros/performance) + logs estruturados com **Winston**.  
- **Scans automáticos:** **Prowler** (cloud security) + **GitHub Dependabot** (vulnerabilidades de dependência).  
- **LGPD:** armazenamento mínimo de dados e **política de privacidade acessível** no sistema.

---

## ⚡ Performance

- O sistema deve suportar **mínimo 100 usuários simultâneos** sem degradação perceptível.  
- Consultas ao acervo devem responder em **≤ 2 segundos** sob carga média.  
- Tempo médio de autenticação **≤ 1,5 segundo**.  
- Geração de relatórios **≤ 3 segundos** para até **5.000 registros**.  

---

## 📈 Confiabilidade

- O sistema deve garantir **consistência transacional** entre empréstimos, devoluções e reservas.  
- Deve possuir **backup automático do banco de dados** com possibilidade de restauração manual.  
- O backend deve lidar com **falhas de rede** e realizar **retentativas automáticas** de operação.  
- **Logs críticos** devem ser armazenados de forma persistente (Winston + volumes Docker).  

---

## 🌐 Compatibilidade

- Compatível com os navegadores modernos: **Chrome, Firefox, Edge e Safari**.  
- Backend expõe **APIs RESTful padronizadas (JSON)** para integração com sistemas acadêmicos.  
- Compatível com ambientes **Docker/Linux** e preparado para **migração futura para nuvem (AWS, Azure, GCP)**.  

---

## 🛠️ Manutenibilidade

- Código organizado em **frontend**, **backend** e **documentação**.  
- Padrões de código e formatação definidos com **ESLint** e **Prettier**.  
- Testes automatizados (unitários e integração) para **autenticação**, **cadastro** e **empréstimos**.  
- **CI/CD** com **GitHub Actions** — execução automática de build e lint a cada *commit* principal.  
- Logs estruturados e documentação atualizada para facilitar depuração e suporte.  

---

## 📊 Escalabilidade

- Arquitetura baseada em **contêineres Docker**, permitindo escalar cada serviço separadamente.  
- Banco **PostgreSQL** com **índices otimizados** e **partições configuráveis**.  
- API Node.js compatível com **balanceamento de carga horizontal**.  
- Preparado para **clusters Docker Swarm / Kubernetes**.  
- Integrações com **releases e automações de atualização** são opcionais, controladas pelo bibliotecário.  

---

## ⚙️ Automação e Processos Inteligentes

- **Lembretes automáticos** (atrasos, devoluções) baseados em regras heurísticas — *sem uso direto de IA*.  
- **Catalogação MARC21 automatizada** (parser e importação de registros).  
- **Geração periódica de relatórios** em **PDF e CSV**.  
- **Busca aprimorada** com **Full Text Search (FTS)** e **trigramas**, com futura extensão semântica planejada.  
- **Atualização manual de versão** via painel do bibliotecário após notificação de *release*.  

---

## 💾 Backup e Recuperação

- Backups automáticos diários do banco PostgreSQL.
- Retenção mínima de **30 dias** com logs de restauração.
- Restauração validada a cada novo release do sistema.

---

## 🧪 Testabilidade e Qualidade

- Testes de carga e desempenho com **Apache JMeter**.
- Testes unitários e de integração planejados via **Jest**.
- Cobertura mínima exigida: **80%** do código principal.
- Linting automático com **ESLint** + **Prettier** (CI/CD).
