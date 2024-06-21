/* eslint no-unused-vars: "off" */
/* eslint no-underscore-dangle: "off" */
/* eslint max-lines-per-function: "off" */
// const axios = require('axios')

const request = async function (app, url = '', options = {}) {
  const axios = await import('axios')
  app.store.commit('app/showLottie')
  const responseData = await axios.request({
    method: options.method,
    headers: options.headers,
    url,
    data: options.body
  })
    .then((response) => {
      app.store.commit('app/hideLottie')
      return response.data
    })
    .catch((error) => {
      app.store.commit('app/hideLottie')
      if (error.response && error.response.message && !error.response.success) {
        return error.response.message
      }
      return error
    })
  return responseData
}

const createUtils = function ({ app }) {
  const xhr = {
    options: {
      headers: {
        Accept: 'application/json'
      }
    },
    async get (url = '', options = {}) {
      const reqoptions = { ...this.options, ...{ method: 'GET' }, ...options }
      const res = await request(app, url, reqoptions)
      return res
    },
    async post (url = '', options = {}) {
      const reqoptions = { ...this.options, ...{ method: 'POST' }, ...options }
      const res = await request(app, url, reqoptions)
      return res
    },
    async put (url = '', options = {}) {
      const reqoptions = { ...this.options, ...{ method: 'PUT' }, ...options }
      const res = await request(app, url, reqoptions)
      return res
    },
    api: {
      async get (endpoint, data) {
        const url = app.$config.API_URL
        const result = await xhr.get(url, data).then((rsp) => {
          if (rsp.error && rsp.error.message) {
            app.$utils.error(rsp.error.message)
          }

          if (rsp.data && rsp.data.message) {
            app.$utils.success(rsp.data.message)
          }
          return rsp
        })
        return result
      },
      async post (endpoint, data) {
        const options = { body: data }
        const url = app.$config.API_URL
        const result = await xhr.post(url, options).then((rsp) => {
          if (rsp.error && rsp.error.message) {
            app.$utils.error(rsp.error.message)
          }

          if (rsp.data && rsp.data.message) {
            app.$utils.success(rsp.data.message)
          }
          return rsp
        })
        return result
      }
    },
    wordpress: {
      async post (endpoint, data) {
        const options = { body: data }
        const result = await xhr.post(endpoint, options).then((rsp) => {
          if (rsp.error && rsp.error.message) {
            app.$utils.error(rsp.error.message)
          }

          if (rsp.data && rsp.data.message) {
            app.$utils.success(rsp.data.message)
          }
          return rsp
        })
        return result
      }
    },
    sendgrid: {
      put (endpoint, data) {
        const requrl = `https://api.sendgrid.com${endpoint}`
        const apikey = app.$config.SENDGRID_API_KEY
        const options = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apikey}` } }
        options.body = JSON.stringify(data)
        return xhr.put(requrl, options)
      }
    }
  }
  return xhr
}

export default function (ctx, inject) {
  inject('xhr', createUtils(ctx))
}
