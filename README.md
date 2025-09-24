# UniLibris
UniLibris é um sistema de biblioteca universitária acessível tanto para bibliotecários quanto para alunos.  
Desenvolvido como site responsivo/PWA (Next.js no frontend, Node.js/Express no backend e PostgreSQL no banco de dados),  
oferece funcionalidades de cadastro e administração do acervo, controle de empréstimos/devoluções e consulta de disponibilidade de livros.  


## 📖 Origem do Nome

O nome **UniLibris** foi escolhido para refletir diretamente o propósito do sistema:

- **"Uni"** → abreviação de **Universidade**, representando o ambiente acadêmico para o qual o projeto é destinado.  
- **"Libris"** → deriva do **latim *liber***, que significa **livro**. O termo também aparece em expressões como *ex libris* (“dos livros de”), sempre relacionado ao conhecimento e à literatura.  

Assim, **UniLibris** pode ser interpretado como **“Livros da Universidade”** ou **“Biblioteca Universitária”**, transmitindo a ideia de um acervo acadêmico organizado e acessível tanto para bibliotecários, professores quanto para alunos.  


### ✨ Valores transmitidos pelo nome
- **Simplicidade** → curto, fácil de pronunciar e memorizar.  
- **Identidade acadêmica** → conecta-se ao contexto universitário.  
- **Tradição + inovação** → combina uma raiz clássica (*libris*) com uma abordagem tecnológica moderna (site responsivo/PWA).

---

## 🚀 Tecnologias Utilizadas (planejadas)
- **Frontend**: [Next.js](https://nextjs.org/) (React Framework)  
- **Backend**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)  
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)  
- **Estilização**: Tailwind CSS  
- **Autenticação**: JWT/OAuth
- **Hospedagem**: (a definir)

---

## 📂 Estrutura de Pastas

unilibris/
│
├── backend/               # API em Node.js/Express + integração com banco PostgreSQL
│   └── README.md
│
├── frontend/              # Aplicação Next.js (interface do aluno e do bibliotecário)
│   └── README.md
│
├── docs/                  # Documentação completa do projeto
│   ├── backlog.md         # Backlog do produto e histórias de usuário
│   ├── requirements/      # Requisitos funcionais e não funcionais
│   ├── prototipos/        # Wireframes, diagramas UML e fluxogramas
│   └── tests/
│       └── bdd/
│           └── gherkin.md # Cenários BDD escritos em Gherkin
│
└── README.md              # Apresentação geral do projeto

---

## 🗂️ Funcionalidades Principais (planejadas)
- [ ] Cadastro e administração do acervo de livros  
- [ ] Controle de empréstimos e devoluções  
- [ ] Consulta de disponibilidade de livros pelos alunos  
- [ ] Área do bibliotecário com dashboards de gestão  
- [ ] Área do aluno com histórico de empréstimos  
- [ ] Notificações (atrasos/devoluções)

---

## 📝 História de usuário
- **Como aluno**, quero consultar os livros disponíveis para saber se posso emprestar.  
- **Como aluno**, quero ver meu histórico de empréstimos e devoluções.
- **Como aluno**, quero receber alertas sobre devoluções próximas ou atrasadas.
- **Como bibliotecário**, quero cadastrar livros para manter o acervo atualizado.  
- **Como bibliotecário**, quero editar ou remover livros do acervo quando necessário.  
- **Como bibliotecário**, quero registrar empréstimos de livros para organizar o fluxo.
- **Como bibliotecário**, quero registrar devoluções para manter o estoque correto.
- **Como bibliotecário**, quero gerar relatórios de livros mais emprestados e pendentes.

---

## 🧪 Testes e BDD
Este projeto adota **Behavior Driven Development (BDD)**.
Os cenários estão descritos em [docs/tests/bdd/gherkin.md](./docs/tests/bdd/gherkin.md).

Exemplo:
```
Funcionalidade: Login com e-mail institucional
  Cenário: Login válido como aluno
    Dado que estou na página de login
    Quando informo o e-mail "aluno@fatec.sp.gov.br" e a senha "SenhaValida123"
    Então devo ser autenticado com sucesso
```

---

## 🎨 Protótipos
- Diagramas UML (casos de uso, sequência, fluxogramas)  
- Protótipo de interface

📌 Status do Projeto

🚧 Em desenvolvimento — ainda em fase de planejamento e prototipagem.
