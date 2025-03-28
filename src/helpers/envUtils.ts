export const isProduction = () => process.env.NODE_ENV === 'production'

export const getProtocol = () => (isProduction() ? 'https' : 'http')
