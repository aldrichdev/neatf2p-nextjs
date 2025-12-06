import Head from 'next/head'

/** Render a custom browser title for a page or component.
 * `title` should only include the unique part for that page.
 * Note: In this function we put the title into a `{``}` because
 * otherwise we will see `<!-- -->` in it on first render. */
export const renderHead = (title: string, description?: string, keywords?: string) => {
  const brandedTitle = `${title} | Neat F2P`
  const descriptionOrFallback =
    description ||
    'Neat F2P is a Runescape Classic (RSC) private server that is F2P only (no members) and is 100% free.'

  return (
    <Head>
      <title>{brandedTitle}</title>
      <meta name='og:title' content={brandedTitle} />
      <meta name='description' content={descriptionOrFallback} />
      <meta name='og:description' content={descriptionOrFallback} />
      {keywords && <meta key='keywords' content={keywords} />}
    </Head>
  )
}
