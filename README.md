# Dashboard de Agentes WhatsApp

Dashboard single-tenant, totalmente dockerizado, para orquestrar agentes de IA conectados ao WhatsApp. Inclui módulos configuráveis para prompt central, provedores de IA, memória, cadência de respostas, integrações Evolution, regras de acesso, handoff, consultas a especialistas, funis automáticos, follow-ups e biblioteca de mídias.

## Como executar

```bash
docker compose up --build
```

O painel ficará disponível em [http://localhost:8080](http://localhost:8080).

## Estrutura

- **public/**: assets estáticos servidos pelo Nginx (HTML, CSS e JS em módulos ES6).
- **public/src/components/**: componentes reutilizáveis do dashboard.
- **public/src/utils/**: utilitários para criação de elementos, botões, campos etc.
- **Dockerfile**: imagem Nginx que entrega a aplicação estática.
- **docker-compose.yml**: orquestração para ambiente local 100% containerizado.
