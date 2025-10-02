# 📐 Requisitos Não Funcionais – UniLibris

Os requisitos não funcionais definem **como o sistema deve se comportar**, garantindo qualidade, desempenho e segurança.

---

## 🎨 Usabilidade
- O sistema deve ser responsivo, funcionando em **desktop e mobile** (PWA).
- A interface deve ser simples e intuitiva para alunos e bibliotecários.

## 🔐 Segurança
- Apenas e-mails institucionais `@fatec.sp.gov.br` devem ser aceitos para cadastro/login.
- As senhas devem ser armazenadas de forma hasheada com Argon2id (com salt e parâmetros seguros).
- Perfis de usuário devem ser separados por **roles** (Aluno x Bibliotecário).

## ⚡ Performance
- O sistema deve suportar pelo menos **100 usuários simultâneos** sem perda de desempenho.
- Consultas ao acervo devem ser respondidas em menos de **2 segundos** em condições normais.

## 📈 Confiabilidade
- O sistema deve garantir consistência nos registros de empréstimos e devoluções.
- Deve haver backup automático periódico do banco de dados.

## 🌐 Compatibilidade
- O sistema deve rodar em navegadores modernos (Chrome, Firefox, Edge, Safari).
- O backend deve expor APIs RESTful para futura integração com outros sistemas acadêmicos.

## 🛠️ Manutenibilidade
- O código deve estar organizado em **frontend**, **backend** e **docs**.
- Deve haver testes automatizados de autenticação, cadastro e fluxo de empréstimos.

## 📊 Escalabilidade
- O sistema deve suportar crescimento gradual do número de alunos e bibliotecários sem degradação de desempenho.
- A arquitetura deve permitir balanceamento de carga no backend (API Node.js/Express).
- O banco de dados PostgreSQL deve ser capaz de lidar com partições e índices otimizados para consultas em grandes volumes de livros e históricos.
- O sistema deve permitir futura migração para infraestrutura em nuvem (ex.: AWS, Azure, GCP) para escalar horizontalmente.
- A API deve estar preparada para integração com outros sistemas acadêmicos no futuro.
