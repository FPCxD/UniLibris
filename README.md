# UniLibris
UniLibris é um sistema de biblioteca universitária acessível tanto para bibliotecários quanto para alunos.  
Desenvolvido como site responsivo/PWA (Next.js no frontend, Node.js/Express no backend e PostgreSQL no banco de dados), oferece funcionalidades de cadastro e administração do acervo, controle de empréstimos/devoluções e consulta de disponibilidade de livros.  


## 📖 Origem do Nome

O nome **UniLibris** foi escolhido para refletir diretamente o propósito do sistema:

- **"Uni"** → abreviação de **Universidade**, representando o ambiente acadêmico para o qual o projeto é destinado.  
- **"Libris"** → deriva do **latim *liber***, que significa **livro**. O termo também aparece em expressões como *ex libris* (“dos livros de”), sempre relacionado ao conhecimento e à literatura.  

Assim, **UniLibris** pode ser interpretado como **“Livros da Universidade”** ou **“Biblioteca Universitária”**, transmitindo a ideia de um acervo acadêmico organizado e acessível para bibliotecários, professores e  alunos.  


### ✨ Valores transmitidos pelo nome
- **Simplicidade** → curto, fácil de pronunciar e memorizar.  
- **Identidade acadêmica** → conecta-se ao contexto universitário.  
- **Tradição + inovação** → combina uma raiz clássica (*libris*) com uma abordagem tecnológica moderna (site responsivo/PWA).

---

## 🚀 Tecnologias Utilizadas (planejadas)

- **Frontend:** [Next.js](https://nextjs.org/) (React) + [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) (gerenciado: [Neon](https://neon.tech/) ou [Supabase](https://supabase.com/))
- **ORM/Schema:** [Prisma](https://www.prisma.io/)
- **Validação:** [Zod](https://zod.dev/)
- **Autenticação:** 
  - JWT (senhas hasheadas com **Argon2id**) → [Argon2](https://github.com/ranisalt/node-argon2)  
  - OAuth via [Microsoft Entra ID](https://www.microsoft.com/pt-br/security/business/identity-access/microsoft-entra-id) (restrito a `@fatec.sp.gov.br`)
- **E-mails transacionais:** [SendGrid](https://sendgrid.com/) (free tier) ou SMTP institucional
- **Hospedagem (custo baixo/grátis):**
  - **Frontend:** [Vercel](https://vercel.com/) (Free)
  - **Backend (Express):** [Railway](https://railway.app/) (Free) ou [Render](https://render.com/) (Free)
  - **PostgreSQL:** [Neon](https://neon.tech/) (Free) ou [Supabase](https://supabase.com/) (Free)
- **Observabilidade:** [Sentry](https://sentry.io/welcome/)

---

## 📂 Estrutura de Pastas

O projeto está organizado da seguinte forma:

```plaintext
unilibris/
│
├── backend/                             # API em Node.js/Express + integração com banco PostgreSQL
│   └── README.md
│
├── frontend/                            # Aplicação Next.js (interface do aluno e do bibliotecário)
│   └── README.md
│
├── docs/                                # Documentação completa do projeto
│   ├── README.md           
│   ├── prototipos/                      # Pasta para protótipos de UI/UX (wireframes e mockups).
|   |   ├── wireframe-aluno.md           # Dashboard do aluno
|   |   ├── wireframe-bibliotecario.md   # Dashboard do bibliotecário
|   |   ├── img_desktop/                 # Dashboards visuais (desktop)
|   |   │   ├── aluno.png
|   |   │   ├── forgot-password.png
|   |   │   ├── login.png
|   |   │   ├── acervo.png
|   |   │   ├── emprestimos.png
|   |   │   ├── relatorios_.png
|   |   │   ├── usuarios.png
|   |   │   ├── dashboard_bibliotecario.png
|   |   │   ├── logout.png
|   |   │   └── register.png
|   |   ├── img_mobile/                  # Dashboards visuais (mobile)
|   |   │   ├── aluno.jpg
|   |   │   ├── forgot-password.jpg
|   |   │   ├── login.jpg
|   |   │   ├── acervo.jpg
|   |   │   ├── emprestimos.jpg
|   |   │   ├── relatorios_.jpg
|   |   │   ├── usuarios.jpg
|   |   │   ├── dashboard_bibliotecario.jpg
|   |   │   ├── logout.jpg
|   |   │   └── register.jpg
|   |   └── README.md
│   ├── requirements/
|   |   └── non-functional.md            # Requisitos Não Funcionais 
|   └── uml/                             # Pasta para diagramas UML
|       ├── fluxograma.png               # Fluxograma geral do sistema, mostrando o fluxo de uso entre alunos e bibliotecários
|       ├── casos_de_uso_.png             # Diagrama de casos de uso UML, ilustrando os atores e funcionalidades principais
|       ├── sequencia_aluno.png          # Diagrama de sequência UML mostrando a interação de um aluno consultando livros
|       ├── sequencia_bibliotecario.png  # Diagrama de sequência UML mostrando a interação de um bibliotecário cadastrando livros
|       └── sequencia_login.png          # Diagrama de sequência UML mostrando a interação de login com validação de role    
|
└── README.md                            # Apresentação geral do projeto
```

---

## 🗂️ Funcionalidades Principais (planejadas)
- [ ] Cadastro e administração do acervo de livros  
- [ ] Controle de empréstimos e devoluções  
- [ ] Consulta de disponibilidade de livros pelos alunos  
- [ ] Área do bibliotecário com dashboards de gestão  
- [ ] Área do aluno com histórico de empréstimos  
- [ ] Notificações (atrasos/devoluções)

---

## 🧪 História de usuário e Gherkin
Este projeto adota **Behavior Driven Development (BDD)**.
As histórias de usuário e os cenários estão descritos em https://github.com/users/FPCxD/projects/1.

---

## 📐 Requisitos Não Funcionais
Os requisitos não funcionais estão descritos em [Requisitos Não Funcionais](docs/requirements/non-functional.md)

---

## 🎨 Protótipos
### Diagramas UML (casos de uso, fluxograma e sequência)

- **Casos de uso**  
<p align="center">
  <img src="docs/uml/casos_de_uso_.png" alt="Diagrama de Casos de Uso" width="480"/>
</p>

- **Fluxograma**  
<p align="center">
  <img src="docs/uml/fluxograma.png" alt="Fluxograma Geral" width="480"/>
</p>

- **Diagrama de sequência (Aluno)**  
<p align="center">
  <img src="docs/uml/sequencia_aluno.png" alt="Diagrama de Sequência - Aluno" width="700"/>
</p>

- **Diagrama de sequência (Bibliotecário)**  
<p align="center">
  <img src="docs/uml/sequencia_bibliotecario.png" alt="Diagrama de Sequência - Bibliotecário" width="700"/>
</p>

- **Diagrama de sequência (Login)**  
<p align="center">
  <img src="docs/uml/sequencia_login.png" alt="Diagrama de Sequência - Login" width="700"/>
</p>

  
### Protótipo de interface (UI/UX)
#### 🖥️ Dashboards – Desktop

- **Aluno**
<p align="center">
  <img src="./docs/prototipos/img_desktop/aluno.png" alt="Dashboard do Aluno – Desktop" width="850"/>
</p>

- **Dashboard (bibliotecário)**
<p align="center">  
  <img src="./docs/prototipos/img_desktop/dashboard_bibliotecario.png" alt="Dashboard do Bibliotecário – Desktop" width="850"/>
</p>

- **Acervo (bibliotecário)**
<p align="center"> 
  <img src="./docs/prototipos/img_desktop/acervo.png" alt="Dashboard de acervo (bibliotecário) – Desktop" width="850"/>
</p>

- **Empréstimos (bibliotecário)**
<p align="center"> 
  <img src="./docs/prototipos/img_desktop/emprestimos.png" alt="Dashboard de empréstimos (bibliotecário) – Desktop" width="850"/>
</p>

- **Relatórios (bibliotecário)**
<p align="center"> 
  <img src="./docs/prototipos/img_desktop/relatorios_.png" alt="Dashboard de relatórios (bibliotecário) – Desktop" width="850"/>
</p>

- **Usuários (bibliotecário)**
<p align="center"> 
  <img src="./docs/prototipos/img_desktop/usuarios.png" alt="Dashboard de usuários (bibliotecário) – Desktop" width="850"/>
</p>

- **Notificações (bibliotecário)**
<p align="center"> 
  <img src="./docs/prototipos/img_desktop/notificacoes.png" alt="Dashboard de notificações (bibliotecário) – Desktop" width="850"/>
</p>

---

#### 🔑 Telas de Acesso – Desktop

- **Login**
<p align="center"> 
  <img src="./docs/prototipos/img_desktop/login.png" alt="Login – Desktop" width="850"/>
</p>

- **Recuperar senha**
<p align="center"> 
  <img src="./docs/prototipos/img_desktop/forgot-password.png" alt="Esqueci minha senha – Desktop" width="850"/>
</p>

- **Cadastro**
<p align="center">
  <img src="./docs/prototipos/img_desktop/register.png" alt="Cadastro – Desktop" width="850"/>
</p>

- **Logout**
<p align="center">
  <img src="./docs/prototipos/img_desktop/logout.png" alt="Logout – Desktop" width="850"/>
</p>

---

#### 📱 Dashboards – Mobile

- **Aluno**
<p align="center">
  <img src="./docs/prototipos/img_mobile/aluno.jpg" alt="Dashboard do Aluno – Mobile" width="250"/>
</p>

- **Dashboard (bibliotecário)**
<p align="center">  
  <img src="./docs/prototipos/img_mobile/dashboard_bibliotecario.jpg" alt="Dashboard do Bibliotecário – Mobile" width="250"/>
</p>

- **Acervo (bibliotecário)**
<p align="center"> 
  <img src="./docs/prototipos/img_mobile/acervo.jpg" alt="Dashboard de acervo (bibliotecário) – Mobile" width="250"/>
</p>

- **Empréstimos (bibliotecário)**
<p align="center"> 
  <img src="./docs/prototipos/img_mobile/emprestimos.jpg" alt="Dashboard de empréstimos (bibliotecário) – Mobile" width="250"/>
</p>

- **Relatórios (bibliotecário)**
<p align="center"> 
  <img src="./docs/prototipos/img_mobile/relatorios_.jpg" alt="Dashboard de relatórios (bibliotecário) – Mobile" width="250"/>
</p>

- **Usuários (bibliotecário)**
<p align="center"> 
  <img src="./docs/prototipos/img_mobile/usuarios.jpg" alt="Dashboard de usuários (bibliotecário) – Mobile" width="250"/>
</p>

- **Notificações (bibliotecário)**
<p align="center"> 
  <img src="./docs/prototipos/img_mobile/notificacoes.jpg" alt="Dashboard de notificações (bibliotecário) – Mobile" width="250"/>
</p>

---

#### 🔑 Telas de Acesso – Mobile

- **Login**
<p align="center">
  <img src="./docs/prototipos/img_mobile/login.jpg" alt="Login – Mobile" width="250"/>
</p>

- **Recuperar senha**
<p align="center"> 
  <img src="./docs/prototipos/img_mobile/forgot-password.jpg" alt="Esqueci minha senha – Mobile" width="250"/>
</p>

- **Cadastro**
<p align="center">
  <img src="./docs/prototipos/img_mobile/register.jpg" alt="Cadastro – Mobile" width="250"/>
</p>

- **Logout**
<p align="center">
  <img src="./docs/prototipos/img_mobile/logout.jpg" alt="Logout – Mobile" width="250"/>
</p>

---

## 📌 Status do Projeto

🚧 Em desenvolvimento — em fase de prototipagem.
