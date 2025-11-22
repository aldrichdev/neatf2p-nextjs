import Head from 'next/head'

/** Render a custom browser title for a page or component.
 * `title` should only include the unique part for that page.
 * Note: In this function we put the title into a `{``}` because
 * otherwise we will see `<!-- -->` in it on first render. */
export const renderHead = (title: string, description?: string, keywords?: string) => (
  <Head>
    <title>{`${title} | Neat F2P`}</title>
    {description && (
      <>
        <meta name='description' content={description} />
        <meta name='og:description' content={description} />
      </>
    )}
    {keywords && <meta key='keywords' content={keywords} />}
  </Head>
)
