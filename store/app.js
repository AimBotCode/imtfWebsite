export const state = () => ({
  user: {},
  roles: [],
  notify: { type: 'success', title: '', message: '' },
  show: { lottie: false, login: false, signup: false },
  url: { base: '', full: '', cms: '' },
  watchlists: [{ name: 'Default', symbols: [{ sym: 'AAPL', description: 'APPLE INC' }] }],
  scanlist: [],
  active: false,
  scannerForm: {},
  seascanForm: {},
  patternForm: {},
  calendarForm: {}
})

export const mutations = {
  user (appstate, data) {
    console.log(data)
    appstate.user = data.data
    appstate.roles = data.roles
    mutations.saveState(appstate)
  },
  setActive (appstate, status) {
    appstate.active = status
    mutations.saveState(appstate)
  },
  siteURL (appstate, urls) {
    appstate.url = urls
    mutations.saveState(appstate)
  },
  setScannerForm (appstate, form) {
    appstate.scannerForm = form
    mutations.saveState(appstate)
  },
  setSeascanForm (appstate, form) {
    appstate.seascanForm = form
    mutations.saveState(appstate)
  },
  setPatternForm (appstate, form) {
    appstate.patternForm = form
    mutations.saveState(appstate)
  },
  setCalendarForm (appstate, form) {
    appstate.calendarForm = form
    mutations.saveState(appstate)
  },
  showLottie (appstate) {
    appstate.show.lottie = true
  },
  hideLottie (appstate) {
    appstate.show.lottie = false
  },
  createWatchlist (appstate, wl) {
    appstate.watchlists.push(wl)
    mutations.saveState(appstate)
  },
  deleteWatchlist (appstate, wlidx) {
    const lists = appstate.watchlists
    delete lists[wlidx]
    const filtered = lists.filter(val => val != null)
    appstate.watchlists = filtered
    mutations.saveState(appstate)
  },
  addToWatchlist (appstate, data) {
    if (typeof (appstate.watchlists[data.wlidx].symbols) === 'undefined') {
      appstate.watchlists[data.wlidx].symbols = []
    }
    appstate.watchlists[data.wlidx].symbols.push(data.obj)
    mutations.saveState(appstate)
  },
  removeFromWatchlist (appstate, data) {
    const symbols = appstate.watchlists[data.wlidx].symbols
    delete symbols[data.idx]
    const filtered = symbols.filter(val => val != null)
    appstate.watchlists[data.wlidx].symbols = filtered
    mutations.saveState(appstate)
  },
  updateScanlist (appstate, data) {
    appstate.scanlist = data
    mutations.saveState(appstate)
  },
  removeFromScanlist (appstate, idx) {
    const symbols = appstate.scanlist
    symbols.splice(idx, 1)
    appstate.scanlist = symbols
    mutations.saveState(appstate)
  },
  updateSymbols (appstate, data) {
    appstate.watchlists[data.wlidx].symbols = data.syms
    mutations.saveState(appstate)
  },
  saveState (appstate) {
    if (typeof localStorage === 'undefined') {
      return
    }

    localStorage.setItem('imtf', JSON.stringify(appstate))
  },
  restoreState (appstate) {
    if (typeof localStorage === 'undefined') {
      return
    }

    const imtf = localStorage.getItem('imtf')
    if (imtf) {
      const data = JSON.parse(imtf)
      appstate.user = data.user
      appstate.roles = data.roles
      appstate.show = data.show
      appstate.notify = data.notify
      appstate.active = data.active
      appstate.scannerForm = data.scannerForm
      appstate.seascanForm = data.seascanForm
      appstate.patternForm = data.patternForm
      appstate.calendarForm = data.calendarForm
      if (data.watchlists && data.watchlists.length > 0) {
        appstate.watchlists = data.watchlists
      }
      appstate.scanlist = data.scanlist
    }
  }
}

export const getters = {
  getPrice (appstate, index) {
    return appstate.prices[index]
  },
  getPriceById: appstate => id => appstate.prices.find(price => price.id === id),
  getProduct: appstate => id => appstate.products.find(product => product.id === id),
  getItem: appstate => item => appstate[item]
}
