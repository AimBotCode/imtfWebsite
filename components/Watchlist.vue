<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="stock-search">
          <form action="#" method="get">
            <input
              v-model="query.text"
              type="search"
              name="search"
              class="form-control top-search mb-0"
              placeholder="Search Stock"
              @input="getSymbols"
            >
            <div class="search-icon">
              <i class="ti ti-search" />
            </div>
          </form>
        </div>
        <div v-if="show.symbols">
          <ul>
            <li v-for="(sy,i) in query.symbols" :key="i">
              <a href="javascript:;" @click="addSymbol(sy)">{{ sy.sym }} - {{ sy.description }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="row align-items-center">
          <div class="col">
            <h4 class="card-title">
              {{ $store.state.app.watchlists[wlindex].name }} <span v-if="$store.state.app.watchlists[wlindex].symbols" class="stocks-list-badge bg-soft-primary ms-1">{{ $store.state.app.watchlists[wlindex].symbols.length }}</span>
            </h4>
          </div>
          <div class="col-auto">
            <div class="watchlist">
              <select id="Watchlist" v-model="wlindex" class="form-select" @change="choose">
                <option v-for="(w,i) in $store.state.app.watchlists" :key="i" :value="i" class="px-5">
                  {{ w.name }}
                </option>
                <option value="add">
                  Add New +
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body p-0">
        <div v-if="$store.state.app.watchlists[wlindex]" class="watchlist-body" data-simplebar>
          <div v-if="$store.state.app.watchlists[wlindex].symbols" id="watchlist_2" class="accordion">
            <div v-for="(sym,i) in $store.state.app.watchlists[wlindex].symbols" :key="i" class="accordion-item">
              <div v-if="sym" id="headingTwo" class="accordion-header p-2">
                <div class="d-flex justify-content-between">
                  <div class="align-self-center">
                    <h6 class="m-0 text-uppercase font-11">
                      <a class="d-inline" @click="removeSymbol(i)"><i class="las la-times text-red" /></a>
                      <a @click="loadSymbol(sym.sym)">{{ sym.sym }}</a>
                    </h6>
                    <p class="text-uppercase font-10 mb-0">
                      <a @click="loadSymbol(sym.sym)">{{ sym.description }}</a>
                    </p>
                  </div>
                  <div>
                    <h6 class="m-0 text-uppercase font-11">
                      {{ sym.close }} <i :class="sym.roc>0?'ti ti-trending-up text-success':'ti ti-trending-down text-danger'" />
                    </h6>
                    <div class="d-inline-block font-10">
                      <span :class="sym.roc>0?'text-success':'text-danger'">{{ (sym.close - sym.prevclose).toFixed(2) }}</span>
                      <span :class="sym.roc>0?'text-success':'text-danger'">(%{{ sym.roc }})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="$store.state.app.watchlists[wlindex].name!=='Default'" class="d-flex justify-content-center py-2">
              <a href="javascript:;" @click="deleteWatchlist">Delete Watchlist</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalsWatchlistAdd v-if="show.addWatchlist" @save="saveWatchlist" @close="closeAddWatchlist" />
  </div>
</template>

<script>
export default {
  emits: ['load'],
  data () {
    return {
      query: { text: '', symbols: [] },
      wlindex: 0,
      watchlist: {},
      show: { symbols: false, addWatchlist: false }
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    getSymbols () {
      this.$xhr.api.post('/api/seasonality', { action: 'getSymbols', query: this.query.text }).then((response) => {
        this.query.symbols = response.data
        this.show.symbols = true
      })
    },
    async getWatchlistData (symbols) {
      const r = await this.$xhr.api.post('/api/seasonality', { action: 'getSymbolData', symbols }).then((response) => {
        return response.data
      })
      const syms = []
      if (r) {
        r.forEach((obj) => {
          obj.roc = this.getROC(obj)
          syms.push(obj)
        })
        this.$store.commit('app/updateSymbols', { wlidx: this.wlindex, syms })
      }
    },
    refresh () {
      const wl = this.$store.state.app.watchlists[this.wlindex]
      if (wl.symbols) {
        const slist = wl.symbols.map((o, i) => o.sym)
        this.getWatchlistData(slist)
      }
    },
    choose () {
      if (this.wlindex === 'add') {
        this.show.addWatchlist = true
        this.wlindex = 0
        return
      }
      this.watchlist = JSON.parse(JSON.stringify(this.$store.state.app.watchlists[this.wlindex]))
      this.getWatchlistData()
    },
    saveWatchlist (wobj) {
      wobj.symbols = []
      this.$store.commit('app/createWatchlist', wobj)
      this.closeAddWatchlist()
      const len = this.$store.state.app.watchlists.length
      this.wlindex = len - 1
      this.choose()
    },
    closeAddWatchlist () {
      this.show.addWatchlist = false
    },
    addSymbol (symObj) {
      const wl = this.$store.state.app.watchlists[this.wlindex]
      let slist = []
      if (wl.symbols) {
        slist = wl.symbols.map((o, i) => o.sym)
      }
      slist.push(symObj.sym)
      this.getWatchlistData(slist)
      this.show.symbols = false
      this.query.text = ''
    },
    removeSymbol (idx) {
      this.$store.commit('app/removeFromWatchlist', { wlidx: this.wlindex, idx })
    },
    deleteWatchlist () {
      this.$store.commit('app/deleteWatchlist', this.wlindex)
      this.wlindex = 0
    },
    getROC (sym) {
      const diff = sym.close - sym.prevclose
      const roc = (diff / sym.prevclose) * 100
      return roc.toFixed(2)
    },
    loadSymbol (sym) {
      this.$emit('load', sym)
    }
  }
}
</script>
