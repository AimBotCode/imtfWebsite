<template>
  <div>
    <Navbar />
    <Subbar title="Heatmaps" :submenu="false" />

    <div class="page-wrapper">
      <div class="page-content-tab">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card-header bg-dark text-white">
                <div class="row align-items-center">
                  <div class="col">
                    <select v-model="heatmap" class="form-control" @change="getHeatmap">
                      <option value="BSE200Heatmap">
                        BSE200
                      </option>
                      <option value="SP500Heatmap">
                        SP500
                      </option>
                      <option value="WorldHeatmap">
                        World Indice
                      </option>
                      <option value="FTSEHeatmap">
                        FTSE
                      </option>
                      <option value="dax30Heatmap">
                        DAX30
                      </option>
                      <option value="Currencyheatmap">
                        Currency
                      </option>
                      <option value="Nasdaq100Heatmap">
                        Nasdaq 100
                      </option>
                      <option value="FuturesHeatmap">
                        Futures
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- <div class="card">
                <div class="card-body" style="min-height: 800px;">
                  <highchart
                    :options="chartOptions"
                    :modules="['treemap']"
                    :redraw="true"
                    :exporting="true"
                    :update="watchers"
                  />
                </div>
              </div> -->
              <Heatmap :series="points" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
export default {
  data () {
    return {
      heatmap: 'BSE200Heatmap',
      colors: ['#056636', '#42BD7F', '#C1C4CD', '#F77C80', '#bf0b0e'],
      watchers: ['options.title', 'options.subtitle', 'options.series'],
      points: []
    }
  },
  computed: {
    chartOptions () {
      return {
        chart: {
          height: 1200
        },
        colorAxis: {
          minColor: '#FFFFFF',
          maxColor: '#000000'
        },
        series: [{
          type: 'treemap',
          layoutAlgorithm: 'squarified',
          data: this.points
        }],
        title: {
          text: ''
        },
        tooltip: {
          formatter () {
            return this.point.description + ' (%' + this.point.value + ')'
          }
        }
      }
    }
  },
  mounted () {
    this.getHeatmap()
  },
  methods: {
    getColor (val) {
      if (val > 6) { return 0 }
      if (val > 3) { return 1 }
      if (val > -3) { return 2 }
      if (val > -6) { return 3 }
      return 4
    },
    getHeatmap () {
      this.$xhr.api.post('/api/seasonality', { action: 'getHeatmapData', country: this.heatmap }).then((response) => {
        const syms = response.data
        const series = []
        syms.forEach((obj, i) => {
          const plusOrMinus = Math.random() < 0.5 ? -1 : 1
          const val = (Math.floor(Math.random() * 10) + Math.random()) * plusOrMinus
          const colorVal = this.getColor(val)
          const boxname = obj.sym
          const realVal = Math.abs(val)
          const row = { name: boxname, value: realVal, color: this.colors[colorVal], colorValue: colorVal, description: obj.description }
          series.push(row)
        })
        this.points = series
      })
    }
  }
}
</script>
