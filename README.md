# front-prc — AgroRotação (PRC System)

Front-end do sistema de rotação de culturas. **React 19 + TypeScript + Vite**, com React Router e Axios.

Telas prontas: **Abertura (splash)** e **Login** — somente visual. A autenticação está preparada, mas desligada até o back-end Spring Boot existir.

## Criar o projeto do zero (comandos)

Requisito: Node.js 20+ (recomendado 22 LTS) e npm.

```bash
# 1. criar o projeto Vite com React + TypeScript
npm create vite@latest front-prc -- --template react-ts
cd front-prc

# 2. dependências da aplicação
npm install react-router-dom axios @fontsource-variable/inter

# 3. (opcional) dependências de desenvolvimento já vêm do template
npm install
```

Depois copie para o projeto a pasta `src/`, `index.html`, `public/favicon.svg`, `vite.config.ts` e `tsconfig.json` deste repositório.

## Rodar este repositório

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run preview    # serve o build local
npm run typecheck  # checagem de tipos
```

Rotas: `/` (abertura) → `/login`. `/cadastro` e `/recuperar-senha` são páginas provisórias; `/app` é protegida (exige login).

## Variáveis de ambiente

Copie `.env.example` e ajuste (variáveis do front começam com `VITE_`):

```text
VITE_API_URL=http://localhost:8081/api
VITE_AUTH_ENABLED=false
```

## Quando for implementar a autenticação

Já existe a estrutura; falta apenas ligar ao back-end:

1. Em `.env`, defina `VITE_AUTH_ENABLED=true` e `VITE_API_URL` com a URL do Spring Boot.
2. Ajuste rotas e campos do DTO em `src/services/authService.ts` (`/auth/login`, `/auth/me`, `/auth/logout`).
3. Ajuste o formato da resposta em `src/types/auth.ts`.
4. No Spring Boot, libere o CORS para `http://localhost:5173` (ou use o proxy comentado em `vite.config.ts`).

Arquivos envolvidos: `src/services/api.ts` (Axios + token Bearer + tratamento de 401), `src/services/tokenStorage.ts` ("Lembrar de mim"), `src/contexts/AuthContext.tsx`, `src/hooks/useAuth.ts`, `src/routes/ProtectedRoute.tsx`.

## Estrutura

```text
src/
  assets/       imagem de fundo
  components/   Logo, ícones
  contexts/     AuthContext
  hooks/        useAuth
  pages/        Splash, Login
  routes/       AppRoutes, ProtectedRoute
  services/     api, authService, tokenStorage
  styles/       global.css (tokens de cor/espaço)
  types/        tipos compartilhados
```

## Docker (Nginx + Postgres)

O `Dockerfile` faz o build do Vite e serve o resultado no Nginx.

```bash
docker compose up --build
```

Acesse `http://localhost:8080`.

## Banco de dados

O Postgres roda com a mesma configuracao local mostrada nos prints:

```text
Host: localhost
Porta: 5432
Database: postgres
User: postgres
Password: postgres
URL: jdbc:postgresql://localhost:5432/postgres
```

Dentro de outros containers do mesmo `docker-compose.yml`, use o host `postgres`:

```text
jdbc:postgresql://postgres:5432/postgres
```

As variaveis disponiveis estao em `.env.example`. Se quiser trocar usuario, senha, porta ou database, crie um arquivo `.env` na raiz do projeto usando esse exemplo como base.

## pgAdmin

O pgAdmin fica disponivel como ferramenta opcional:

```bash
docker compose --profile tools up --build
```

Acesse:

```text
http://localhost:5050
```

Login padrao:

```text
Email: admin@front-prc.local
Senha: admin
```

Para parar:

```bash
docker compose down
```

Para parar e apagar os dados locais do Postgres:

```bash
docker compose down -v
```
