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

O projeto está organizado da seguinte forma:

```plaintext
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
│   ├── requirements/      # Requisitos não funcionais
│   ├── prototipos/        # Wireframes, diagramas UML e fluxogramas
│   └── tests/
│       └── bdd/
│           └── gherkin.md # Cenários BDD escritos em Gherkin
│
└── README.md              # Apresentação geral do projeto
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

## 📝 História de usuário
- **Como aluno da Fatec**, quero **logar apenas com meu e-mail @fatec.sp.gov.br** para **acessar o UniLibris**.  
- **Como aluno da Fatec**, quero **criar uma conta com meu e-mail institucional** para **ter acesso ao UniLibris**.  
- **Como aluno logado**, quero **buscar livros por título, autor ou categoria** para **encontrar materiais disponíveis**.  
- **Como aluno logado**, quero **solicitar empréstimo de um livro disponível** para **retirar livros do acervo**, respeitando regras de limite e disponibilidade.  
- **Como aluno logado**, quero **visualizar meu histórico com status e datas** para **acompanhar minhas retiradas e devoluções**.  
- **Como aluno**, quero **receber alertas sobre devoluções próximas ou atrasadas** para **não perder prazos**.  
- **Como bibliotecário**, quero **registrar empréstimos de alunos** para **gerenciar o acervo da biblioteca**.  
- **Como bibliotecário**, quero **cadastrar, editar e remover livros do acervo** para **manter o acervo atualizado**, evitando duplicidade de ISBN e remoção de livros emprestados.  
- **Como bibliotecário**, quero **gerar relatórios de livros mais emprestados e pendentes**, além de **exportá-los em PDF**, para **analisar o uso do acervo**.  
- **Como usuário cadastrado**, quero **redefinir minha senha via link no e-mail institucional** para **recuperar acesso ao UniLibris**.

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
