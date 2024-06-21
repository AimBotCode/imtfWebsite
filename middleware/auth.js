const parseCookie = str => str
  .split(';')
  .map(v => v.split('='))
  .reduce((acc, v) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
    return acc
  }, {})

export default function ({ req, app }) {
  if (req && req.headers.cookie) {
    const cookies = parseCookie(req.headers.cookie)
    const currentValue = cookies[process.env.COOKIE_NAME || 'imtftkn']
    if (currentValue) {
      app.$cookies.set(process.env.COOKIE_NAME || 'imtftkn', currentValue, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: false,
        sameSite: true,
        secure: process.env.NODE_ENV !== 'development'
      })
    }
  }
}
