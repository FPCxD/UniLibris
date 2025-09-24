## 🔑 Login com e-mail institucional
**Funcionalidade:**
```
Login com e-mail institucional
  Para acessar o UniLibris
  Como aluno da Fatec
  Quero logar apenas com meu e-mail @fatec.sp.gov.br

  Cenário: Login válido como aluno
    Dado que estou na página de login
    Quando informo o e-mail "aluno@fatec.sp.gov.br" e a senha "SenhaValida123"
    E envio o formulário de login
    Então devo ser autenticado com sucesso
    E devo ver a rota "/aluno"

  Cenário: E-mail externo é rejeitado
    Dado que estou na página de login
    Quando informo o e-mail "teste@gmail.com" e a senha "qualquer"
    E envio o formulário de login
    Então devo ver a mensagem "⚠️ Utilize apenas seu e-mail institucional"
```

---

## 📝 Cadastro de novo usuário
**Funcionalidade:**
```
Cadastro de novo usuário
  Para ter acesso ao UniLibris
  Como aluno da Fatec
  Quero criar uma conta com meu e-mail institucional

  Cenário: Cadastro com sucesso
    Dado que estou na página de cadastro
    Quando informo nome "Nome Sobrenome"
    E informo e-mail "nome.sobrenome@fatec.sp.gov.br"
    E informo senha "SenhaForte123"
    E confirmo a senha
    E envio o formulário de cadastro
    Então devo ver a mensagem "Cadastro realizado com sucesso"
    E devo poder fazer login com as credenciais criadas
```

---

## 📖 Consulta de livros
**Funcionalidade:**
```
Consulta de livros
  Para encontrar materiais disponíveis
  Como aluno logado
  Quero buscar livros por título, autor ou categoria

  Cenário: Buscar livro disponível
    Dado que estou logado como aluno
    Quando pesquiso por "Banco de Dados"
    Então devo ver na lista o livro "Introdução a Banco de Dados"
    E o status deve ser "Disponível"
```

---

## 📚 Controle de empréstimos (Bibliotecário)
**Funcionalidade:**
```
Controle de empréstimos
  Para gerenciar o acervo da biblioteca
  Como bibliotecário
  Quero registrar empréstimos de alunos

  Cenário: Realizar empréstimo de livro
    Dado que estou logado como bibliotecário
    E o livro "Engenharia de Software" está "Disponível"
    Quando associo o livro ao aluno "Maria Souza"
    Então o status do livro deve mudar para "Emprestado"
    E deve ser registrado um empréstimo com data de retirada e devolução
```

---

## 🔒 Recuperação de senha
**Funcionalidade:**
```
Recuperação de senha
  Para recuperar acesso ao UniLibris
  Como usuário cadastrado
  Quero redefinir minha senha via link no e-mail institucional

  Cenário: Solicitar redefinição de senha
    Dado que estou na página de login
    Quando seleciono "Esqueci minha senha"
    E informo o e-mail "aluno@fatec.sp.gov.br"
    Então devo ver a mensagem "Um link de redefinição foi enviado ao seu e-mail institucional"

  Cenário: Redefinir senha com link válido
    Dado que recebi um link de redefinição válido
    Quando informo a nova senha "NovaSenha123"
    E confirmo a nova senha
    Então devo ver a mensagem "Senha redefinida com sucesso"
    E devo poder acessar com a nova senha
```

---

## 🔔 Notificações de atraso
**Funcionalidade:**
```
Notificações de atraso
  Para não perder prazos de devolução
  Como aluno
  Quero receber alertas sobre livros próximos ao vencimento ou atrasados

  Cenário: Alerta de devolução próxima
    Dado que estou logado como aluno
    E tenho o livro "Matemática Discreta" com devolução para amanhã
    Quando acesso o dashboard
    Então devo ver a notificação "⚠️ O livro Matemática Discreta vence amanhã"

  Cenário: Alerta de livro atrasado
    Dado que estou logado como aluno
    E tenho o livro "Lógica de Programação" com devolução vencida
    Quando acesso o dashboard
    Então devo ver a notificação "❌ O livro Lógica de Programação está atrasado"
```
