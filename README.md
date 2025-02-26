This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Environment Variables

| Variable              | Type     | Description                                  |
|-----------------------|----------|----------------------------------------------|
| `kashkaPrivacyNotice` | `string` | Defines Markdown displayed at ```/privacy``` |
| `kashkaImprint`       | `string` | Defines Markdown displayed at ```/imprint``` |


## Running on Docker

Build the Docker image with:

```bash
docker build -t toolbox .
```

Run it with:

```bash
docker run -p 3000:3000 toolbox
```
