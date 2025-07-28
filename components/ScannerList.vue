<template>
  <div>
    <div class="card bg-dark">
      <div class="card-body">
        <div class="stock-search">
          <form action="#" method="get">
            <select v-model="market" class="form-control" multiple="true" @change="marketChange">
              <option value="All">
                All
              </option>
              <option value="CurrencyHeatmap">
                Currency
              </option>
              <option value="FutureHeatmap">
                Futures
              </option>
              <option disabled="">
                US Stock
              </option>
              <option value="SP500Heatmap">
                &nbsp;&nbsp;SP500
              </option>
              <option value="NASDAQ100Heatmap">
                &nbsp;&nbsp;NASDAQ
              </option>
              <option value="dow30Heatmap">
                &nbsp;&nbsp;DOW
              </option>
              <option value="ETFHeatmap">
                &nbsp;&nbsp;ETF
              </option>
              <option value="dax30Heatmap">
                German DAX
              </option>
              <option value="FTSEHeatmap">
                UK FTSE
              </option>
              <option value="BSE200Heatmap">
                Indian NIFTY
              </option>
              <option value="CryptoHeatmap">
                Crypto
              </option>
              <option value="custom">
                Custom
              </option>
            </select>
          </form>
        </div>
      </div>
    </div>

    <div v-if="show.search" class="card">
      <div class="card-body">
        <div class="stock-search">
          <form action="#" method="get">
            <input v-model="query.text" type="search" name="search" class="form-control top-search mb-0"
              placeholder="Search Stock" @input="getSymbols">
            <div class="search-icon">
              <i class="ti ti-search" />
            </div>
          </form>
        </div>
        <div v-if="show.symbols">
          <ul>
            <li v-for="(sy, i) in query.symbols" :key="i">
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
              {{ market === 'custom' ? 'Custom List' : marketNameFormat() }}
            </h4>
          </div>
          <div class="col-auto">
            <div class="watchlist" />
          </div>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="watchlist-body" data-simplebar>
          <div v-if="list" id="watchlist_2" class="accordion">
            <div v-for="(sym, i) in list" :key="i" class="accordion-item">
              <div v-if="sym" id="headingTwo" class="accordion-header">
                <a class=" accordion-button d-block py-2 px-3 collapsed " @click="removeSymbol(i)">
                  <div class="d-flex justify-content-between">
                    <div class="align-self-center">
                      <h6 class="m-0 text-uppercase font-11"> <i class="las la-times text-red" /> {{ sym.sym }} </h6>
                      <p class="text-uppercase font-10 mb-0">{{ sym.description }}</p>
                    </div>
                    <div>
                      <h6 class="m-0 text-uppercase font-11"> {{ sym.close }} <i
                          :class="sym.roc > 0 ? 'ti ti-trending-up text-success' : 'ti ti-trending-down text-danger'" />
                      </h6>
                      <div class="d-inline-block font-10">
                        <span :class="sym.roc > 0 ? 'text-success' : 'text-danger'">{{ (sym.close -
                          sym.prevclose).toFixed(2)
                        }}</span>
                        <span :class="sym.roc > 0 ? 'text-success' : 'text-danger'">(%{{ sym.roc }})</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div v-if="$store.state.app.watchlists[wlindex].name !== 'Default'"
              class="d-flex justify-content-center py-2">
              <a href="javascript:;" @click="deleteWatchlist">Delete Watchlist</a>
            </div>
            <div v-if="market === 'custom'" class="d-flex justify-content-center py-2">
              <a href="javascript:;" class="btn btn-danger" @click="scan">Scan</a>
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
  emits: ['market'],
  data() {
    return {
      list: [],
      query: { text: '', symbols: [] },
      wlindex: 0,
      watchlist: {},
      show: { symbols: false, addWatchlist: false, search: false },
      market: ['', 'SP500Heatmap'],
      marketName: ['SP500'],
      markets: [
        { key: 'All', val: 'All' },
        { key: 'CurrencyHeatmap', val: 'Currency' },
        { key: 'SP500Heatmap', val: 'SP500' },
        { key: 'NASDAQ100Heatmap', val: 'NASDAQ' },
        { key: 'dow30Heatmap', val: 'DOW' },
        { key: 'ETFHeatmap', val: 'ETF' },
        { key: 'dax30Heatmap', val: 'German DAX' },
        { key: 'FTSEHeatmap', val: 'UK FTSE' },
        { key: 'BSE200Heatmap', val: 'Indian NIFTY' },
        { key: 'FutureHeatmap', val: 'Futures' },
        { key: 'CryptoHeatmap', val: 'Crypto' }
      ]
    }
  },
  mounted() {
    this.getSymbolsByMarket()
  },
  methods: {
    marketChange() {
      if (this.market[0] === 'All') {
        this.market = ['CurrencyHeatmap', 'SP500Heatmap', 'NASDAQ100Heatmap',
          'dow30Heatmap', 'ETFHeatmap', 'dax30Heatmap',
          'FTSEHeatmap', 'BSE200Heatmap', 'FutureHeatmap', 'CryptoHeatmap']
        this.marketName = ['All']
      } else if (this.market[0] === 'custom') {
        this.marketName = ['Custom']
        this.market = []
        this.show.search = true
        const slist = JSON.parse(JSON.stringify(this.$store.state.app.scanlist))
        this.getWatchlistData(slist)
      } else {
        const name = []
        for (let i = 0; i < this.market.length; i++) {
          this.markets.forEach((obj) => {
            if (obj.key === this.market[i]) {
              name[i] = obj.val
            }
          })
        }
        this.marketName = name
        if (this.market !== 'custom') {
          this.getSymbolsByMarket()
        }
      }

      this.$emit('market', this.market)
    },
    marketNameFormat() {
      let name = this.marketName[0]
      if (this.marketName.length > 1) {
        for (let i = 1; i < this.marketName.length; i++) {
          name += ' or ' + this.marketName[i]
        }
      }
      return name
    },
    getSymbolsByMarket() {
      this.$xhr.api.post('/api/seasonality', { action: 'getSymbolsByMarket', market: this.market }).then((response) => {
        const symbols = response.json
        const list = []
        if (!symbols) { return }
        symbols.forEach((obj) => {
          obj.roc = this.getROC(obj)
          list.push(obj)
        })
        this.list = list
      })
    },
    getSymbols() {
      this.$xhr.api.post('/api/seasonality', { action: 'getSymbols', query: this.query.text }).then((response) => {
        this.query.symbols = response.data
        this.show.symbols = true
      })
    },
    async getWatchlistData(symbols) {
      const r = await this.$xhr.api.post('/api/seasonality', { action: 'getSymbolData', symbols }).then((response) => {
        return response.data
      })
      const syms = []
      if (r) {
        r.forEach((obj) => {
          obj.roc = this.getROC(obj)
          syms.push(obj)
        })
      }
      this.list = syms
    },
    refresh() {
      const wl = this.$store.state.app.watchlists[this.wlindex]
      if (wl.symbols) {
        const slist = wl.symbols.map((o, i) => o.sym)
        this.getWatchlistData(slist)
      }
    },
    choose() {
      if (this.wlindex === 'add') {
        this.show.addWatchlist = true
        this.wlindex = 0
        return
      }
      this.watchlist = JSON.parse(JSON.stringify(this.$store.state.app.watchlists[this.wlindex]))
      this.getWatchlistData()
    },
    saveWatchlist(wobj) {
      wobj.symbols = []
      this.$store.commit('app/createWatchlist', wobj)
      this.closeAddWatchlist()
      const len = this.$store.state.app.watchlists.length
      this.wlindex = len - 1
      this.choose()
    },
    closeAddWatchlist() {
      this.show.addWatchlist = false
    },
    scan() {
      this.$emit('scan')
    },
    addSymbol(symObj) {
      const slist = JSON.parse(JSON.stringify(this.$store.state.app.scanlist))
      if (slist.length > 50) {
        alert('Max. 50 items allowed')
        return
      }
      slist.push(symObj.sym)
      this.$store.commit('app/updateScanlist', slist)
      this.getWatchlistData(slist)
      this.show.symbols = false
      this.query.text = ''
    },
    removeSymbol(idx) {
      this.$store.commit('app/removeFromScanlist', idx)
      this.list.splice(idx, 1)
    },
    deleteWatchlist() {
      this.$store.commit('app/deleteWatchlist', this.wlindex)
      this.wlindex = 0
    },
    getROC(sym) {
      if (!sym.close || !sym.prevclose) { return 0 }
      const diff = sym.close - sym.prevclose
      const roc = (diff / sym.prevclose) * 100
      return roc.toFixed(2)
    }
  }
}
</script>
