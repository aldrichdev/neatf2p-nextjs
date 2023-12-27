# neatf2p-nextjs

The source code for the [Neat F2P website](https://neatf2p-nextjs.vercel.app/).

## Requirements

- Node 16+

## Setup

Copy `.env.dist` to `.env` and fill in empty values.

## Appendix

### Issues

#### `FATAL ERROR: NewNativeModule Allocation failed - process out of memory` when running `npm run build`

This went away when I installed node/lts and used it. However I also noted that after switching `nvs` back to `16.14.0`, which was the Node version I had installed when I originally had this problem, the problem was gone. Somehow, `nvs` installing newer Node verisons, or switching them, fixed this.

### Adding new Typography variants

Instructions:

1. Add a new property to the `typography` object in `src/theme/theme.ts`.
2. Add the new typography name to the following interfaces:
   a. `TypographyVariants`
   b. `TypographyVariantsOptions`
   c. `TypographyPropsVariantOverrides`
3. Set the new typography's element in `variantMapping`

### Next.js CNA Default Info

#### About

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

#### Getting Started

First, create your `.env` file:

```
cp .env.dist .env
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

#### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

#### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
