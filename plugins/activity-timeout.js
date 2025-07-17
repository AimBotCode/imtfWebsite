// plugins/activity-timeout.js
export default ({ app, store }) => {
  if (process.client) {
    let activityTimeout
    const TIMEOUT_DURATION = 30 * 60 * 1000 // 30 minute for testing

    const logout = () => {
      // Remove authentication cookie
      app.$cookies.remove('imtftkn')

      // Clear store state
      store.commit('app/user', {})
      store.commit('app/setActive', false)

      // Redirect to login
      window.location.href = '/login'

      console.log('Session expired due to inactivity')
    }

    const resetTimer = () => {
      if (activityTimeout) {
        clearTimeout(activityTimeout)
      }

      activityTimeout = setTimeout(logout, TIMEOUT_DURATION)
    }

    const startTracking = () => {
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

      events.forEach((event) => {
        document.addEventListener(event, resetTimer, true)
      })

      // Start initial timer
      resetTimer()
    }

    // Check if user is authenticated and start tracking
    const initializeIfAuthenticated = () => {
      const token = app.$cookies.get('imtftkn')
      if (token) {
        startTracking()
        console.log('Activity timeout started - 30 minute')
      }
    }

    // Initialize after a short delay
    setTimeout(initializeIfAuthenticated, 500)

    // Also watch for route changes to reinitialize
    app.router.afterEach(() => {
      setTimeout(initializeIfAuthenticated, 100)
    })
  }
}
