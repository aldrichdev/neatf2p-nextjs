export const isLinkActive = (currentPath: string, linkPath: string): boolean => {
  // Special cases.
  if (linkPath === '/about' && currentPath.startsWith('/about')) {
    return true
  }

  if (linkPath === '/news' && currentPath.startsWith('/news')) {
    return true
  }

  if (linkPath === '/hiscores' && (currentPath.startsWith('/hiscores') || currentPath.startsWith('/npc-hiscores'))) {
    return true
  }

  if (linkPath === '/how-to-play' && currentPath.startsWith('/how-to-play')) {
    return true
  }

  return linkPath === currentPath
}
