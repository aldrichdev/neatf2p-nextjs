export const isProduction = () => process.env.NODE_ENV === 'production'

export const getProtocol = () => (isProduction() ? 'https' : 'http')

export const getWebsiteBaseUrl = () => `${getProtocol()}://${process.env.NEXT_PUBLIC_WEBSITE_HOST}`
