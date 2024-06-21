/* eslint prefer-named-capture-group: "off" */
/* eslint no-unused-vars: "off" */
/* eslint no-useless-escape: "off" */

import styles from '~/plugins/styles.js'
const getSwal = () => require('sweetalert2')

const createUtils = function ({ app }) {
  const utils = {
    log (message) {
      if (process.env.NODE_ENV === 'development') {
        console.log(message, app)
      }
    },
    async success (message) {
      const Swal = await getSwal()
      Swal.fire({
        title: 'Success!',
        text: message,
        icon: 'success',
        confirmButtonText: 'Close'
      })
    },
    async error (message) {
      const Swal = await getSwal()
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    },
    async warn (message) {
      const Swal = await getSwal()
      Swal.fire({
        title: 'Oops!',
        text: message,
        icon: 'warning',
        confirmButtonText: 'Close'
      })
    },
    /* eslint max-params: "off" */
    async confirm (title, message, callback, customClass = false) {
      const Swal = await getSwal()
      const config = {
        title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonText: 'Close',
        confirmButtonText: 'Yes'
      }
      if (customClass) {
        config.customClass = customClass
      }

      Swal.fire(config).then(callback)
    },
    async toast () {
      const Swal = await getSwal()
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    },
    getClass (clsArr) {
      const clsObject = {}
      let arr = clsArr
      if (!Array.isArray(clsArr)) {
        arr = [clsArr]
      }

      arr.forEach((clsName) => {
        if (styles[clsName]) {
          const key = styles[clsName]
          clsObject[key] = true
        }
      })
      return clsObject
    },
    scrollToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    scrollTo (offset, callback) {
      const fixedOffset = offset.toFixed()
      const onScroll = function () {
        if (window.pageYOffset.toFixed() === fixedOffset) {
          window.removeEventListener('scroll', onScroll)
          callback()
        }
      }

      window.addEventListener('scroll', onScroll)
      onScroll()
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      })
    },
    navigate (routeName) {
      // navigate to hash
      if (routeName.includes('#')) {
        const parts = routeName.split('#')
        app.router.push({ path: parts[0], hash: `#${parts[1]}` })
      } else {
        // navigate to another page
        utils.scrollTo(0, () => {
          if (app.router.history.current.name === routeName) {
            app.router.push({ hash: '' })
          } else {
            app.router.push({ name: routeName, hash: '' })
          }
        })
      }
    },
    navigateToPath (path) {
      app.router.push({ path })
    },
    isoToUnix (dateString) {
      const dateObj = new Date(dateString)
      return dateObj.getTime()
    },
    formatDate (dateString, options = { timeZone: 'Europe/Istanbul', year: 'numeric', month: 'long', day: 'numeric' }) {
      const timestamp = utils.isoToUnix(dateString)
      return utils.unixToDate(timestamp, options)
    },
    formatDateCommon (dateString) { // yyyy-mm-dd format
      if (!dateString) {
        return '1970-01-01'
      }

      const myDate = new Date(dateString)
      const offset = myDate.getTimezoneOffset()
      const diff = offset * 60 * 1000
      const newDate = new Date(myDate.getTime() - diff)
      return newDate.toISOString().split('T')[0]
    },
    unixToDate (timestamp, options = { timeZone: 'Europe/Istanbul', year: 'numeric', month: 'long', day: 'numeric' }) {
      if (!timestamp) {
        return ''
      }

      const s = new Date(timestamp * 1000).toISOString()
      const dt = new Date(s)
      return dt.toLocaleDateString('tr-TR', options)
    },
    daysUntil (end) {
      const now = Math.floor(Date.now() / 1000)
      if (now > end) {
        return false
      }
      return Math.floor((end - now) / 86400)
    },
    ucfirst (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    moneyFormat (amount) {
      return amount.toFixed(2)
    },
    generateHash (numChars = 8) {
      return Math.random().toString(36)
        .substring(0, numChars)
    },
    incrementalArray (length, start = 1) {
      return Array.from({ length }, (_, i) => i + start)
    },
    validate: {
      isvalidUsername (str) {
        const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
        return reg.test(str)
      },
      validateURL (textval) {
        const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
        return urlregex.test(textval)
      },
      validateLowerCase (str) {
        const reg = /^[a-z]+$/
        return reg.test(str)
      },
      validateUpperCase (str) {
        const reg = /^[A-Z]+$/
        return reg.test(str)
      },
      validatAlphabets (str) {
        const reg = /^[A-Za-z]+$/
        return reg.test(str)
      },
      isValidEmail (email) {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return reg.test(String(email).toLowerCase())
      },
      isStringExists (value) {
        return value && value.length > 0
      },
      isObjectExists (value) {
        return typeof value === 'object' && value !== null
      },
      isArrayExists (value) {
        return Array.isArray(value) && value.length > 0
      },
      length (str, min, max) {
        return !(str.length < min || str.length > max)
      }
    }
  }
  return utils
}

export default function (ctx, inject) {
  inject('utils', createUtils(ctx))
}
