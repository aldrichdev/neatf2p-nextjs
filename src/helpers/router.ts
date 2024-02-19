import { NextRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

/** Runs Next.js `router.push` but with the correct arguments, so the scroll position isn't lost
 *  and there aren't weird console warnings. */
export const push = (router: NextRouter, pathname: string, query: ParsedUrlQuery) => {
  router.push(
    {
      pathname,
      query,
    },
    undefined,
    { scroll: false },
  )
}
