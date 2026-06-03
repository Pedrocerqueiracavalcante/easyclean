# Easy Clean Luxembourg

Site e app para uma lavandaria ao domicilio em Luxembourg, com landing page, area do cliente, pedidos, tracking, admin, assinaturas e deploy em Cloudflare Workers.

![Next.js](https://img.shields.io/badge/Next.js-15-111111?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-2563eb?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare_Workers-f97316?style=for-the-badge&logo=cloudflare&logoColor=white)
![D1](https://img.shields.io/badge/Cloudflare_D1-2d6a2d?style=for-the-badge&logo=sqlite&logoColor=white)

![Easy Clean](public/easyclean-logo.png)

## Site ao vivo

[easyclean.cerqueirapedro275.workers.dev](https://easyclean.cerqueirapedro275.workers.dev)

## Funcionalidades

- Landing page moderna com tema premium verde e dark.
- Seletor de idioma: PT, EN, FR, DE e ES.
- Serviços com paginas individuais explicando cuidado por tecido.
- Formulario de contacto e chamada para WhatsApp.
- Area do cliente com pedidos, historico, tracking, perfil e subscricao.
- Painel admin com dashboard e lista de pedidos.
- Banco D1 com schema Drizzle.
- Deploy em Cloudflare Workers com OpenNext.

## Stack

- Next.js 15
- TypeScript
- JavaScript
- HTML
- CSS
- SQL
- Tailwind CSS v4
- Cloudflare Workers
- Cloudflare D1
- Drizzle ORM
- Better Auth
- Stripe
- Resend

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## Deploy Cloudflare

```bash
npm run cf:build
npm run cf:deploy
```

O projeto usa `wrangler.toml` com D1 e assets do OpenNext.

## Banco de dados

Gerar migrations:

```bash
npm run db:generate
```

Aplicar no D1 remoto:

```bash
npx wrangler d1 migrations apply easyclean-db --remote
```

## Observacao

As credenciais reais ficam fora do Git. Use `.env.example` como base para configurar o ambiente local.
