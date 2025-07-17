<template>
  <div>
    <Navbar />
    <Subbar title="Seasonality > Scanner" :submenu="true" />
    <div class="page-wrapper">
      <div class="page-content-tab">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-9">
              <div v-if="show.symbol">
                <SymbolDetails :symbol-code="symbol" @back="show.symbol=false" />
              </div>
              <div v-else class="card">
                <div class="card-header bg-dark text-white">
                  <div class="row align-items-center">
                    <div class="col">
                      <button class="btn btn-secondary" type="button" @click="show.filters=!show.filters">
                        + Filter
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-header bg-light">
                  <div class="row align-items-center">
                    <div class="col">
                      <FormsSeascan v-if="show.filters" @change="formChanged" />
                    </div>
                  </div>
                </div>
                <div class="card-body p-0">
                  <div id="Amount_history" class="tab-content">
                    <div id="Added" class="tab-pane fade show active" role="tabpanel" aria-labelledby="Added-tab">
                      <div class="table-responsive p-0">
                        <table id="datatable" class="table table-striped table-bordered" style="word-break: break-all;">
                          <thead class="thead-light sortable">
                            <tr>
                              <th @click="sort('Sym')">
                                <i :class="iconClass('Sym')" /> Sym
                              </th>
                              <th @click="sort('sector')">
                                <i :class="iconClass('sector')" /> Sentiment
                              </th>
                              <th @click="sort('Confidence')">
                                <i :class="iconClass('Confidence')" /> Confidence
                              </th>
                              <th @click="sort('Move')">
                                <i :class="iconClass('Move')" /> Move
                              </th>
                              <th @click="sort('MaxDrawdown')">
                                <i :class="iconClass('MaxDrawdown')" /> Max. Drawdown
                              </th>
                              <th @click="sort('MaxProfit')">
                                <i :class="iconClass('MaxProfit')" /> Max. Profit
                              </th>
                              <th @click="sort('Reward_Risk')">
                                <i :class="iconClass('Reward_Risk')" /> Reward Risk
                              </th>
                              <th @click="sort('SIV')">
                                <i :class="iconClass('SIV')" /> SIV
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(r, i) in rows" :key="i">
                              <td><a href="javascript:;" class="text-blue" @click="showSymbol(r.Sym)">{{ r.Sym }}</a></td>
                              <td>{{ r.Direction }}</td>
                              <td>{{ r.Confidence }}</td>
                              <td>{{ r.Move }}</td>
                              <td>{{ r.MaxDrawdown }}</td>
                              <td>{{ r.MaxProfit }}</td>
                              <td>{{ r.Reward_Risk }}</td>
                              <td>{{ r.SIV }}</td>
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
                          <input v-model="meta.page" type="text" class="form-control p-100" placeholder="Page" @input="goto">
                          <span id="basic-addon2" class="input-group-text">{{ meta.pages }}</span>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="position-sticky" style="top: 120px">
                <Watchlist />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rows: [],
      meta: {
        total: 0,
        perpage: 10,
        pages: 1,
        page: 1
      },
      formData: {
        action: 'getScannerResults',
        limit: [0, 10],
        order: ['id', 'DESC']
      },
      show: { filters: true, symbol: false }
    }
  },
  mounted () {
  },
  methods: {
    getData () {
      this.$xhr.api.post('/api/seasonality', this.formData).then((response) => {
        this.$store.commit('app/setSeascanForm', JSON.parse(JSON.stringify(this.formData)))
        this.rows = response.data.results
        this.meta.total = response.pager.total
        this.makePager()
      })
    },
    formChanged (form) {
      this.formData.filters = form
      this.getData()
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
    goto () {
      this.paginate(this.meta.page)
    },
    showSymbol (sym) {
      this.$router.push({ name: 'seasonality', query: { sym } })
    },
    iconClass (col) {
      return {
        las: true,
        'la-sort-down': col === this.formData.order[0] && this.formData.order[1] === 'DESC',
        'la-sort-up': col === this.formData.order[0] && this.formData.order[1] === 'ASC',
        'la-sort': col !== this.formData.order[0]
      }
    }
  }
}
</script>
