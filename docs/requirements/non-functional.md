## 📐 Requisitos Não Funcionais

### 🎨 Usabilidade
- O sistema deve ser totalmente responsivo, com experiência fluida em desktop, tablet e mobile (PWA).  
- A interface deve priorizar simplicidade, clareza e acessibilidade, com navegação intuitiva.  
- Elementos de feedback visual (toasts, carregamento, confirmações) devem ser consistentes.  

---

### 🔐 Autenticação e Segurança

- **Autenticação híbrida:**
  - **JWT** com senhas hasheadas via **Argon2id (Argon2)** com **salt exclusivo por usuário**.
  - **OAuth (planejado)** via **Microsoft Entra ID (SSO)**, garantindo autenticação segura e integrada ao ambiente institucional Microsoft 365.  
  - Restrito a e-mails institucionais:
    - `@fatec.sp.gov.br`
    - `@cps.sp.gov.br`
- **Tokens de curta duração:** JWT com **expiração entre 5 e 15 minutos**, renovados via *refresh token* seguro (cookie `httpOnly`).  
- **Política de mínimo privilégio:** cada usuário acessa apenas o necessário conforme seu papel; ações administrativas exigem autenticação reforçada.  
- **Validação:** todas as rotas e formulários validados com **Zod**.  
- **Criptografia:** comunicações obrigatoriamente sob **HTTPS/TLS**.  
- **Controle de acesso (RBAC):** perfis **aluno** e **bibliotecário** com permissões distintas.  
- **Proteção contra força bruta:**
  - Limite de **5 tentativas** falhas em **15 minutos** (por IP e usuário);
  - Bloqueio temporário por **15 minutos** após o limite;
  - **Backoff exponencial** progressivo (ex.: +500 ms, +1 s, +2 s...);
  - **CAPTCHA adaptativo** após 3 falhas consecutivas;
  - **Mensagens genéricas** (“Credenciais inválidas”) para evitar *user enumeration*;
  - Registro de eventos e alertas em padrões suspeitos.
- **Monitoramento:** **Sentry** (erros/performance) + logs estruturados com **Winston**.  
- **Scans automáticos:** **Prowler** (cloud security) + **GitHub Dependabot** (vulnerabilidades de dependências).  
- **LGPD:** coleta mínima de dados pessoais, anonimização e política de privacidade acessível.  
- **Conformidade metodológica:** a política de segurança do projeto segue as diretrizes de:
  - **OWASP ASVS** — práticas de autenticação, gestão de sessão e proteção contra ataques;
  - **NIST SP 800-63B** — controle de sessão e autenticação de alta segurança;
  - **LGPD (Lei nº 13.709/2018)** — princípios de segurança, finalidade e minimização de dados.

---

### ⚡ Performance
- Suporte a **100 usuários simultâneos** sem degradação perceptível.  
- Consultas ao acervo ≤ **2 s** sob carga média.  
- Autenticação ≤ **1,5 s** em média.  
- Geração de relatórios ≤ **3 s** para até 5 000 registros.  

---

### 📈 Confiabilidade
- Consistência transacional entre empréstimos, devoluções e reservas.  
- Backups automáticos com restauração manual sob demanda.  
- Retentativas automáticas em falhas de rede.  
- Logs críticos persistentes via **Winston + volumes Docker**.  

---

### 🌐 Compatibilidade
- Suporte a **Chrome**, **Firefox**, **Edge** e **Safari** (versões modernas).  
- API **RESTful** padronizada em **JSON**.  
- Compatível com **Docker/Linux** e futura migração para **nuvem** (AWS, Azure, GCP).  

---

### 🛠️ Manutenibilidade
- Código dividido em **frontend**, **backend** e **docs**.  
- Padrões de formatação (**ESLint**, **Prettier**).  
- Testes automatizados (unitários e integração).  
- **CI/CD com GitHub Actions** em cada *commit* principal.  
- Logs estruturados e documentação técnica atualizada.  

---

### 📊 Escalabilidade
- Arquitetura containerizada para escalar serviços independentemente.  
- Banco **PostgreSQL** com índices otimizados e partições configuráveis.  
- API **Node.js** compatível com *load balancing*.  
- Suporte futuro a **Docker Swarm / Kubernetes**.  
- Atualizações opcionais controladas pelo **painel do bibliotecário**.  

---

### ⚙️ Automação e Processos Inteligentes
- **Lembretes automáticos** (atrasos e devoluções) com base em regras heurísticas — sem uso direto de IA.  
- **Catalogação MARC21** automatizada (parser e importação de registros).  
- **Relatórios periódicos** em PDF e CSV.  
- **Busca aprimorada** com *Full Text Search (FTS)* + trigramas (extensão semântica planejada).  
- **Atualização manual de versão** via painel do bibliotecário após notificação de novo *release*.

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
