# 📐 Requisitos Não Funcionais – UniLibris

Este documento define critérios **mensuráveis** para qualidade do sistema.

## 1. Segurança
- **RNF-SEC-01 (Autenticação):** Apenas emails `@fatec.sp.gov.br`.  
  **Métrica:** 100% das tentativas com domínios externos rejeitadas.  
  **Validação:** testes de integração + revisão de logs.
- **RNF-SEC-02 (Senhas):** Hash com `bcrypt` custo ≥ 10.  
  **Métrica:** todas as senhas persistidas com hash e salt.  
  **Validação:** inspeção de banco + testes.
- **RNF-SEC-03 (Autorização por Role):** acesso a `/bibliotecario` apenas com role `bibliotecario`.  
  **Métrica:** 0 acessos indevidos em testes automatizados.  
  **Validação:** testes E2E (aluno não acessa rotas admin).
- **RNF-SEC-04 (Sessões):** JWT com expiração ≤ 8h e refresh seguro.  
  **Métrica:** tokens expiram no tempo configurado.  
  **Validação:** testes unitários/integração.

## 2. Desempenho
- **RNF-PERF-01 (Tempo de resposta API):** P95 ≤ 300 ms para `GET /livros` com 10k registros.  
  **Validação:** teste de carga (k6/Artillery).
- **RNF-PERF-02 (First Load):** P95 TTFB ≤ 500 ms em rede 4G.  
  **Validação:** Lighthouse/Pagespeed.
- **RNF-PERF-03 (Bundle):** JS inicial ≤ 200 KB gzip no dashboard do aluno.  
  **Validação:** relatório de build do Next.js.

## 3. Confiabilidade e Disponibilidade
- **RNF-REL-01 (Uptime):** ≥ 99,5% no horário letivo.  
  **Validação:** monitoramento (uptime checks).
- **RNF-REL-02 (Erros não tratados):** 0 exceções não capturadas em logs por release.  
  **Validação:** observabilidade.

## 4. Usabilidade & Acessibilidade
- **RNF-UX-01 (Responsividade):** suportar viewport ≥ 360px (mobile) a ≥ 1280px (desktop).  
  **Validação:** testes manuais/Playwright.
- **RNF-UX-02 (A11y):** pontuação Lighthouse Acessibility ≥ 90.  
  **Validação:** Lighthouse + axe.
- **RNF-UX-03 (Feedback de ação):** qualquer ação assíncrona deve exibir estado (loading/sucesso/erro).  
  **Validação:** revisão UI + testes E2E.

## 5. Manutenibilidade
- **RNF-MAN-01 (Cobertura):** testes unitários ≥ 70% lines nas camadas util/serviço.  
  **Validação:** cobertura via Jest.  
- **RNF-MAN-02 (Lint):** ESLint sem erros no CI.  
  **Validação:** job falha se houver erro.

## 6. Escalabilidade
- **RNF-SCA-01:** suportar 500 usuários ativos simultâneos com P95 API ≤ 500 ms.  
  **Validação:** teste de carga.

## 7. Observabilidade & Logs
- **RNF-OBS-01 (Traço):** cada requisição API com `requestId`.  
  **Validação:** inspeção de logs.
- **RNF-OBS-02 (Auditoria):** registrar operações de empréstimo/devolução (quem, o quê, quando).  
  **Validação:** consulta aos logs.

## 8. Proteção de Dados / Backup
- **RNF-DATA-01 (Backup):** snapshot diário do banco, retenção 7 dias.  
  **Validação:** execução de rotina e restauração mensal de teste.
- **RNF-DATA-02 (LGPD – minimização):** armazenar apenas dados necessários (nome, email, role).  
  **Validação:** revisão de esquema.

## 9. Portabilidade
- **RNF-PORT-01:** deploy em ambiente Linux x86-64 usando Node LTS.  
  **Validação:** pipeline de build.

---

## 📊 Matriz de rastreabilidade

| ID         | Métrica-chave                      | Teste/Validação             |
|------------|------------------------------------|-----------------------------|
| RNF-SEC-03 | 0 acessos indevidos a /bibliotecario | Testes E2E (Playwright)     |
| RNF-PERF-01| P95 ≤ 300 ms em /livros            | Teste de carga (k6)         |
| RNF-UX-02  | Lighthouse A11y ≥ 90               | CI Lighthouse               |
| RNF-MAN-02 | ESLint clean                       | Job de lint no CI           |

