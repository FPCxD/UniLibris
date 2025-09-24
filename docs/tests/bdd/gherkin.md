# 🧪 Cenários BDD (Gherkin) – UniLibris

---

## 🔐 **Login com e-mail institucional**
```
Funcionalidade: Login com e-mail institucional
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

## 📝 **Cadastro de novo usuário**
```
Funcionalidade: Cadastro de novo usuário
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

## 📖 **Consulta de livros**
```
Funcionalidade: Consulta de livros
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

## 🧑‍🎓 **Solicitação de empréstimo (Aluno)**
```
Funcionalidade: Solicitar empréstimo de livro
  Para retirar livros do acervo
  Como aluno logado
  Quero solicitar empréstimo de um livro disponível

  Cenário: Solicitar livro disponível com sucesso
    Dado que estou logado como aluno
    E estou na página "Consulta de livros"
    E o livro "Algoritmos Modernos" está "Disponível"
    Quando clico em "Solicitar Empréstimo" para o livro "Algoritmos Modernos"
    Então devo ver a mensagem "Solicitação registrada com sucesso"
    E o status do livro "Algoritmos Modernos" deve ser "Solicitado"

  Cenário: Impedir solicitação de livro emprestado
    Dado que estou logado como aluno
    E o livro "Estruturas de Dados" está "Emprestado"
    Quando tento solicitar empréstimo do livro "Estruturas de Dados"
    Então devo ver a mensagem "Livro indisponível para empréstimo"
    E o botão "Solicitar Empréstimo" deve estar desabilitado

  Cenário: Respeitar limite de empréstimos ativos
    Dado que estou logado como aluno
    E já possuo 3 empréstimos ativos
    Quando tento solicitar empréstimo do livro "Redes de Computadores"
    Então devo ver a mensagem "Limite de empréstimos ativos atingido"
    E a solicitação não deve ser criada
```

---

## 🗂 **Histórico de empréstimos (Aluno)**
```
Funcionalidade: Histórico de empréstimos do aluno
  Para acompanhar minhas retiradas e devoluções
  Como aluno logado
  Quero visualizar meu histórico com status e datas

  Cenário: Visualizar histórico com status
    Dado que estou logado como aluno
    E tenho no histórico o livro "Linguagens Formais" com status "Devolvido"
    E tenho no histórico o livro "Banco de Dados II" com status "Atrasado"
    Quando acesso a seção "Histórico de Empréstimos"
    Então devo ver uma linha para "Linguagens Formais" com status "Devolvido"
    E devo ver uma linha para "Banco de Dados II" com status "Atrasado"

  Cenário: Filtrar histórico por período
    Dado que estou na seção "Histórico de Empréstimos"
    Quando seleciono o período "01/08/2025 a 31/08/2025"
    Então devo ver apenas os empréstimos cujas datas estão dentro do período selecionado

  Cenário: Exibir multas em empréstimos atrasados
    Dado que possuo um empréstimo do livro "Cálculo I" com 3 dias de atraso
    Quando acesso a seção "Histórico de Empréstimos"
    Então devo ver o cálculo de multa correspondente exibido para "Cálculo I"
```

---

## 📑 **Controle de empréstimos (Bibliotecário)**
```
Funcionalidade: Controle de empréstimos
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

## 🗃️ **Gestão de acervo (Bibliotecário)**
```
Funcionalidade: Cadastro e manutenção do acervo
  Para manter o acervo atualizado
  Como bibliotecário
  Quero cadastrar, editar e remover livros

  Cenário: Cadastrar novo livro com sucesso
    Dado que estou logado como bibliotecário
    E estou na tela "Cadastrar Livro"
    Quando informo Título "Introdução a IA"
    E informo Autor "Ana Lima"
    E informo Categoria "TI"
    E informo ISBN "9781234567890"
    E salvo o cadastro
    Então devo ver a mensagem "Livro cadastrado com sucesso"
    E o livro "Introdução a IA" deve aparecer como "Disponível" na consulta

  Cenário: Impedir cadastro com ISBN duplicado
    Dado que existe no acervo um livro com ISBN "9781234567890"
    Quando tento cadastrar outro livro com o mesmo ISBN "9781234567890"
    Então devo ver a mensagem "ISBN já cadastrado"
    E o novo cadastro não deve ser salvo

  Cenário: Editar dados de um livro
    Dado que estou na tela de edição do livro "Introdução a IA"
    Quando altero a Categoria para "Inteligência Artificial"
    E salvo a edição
    Então devo ver a mensagem "Livro atualizado com sucesso"
    E na consulta o livro "Introdução a IA" deve aparecer com categoria "Inteligência Artificial"

  Cenário: Remover livro não emprestado
    Dado que o livro "Lógica Matemática" está "Disponível"
    Quando solicito a remoção do livro "Lógica Matemática"
    Então devo ver a mensagem "Livro removido do acervo"
    E o livro não deve mais aparecer na consulta

  Cenário: Impedir remoção de livro emprestado
    Dado que o livro "Compiladores" está "Emprestado"
    Quando tento remover o livro "Compiladores"
    Então devo ver a mensagem "Não é possível remover um livro emprestado"
    E o livro deve permanecer no acervo
```

---

## 📊 **Relatórios e Exportação (Bibliotecário)**
```
Funcionalidade: Relatórios e exportação de dados
  Para analisar o uso do acervo
  Como bibliotecário
  Quero gerar relatórios e exportá-los em formatos padrão

  Cenário: Relatório de livros mais emprestados por período
    Dado que estou logado como bibliotecário
    E estou na tela "Relatórios"
    Quando seleciono o período "01/08/2025 a 31/08/2025"
    E gero o relatório "Livros mais emprestados"
    Então devo ver uma lista ordenada por quantidade de empréstimos
    E cada item deve exibir "Título" e "Quantidade de empréstimos"

  Cenário: Exportar relatório em PDF
    Dado que visualizei o relatório "Livros mais emprestados"
    Quando clico em "Exportar PDF"
    Então o sistema deve gerar um arquivo PDF do relatório
    E o download do arquivo deve iniciar

  Cenário: Exportar acervo em CSV
    Dado que estou na seção "Acervo"
    Quando clico em "Exportar CSV"
    Então devo receber um arquivo CSV contendo as colunas "Título", "Autor", "Categoria", "Status" e "ISBN"

  Cenário: Baixar comprovante de empréstimo
    Dado que registrei um empréstimo para o aluno "João Santos" do livro "Sistemas Operacionais"
    Quando clico em "Baixar comprovante"
    Então devo fazer o download de um PDF com os dados do empréstimo
    E o comprovante deve conter aluno, livro, data de retirada e data prevista de devolução
```

---

## 🔑 **Recuperação de senha**
```
Funcionalidade: Recuperação de senha
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

## 🔔 **Notificações de atraso**
```
Funcionalidade: Notificações de atraso
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
