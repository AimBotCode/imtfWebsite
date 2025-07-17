
<template>
  <div>
    <Navbar />
    <Subbar title="Scanner" :submenu="false" />
    <div class="page-wrapper">
      <div class="page-content-tab">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-9">
              <div class="card">
                <div class="card-header bg-dark text-white">
                  <div class="row align-items-center">
                    <div class="col d-flex justify-content-start">
                      <ul class="pagination m-0">
                        <li :class="'page-item' + (show.as === 'heatmap' ? ' active' : '')">
                          <a class="page-link" href="#" tabindex="-1" @click="setView('heatmap')">Heatmap</a>
                        </li>
                        <li :class="'page-item' + (show.as === 'table' ? ' active' : '')">
                          <a class="page-link" href="#" @click="setView('table')">Table</a>
                        </li>
                      </ul>
                    </div>
                    <div class="col d-flex justify-content-end">
                      <button class="btn btn-secondary" type="button" @click="show.filters = !show.filters">
                        {{ show.filters ? 'Hide Filters' : 'Show Filters' }}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-header bg-light">
                  <div class="row align-items-center">
                    <div class="col">
                      <FormsScanner v-if="show.filters" @change="formChanged" @timeframe="setTimeframe" />
                    </div>
                  </div>
                </div>
                <div class="card-body p-0" style="position: relative;">
                  <!-- Configuration icon positioned at top right of table -->
                  <i
                    v-if="show.as === 'table'"
                    class="las la-cog"
                    style="position: absolute; top: 10px; right: 15px; z-index: 10; font-size: 1.2rem; cursor: pointer; color: #6c757d;"
                    title="Configure Columns"
                    @click="show.columnConfig = true"
                  />
                  <div id="Amount_history" class="tab-content">
                    <div :class="(show.as === 'table' ? 'd-block' : 'd-none')">
                      <div class="tab-pane fade show active" role="tabpanel" aria-labelledby="Added-tab">
                        <div class="table-responsive p-0">
                          <table
                            id="datatable"
                            class="table table-striped table-bordered table-hover"
                            style="word-break: break-all;"
                          >
                            <thead class="thead-light sortable">
                              <tr>
                                <th v-for="column in selectedColumns" :key="column.key" @click="sort(column.sortKey)">
                                  <i :class="iconClass(column.sortKey)" /> {{ column.label }}
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              <!-- Dynamic records -->
                              <tr v-for="(r, i) in rows" :key="i">
                                <td v-for="column in selectedColumns" :key="column.key">
                                  <template v-if="column.key === 'sym'">
                                    <a href="javascript:;" class="text-blue" @click="showSymbol(r.sym)">{{ r.sym }}</a>
                                  </template>
                                  <template v-else-if="column.key === 'sector'">
                                    {{ r.sector }}
                                  </template>
                                  <template v-else-if="column.key === 'close'">
                                    {{ r.close }}
                                  </template>
                                  <template v-else-if="column.key === 'change'">
                                    <span :class="getROC(r) > 0 ? 'text-success' : 'text-danger'">{{ getROC(r) }}</span>
                                  </template>
                                  <template v-else-if="column.key === 'dtime'">
                                    {{ r.dtime || '-' }}
                                  </template>
                                  <template v-else-if="column.key === 'istate'">
                                    {{ r.istate || '-' }}
                                  </template>
                                  <template v-else-if="column.key === 'vstate'">
                                    {{ r.vstate || '-' }}
                                  </template>
                                  <template v-else-if="column.key === 'cstate'">
                                    {{ r.cstate || '-' }}
                                  </template>
                                  <template v-else-if="column.key === 'sectors'">
                                    {{ r.sector }}
                                  </template>
                                  <template v-else-if="column.key === 'description'">
                                    {{ r.description || '-' }}
                                  </template>
                                  <template v-else>
                                    -
                                  </template>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <nav aria-label="..." class="float-end d-flex align-items-center justify-content-center w-100">
                          <ul class="pagination pagination-sm me-1">
                            <li :class="'page-item' + (meta.page < 2 ? ' disabled' : '')">
                              <a class="page-link" href="#" @click="paginate(1)">First</a>
                            </li>
                            <li :class="'page-item' + (meta.page < 2 ? ' disabled' : '')">
                              <a class="page-link" href="#" @click="paginate(meta.page - 1)">Previous</a>
                            </li>
                          </ul>

                          <!-- Page numbers -->
                          <ul class="pagination pagination-sm me-1">
                            <li v-if="meta.page > 1" class="page-item">
                              <a class="page-link" href="#" @click="paginate(meta.page - 1)">{{ meta.page - 1 }}</a>
                            </li>
                            <li class="page-item active">
                              <a class="page-link" href="#" @click="paginate(meta.page)">{{ meta.page }}</a>
                            </li>
                            <li v-if="meta.pages > meta.page" class="page-item">
                              <a class="page-link" href="#" @click="paginate(meta.page + 1)">{{ meta.page + 1 }}</a>
                            </li>
                          </ul>

                          <!-- Navigation buttons -->
                          <ul class="pagination pagination-sm me-2">
                            <li :class="'page-item' + (meta.page === meta.pages ? ' disabled' : '')">
                              <a class="page-link" href="#" @click="paginate(meta.page + 1)">Next</a>
                            </li>
                            <li :class="'page-item' + (meta.page === meta.pages ? ' disabled' : '')">
                              <a class="page-link" href="#" @click="paginate(meta.pages)">Last</a>
                            </li>
                          </ul>
                          <div class="input-group input-group-sm mb-3" style="max-width:100px;">
                            <input
                              v-model="meta.page"
                              type="text"
                              class="form-control p-100"
                              placeholder="Page"
                              @input="goto"
                            >
                            <span id="basic-addon2" class="input-group-text">{{ meta.pages }}</span>
                          </div>
                          <div class="input-group input-group-sm mb-3-mod" style="max-width:100px;">
                            <input
                              v-model="meta.perpage"
                              type="text"
                              class="form-control p-100"
                              placeholder="Limit"
                              @input="limit"
                            >
                            <span id="basic-addon2" class="input-group-text">Limit</span>
                          </div>
                        </nav>
                      </div>
                    </div>
                    <div :class="'show ' + (show.as === 'heatmap' ? 'd-block' : 'd-none')">
                      <Heatmap :series="series" :sym="showSymbol" :symbol="symbol" />
                    </div>
                    <div v-if="show.symbol">
                      <SymbolDetails ref="symbolDetailRef" :symbol-code="symbol" @back="show.symbol = false" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="isAdmin() && sql">
                <h3>Query</h3>
                <code v-html="sql" />
              </div>
            </div>
            <div class="col-lg-3">
              <div class="position-sticky" style="top: 120px">
                <!--end card-->
                <ScannerList @market="setMarket" @scan="scan" />
                <!--end card-->
              </div>
              <!--end sticky-->
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
    <ModalsColumnConfig
      v-if="show.columnConfig"
      :current-columns="selectedColumnKeys"
      @save="saveColumnConfiguration"
      @close="closeColumnConfig"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      rows: [],
      series: [],
      colors: ['#089950', '#056636', '#313641', '#b22833', '#db3241'],
      market: 'SP500Heatmap',
      meta: {
        total: 0,
        perpage: 10,
        pages: 1,
        page: 1
      },
      formData: {
        filters: {},
        timeframe: 'D',
        action: 'scanner',
        limit: [0, 500],
        order: ['st.sym', 'ASC'],
        user_email: ''
      },
      symbol: '',
      show: { filters: true, symbol: false, addWatchlist: true, as: 'heatmap', columnConfig: false },
      sql: '',
      // Add these new properties
      availableColumns: [
        { key: 'sym', label: 'Symbol', description: 'Stock ticker symbol', sortKey: 'Sym' },
        { key: 'sector', label: 'Market', description: 'Market sector classification', sortKey: 'sector' },
        { key: 'close', label: 'Close', description: 'Current closing price', sortKey: 'close' },
        { key: 'change', label: 'Change (%)', description: 'Percentage change from previous close', sortKey: 'change' },
        { key: 'dtime', label: 'Date/Time', description: 'Last update timestamp', sortKey: 'dtime' },
        { key: 'istate', label: 'IState', description: 'StateBarCount indicator', sortKey: 'istate' },
        { key: 'vstate', label: 'VState', description: 'HasStateBars indicator', sortKey: 'vstate' },
        { key: 'cstate', label: 'CState', description: 'CStateCount indicator', sortKey: 'cstate' },
        { key: 'sectors', label: 'Sector', description: 'Industry sector classification', sortKey: 'sectors' },
        { key: 'description', label: 'Description', description: 'Company full name', sortKey: 'description' }
      ],
      selectedColumnKeys: ['sym', 'sector', 'close', 'change']

    }
  },
  computed: {
    selectedColumns () {
      return this.availableColumns.filter(col => this.selectedColumnKeys.includes(col.key))
    }
  },
  watch: {
    showColumnConfig (newValue) {
      if (newValue) {
        this.tempSelectedColumns = [...this.selectedColumnKeys]
      }
    }
  },
  mounted () {
  // Load saved column configuration
    const savedColumns = localStorage.getItem('scannerTableColumns')
    if (savedColumns) {
      try {
        this.selectedColumnKeys = JSON.parse(savedColumns)
      } catch (e) {
        console.error('Error loading saved column configuration:', e)
      }
    }
    // ADD THIS LINE
    this.getData()
  },

  methods: {
    saveColumnConfiguration (selectedColumns) {
      this.selectedColumnKeys = selectedColumns
      localStorage.setItem('scannerTableColumns', JSON.stringify(selectedColumns))
      this.getData() // Refresh data with new columns
    },

    closeColumnConfig () {
      this.show.columnConfig = false
    },
    getData () {
      this.rows = []
      const user = this.$store.getters['app/getItem']('user')
      this.formData.user_email = user.user_email
      this.formData.market = this.market
      this.$xhr.api.post('/api/scanner', this.formData).then((response) => {
        this.$store.commit('app/setScannerForm', JSON.parse(JSON.stringify(this.formData)))
        this.meta.total = response.total
        if (response.query) {
          this.sql = response.query
        }
        this.makePager()

        const symbols = response.data
        const series = []
        if (!symbols) { return }
        symbols.forEach((obj, i) => {
          if (!symbols.includes(obj.sym)) {
            symbols.push(obj.sym)
            this.rows.push(obj)
            const fakeVal = this.getROC(obj)
            const val = fakeVal === 0 ? 0.1 : fakeVal

            const colorVal = this.getColor(val)
            const realVal = Math.abs(val)
            const row = { name: obj.sym, value: realVal, fakeVal, color: this.colors[colorVal], colorValue: colorVal, description: obj.description }
            series.push(row)
          }
        })
        this.series = series
      })
    },
    scan () {
      const slist = JSON.parse(JSON.stringify(this.$store.state.app.scanlist))
      this.formData.scanlist = slist
      this.getData()
    },
    formChanged (form) {
      this.formData.filters = form
      this.getData()
      console.log('ran')
    },
    setTimeframe (tf) {
      this.formData.timeframe = tf
    },
    setMarket (market) {
      this.market = market
      if (this.market !== 'custom') {
        this.getData()
      }
    },
    sort (col) {
      const sort = []
      sort[0] = col
      if (this.formData.order[0] === col) {
        if (this.formData.order[1] === 'ASC') {
          sort[1] = 'DESC'
        } else {
          sort[1] = 'ASC'
        }
      } else {
        sort[1] = 'DESC'
      }
      this.formData.order = sort
      this.getData()
    },
    makePager () {
      this.meta.pages = Math.ceil(this.meta.total / this.meta.perpage)
    },
    paginate (page) {
      this.meta.page = page
      const offset = this.meta.perpage * (page - 1)
      this.formData.limit = [offset, this.meta.perpage]
      this.getData()
    },
    limitChange (page) {
      this.meta.page = page
      const offset = this.meta.perpage * (page - 1)
      if (this.meta.perpage > 20) {
        this.meta.perpage = 20
      }
      this.formData.limit = [offset, this.meta.perpage]
      this.getData()
    },
    goto () {
      this.paginate(this.meta.page)
    },
    limit () {
      this.limitChange(this.meta.page)
    },
    showSymbol (sym) {
      this.show.symbol = true
      this.symbol = sym
      this.$refs.symbolDetailRef.chooseSymbol(this.symbol)
    },
    isAdmin () {
      const user = this.$store.getters['app/getItem']('user')
      if (['seasonaluser', 'eiicapital@gmail.com'].includes(user.user_login)) {
        return true
      }
      return false
    },
    iconClass (col) {
      return {
        las: true,
        'la-sort-down': col === this.formData.order[0] && this.formData.order[1] === 'DESC',
        'la-sort-up': col === this.formData.order[0] && this.formData.order[1] === 'ASC',
        'la-sort': col !== this.formData.order[0]
      }
    },
    getROC (sym) {
      if (!sym.close || !sym.prevclose) { return 0 }
      const diff = sym.close - sym.prevclose
      const roc = (diff / sym.prevclose) * 100
      return roc.toFixed(2)
    },
    getColor (val) {
      if (val > 6) { return 0 }
      if (val > 3) { return 1 }
      if (val > -3) { return 2 }
      if (val > -6) { return 3 }
      return 4
    },
    setView (v) {
      if (v === 'heatmap') {
        this.formData.limit = [0, 5000]
      } else {
        this.formData.limit = [0, 10]
      }
      this.show.as = v
      this.getData()
    }

  }
}
</script>
