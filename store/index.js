// import axios from 'axios'

export const state = () => ({
  me: { account: { username: '' } }
})

export const mutations = {
  me(appstate, meData) {
    appstate.me = meData
  }
}

export const getters = {
  getItem: appstate => item => appstate[item]
}

export const actions = {
  parseCookie(str) {
    return str.split(';').map(v => v.split('='))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
        return acc
      }, {})
  },
  async nuxtServerInit({ commit }, { app, req, redirect }) {
    const ck = app.$cookies.get('imtftkn')
    if (!ck || ck !== 'Pxw5JSEDu7KVgT2') {
      redirect('/')
    }

    const res = await Promise.resolve(true)
    return res
  }
}
