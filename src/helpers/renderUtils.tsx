import Head from 'next/head'

/** Render a custom browser title for a page or component.
 * `title` should only include the unique part for that page.
 * Note: In this function we put the title into a `{``}` because
 * otherwise we will see `<!-- -->` in it on first render. */
export const renderHead = (title: string) => (
  <Head>
    <title>{`${title} | Neat F2P`}</title>
  </Head>
)
