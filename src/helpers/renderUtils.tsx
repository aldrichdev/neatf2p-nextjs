import Head from 'next/head'

/** Render a custom browser title for a page or component.
 * `title` should only include the unique part for that page.
 * Note: The title needs to be in a {``} or we see `<!-- -->`
 * in it on first render. */
export const renderHead = (title: string) => (
  <Head>
    <title>{`${title} | Neat F2P :: Nostalgia Reborn | Runescape Classic F2P`}</title>
  </Head>
)
