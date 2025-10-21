# 📚 Metodologia de Catalogação — UniLibris

O **UniLibris** adota uma metodologia de catalogação baseada nos principais padrões internacionais utilizados em sistemas de bibliotecas acadêmicas, garantindo compatibilidade com plataformas como **Biblivre**, **Koha**, **Pergamum** e **Sophia**.

---

## 🧩 Padrões Adotados

| Camada | Padrão | Descrição | Aplicação no UniLibris |
|---------|---------|------------|------------------------|
| **Requisitos Funcionais** | **FRBR / FRAD** | Define entidades e relacionamentos entre obras, expressões, manifestações e itens. | Estrutura hierárquica no banco: título (obra), edição (manifestação), exemplar (item). Controle de autoridades (autores e assuntos). |
| **Orientações de Catalogação** | **AACR2 / ISBD** | Define as regras de preenchimento e pontuação dos dados bibliográficos. | Formulários seguem o formato AACR2, e a exibição pública usa pontuação ISBD (ex: `Título : subtítulo / autor. — edição. — local : editora, ano.`). |
| **Padrões de Metadados** | **MARC21** | Estrutura lógica de campos e subcampos bibliográficos. | Implementação direta via mapper MARC21 e suporte a importação/exportação em formato binário ISO 2709. |
| **Sintaxe de Codificação** | **ISO 2709 (MARC Binário)** | Define a forma de armazenamento e intercâmbio dos registros bibliográficos. | Uso do formato MARC21 puro, compatível com Biblivre. |

---

## 🔍 O que é MARC21 (ISO 2709)

O **MARC21 (MAchine Readable Cataloging)** é o padrão internacional usado para **representar e trocar registros bibliográficos legíveis por máquina**.  
Cada registro MARC é estruturado em **campos numéricos** (ex: `245`, `100`, `650`), **subcampos** (ex: `$a`, `$b`) e **indicadores** que definem o significado dos dados.

### 🧠 Estrutura Básica do Registro MARC21

1. **Leader (Líder):** 24 caracteres com informações sobre o tipo e o status do registro.  
2. **Directory (Diretório):** lista os campos e posições dentro do registro.  
3. **Campos de dados:** armazenam informações bibliográficas.  
4. **Delimitadores:** separam subcampos e campos.

📘 **Exemplo textual:**
```plaintext
=LDR 00000nam a2200000 a 4500
=100 1\$aSilva, João da.
=245 10$aIntrodução à Ciência da Informação :$bconceitos e aplicações.
=260 \$aSão Paulo :$bAtlas,$c2023.
=020 \$a9788535245892
```

➡️ **Interpretação (AACR2/ISBD):**  
Silva, João da. *Introdução à Ciência da Informação : conceitos e aplicações.* — São Paulo : Atlas, 2023. — ISBN 9788535245892

---

## ⚙️ Aplicação no UniLibris

- O sistema salva e lê registros **MARC21 binários (ISO 2709)**;  
- Permite **cadastrar via campos normalizados** e **editar diretamente o MARC**;  
- Gera e importa arquivos `.mrc` e `.iso` compatíveis com o **Biblivre**;  
- Exibição e pontuação seguem **AACR2 e ISBD**;  
- Preparado para futura integração com **RDA e BIBFRAME**.
