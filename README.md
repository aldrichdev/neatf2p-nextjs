# neatf2p-nextjs

The source code for the [Neat F2P website](https://www.neatf2p.com/).

## Requirements

- Node 16

## Setup

1. Copy `.env.dist` to `.env` and fill in empty values.
2. Run `npm run dev` to run the server locally. It will be available at `localhost:3000`.

## Appendix

### Issues

#### `FATAL ERROR: NewNativeModule Allocation failed - process out of memory` when running `npm run build`

This went away when I installed node/lts and used it. However I also noted that after switching `nvs` back to `16.14.0`, which was the Node version I had installed when I originally had this problem, the problem was gone. Somehow, `nvs` installing newer Node verisons, or switching them, fixed this.

### How-To

#### Adding new Typography variants

Instructions:

1. Add a new property to the `typography` object in `src/theme/theme.ts`.
2. Add the new typography name to the following interfaces:
   a. `TypographyVariants`
   b. `TypographyVariantsOptions`
   c. `TypographyPropsVariantOverrides`
3. Set the new typography's element in `variantMapping`

#### Setting up a Test Web Client

To set up a web client page that connects to the Neat F2P test server (running off of my desk laptop), do the following:

1. Add the `client` folder ([available here](https://gitlab.com/openrsc/Website-Portal/-/tree/develop/portal/public/client?ref_type=heads)) to `public`. That way the webclient HTML file is accessible via `{HOST}/client/index.html`.
2. Create a `testwebclient` folder under `src/pages`, and then a `index.tsx` file underneath it, similar to the existing `webclient/index.tsx`, but with code like this:

```
const TestWebclientPage = () => {
  const [hideAds, setHideAds] = useState(false)
  const [hideRunescapeBanners, setHideRunescapeBanners] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const protocol = getProtocol()
  const webclientHost = process.env.NEXT_PUBLIC_WEBSITE_HOST
  const gameServerHost = '71.205.248.145'
  const gameServerRsaPublicKey =
    '10434129247747875206749322994737259335353815224197943208197420577351164491111787501201706919192564129410096061100941383106949396063257493621975484273337067'
  const webclientUrl = `${protocol}://${webclientHost}/client/index.html#free,${gameServerHost},43494,65537,${gameServerRsaPublicKey},true`
```

3. Add `"ignorePatterns": ["public/client"]` to `.eslintrc.json` so that the web client files do not throw errors.
4. In `_app.tsx`, add `|| router.asPath === '/testwebclient'` to `isWebclientPage`.
5. Push these changes up to the website and have it deploy. Then you need an SSL cert that is issued from the same domain.

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
