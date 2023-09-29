/** Loads the page indicated by relativePath. This is basically a route change and a page refresh.
 * Useful for user authentication operations which do not seem to display correctly with normal route changes. */
export const redirectTo = (relativePath: string) => {
  const win: Window = window
  win.location = relativePath
}
