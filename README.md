# Dashboard de Agentes WhatsApp

Dashboard single-tenant, totalmente dockerizado, para orquestrar agentes de IA conectados ao WhatsApp. Inclui módulos configuráveis para prompt central, provedores de IA, memória, cadência de respostas, integrações Evolution, regras de acesso, handoff, consultas a especialistas, funis automáticos, follow-ups e biblioteca de mídias.

## Como executar

### Opção 1: ambiente 100% Docker

1. Certifique-se de ter o Docker e o Docker Compose instalados.
2. No diretório do projeto, rode o comando abaixo:

   ```bash
   docker compose up --build
   ```

3. A interface ficará disponível em [http://localhost:8080](http://localhost:8080).

Sempre que alterar arquivos estáticos, basta interromper o processo (`Ctrl+C`) e executar o comando novamente.

### Opção 2: servidor estático sem Docker (modo rápido)

1. Instale qualquer servidor HTTP estático simples (ex.: `npm install -g serve` ou use o servidor embutido do Python).
2. Dentro da pasta `public/`, execute um servidor. Exemplos:

   ```bash
   # usando Python 3
   python3 -m http.server 4173

   # ou usando o pacote serve
   serve -l 4173
   ```

3. Abra o navegador em [http://localhost:4173](http://localhost:4173).

> **Observação:** no modo sem Docker as integrações externas não são afetadas, pois o dashboard é 100% estático; a diferença é apenas a forma de servir os arquivos.

## Estrutura

- **public/**: assets estáticos servidos pelo Nginx (HTML, CSS e JS em módulos ES6).
- **public/src/components/**: componentes reutilizáveis do dashboard.
- **public/src/utils/**: utilitários para criação de elementos, botões, campos etc.
- **Dockerfile**: imagem Nginx que entrega a aplicação estática.
- **docker-compose.yml**: orquestração para ambiente local 100% containerizado.
