<template>
  <div>
    <div class="card">
      <div class="card-body p-0" style="min-height: 720px;">
        <!-- <VueTradingView
          :options="{
            width: 1260,
            height: 720,
            symbol: symbol,
            theme: 'dark',
            interval: 'D',
            timezone: 'UTC',
            locale: 'en'
          }"
        /> -->
        <div class="container-fluid">
          <!-- end page title end breadcrumb -->
          <div class="row">
            <div class="col-12">
              <div v-if="show.results" class="card">
                <!-- TradingView Widget BEGIN -->

                <div id="stockwidget" />
                <!-- TradingView Widget END -->
                <div class="card-header">
                  <div class="row align-items-center">
                    <div class="col">
                      <h4 class="card-title flex justify-content-between">
                        {{ results.stock.Description }}
                      </h4>
                    </div>
                    <!--end col-->
                    <div class="col-auto">
                      <span>{{ results.stock.Exchange_Description_Esignal }}</span> -
                      <span>{{ results.stock.Sector_Esignal }}</span>
                    </div>
                  <!--end col-->
                  </div>
                <!--end row-->
                </div>
                <!--end card-header-->
                <div class="card-body">
                  <div id="stock_chart" class="apex-charts mb-3">
                    <line-chart
                      :chart-options="chart.main.options"
                      :chart-data="chart.main.data"
                      :plugins="chart.main.plugins"
                      :height="100"
                      :width="300"
                      chart-id="lineChart"
                    />
                  </div>
                </div>
              <!--end card-body-->
              </div>
              <!--end card-->
              <div v-if="show.results" class="row">
                <div class="col-lg-8">
                  <PieChart
                    id="pc1"
                    :title="'Monthly Stats ('+dates.year+'/'+dates.month+')'"
                    :data="chart.pieDatas.monthly"
                    :options="chart.pie.options"
                    :results="results.averages[0]"
                    layout="horizontal"
                  />

                  <PieChart
                    id="pc2"
                    :title="'Annual Stats ('+dates.year+')'"
                    :data="chart.pieDatas.annual"
                    :options="chart.pie.options"
                    :results="stats.annualPie"
                    layout="horizontal"
                  />
                </div>
                <!--end col-->
                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-header">
                      <div class="row align-items-center">
                        <div class="col">
                          <h4 class="card-title">
                            Predictions
                          </h4>
                        </div>
                        <!--end col-->
                        <div class="col-auto" />
                      <!--end col-->
                      </div>
                    <!--end row-->
                    </div>
                    <!--end card-header-->
                    <div class="card-body p-0">
                      <table id="datatable" class="table table-striped table-bordered">
                        <thead class="thead-light">
                          <tr>
                            <th>Year</th>
                            <th>Move</th>
                            <th>Max. DD</th>
                            <th>Max. Profit</th>
                            <th>SIV</th>
                          </tr>
                        <!--end tr-->
                        </thead>

                        <thead class="predictions">
                          <tr>
                            <th>Prediction</th>
                            <th>{{ results.averages[0].Move }}</th>
                            <th>{{ results.averages[0].MaxDrawdown }}</th>
                            <th>{{ results.averages[0].MaxProfit }}</th>
                            <th>{{ results.averages[0].SIV }}</th>
                          </tr>
                        <!--end tr-->
                        </thead>

                        <tbody>
                          <tr v-for="(p, i) in results.performances" :key="i">
                            <td>{{ p.Year }} <i :class="directionIcon(p.Direction)" /></td>
                            <td><span :class="(p.Direction===1?'bg-soft-success':'bg-soft-danger')+' px-1 rounded'">{{ p.Move }}</span></td>
                            <td>{{ p.MaxDrawdown }}</td>
                            <td>{{ p.MaxProfit }}</td>
                            <td>{{ p.SIV }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  <!--end card-body-->
                  </div>
                <!--end card-->
                </div>
              <!--end col-->
              </div>
            <!--end row-->
            </div>
          <!--end col-->
          </div>
          <!--end row-->
          <div v-if="show.results">
            <h1>Quarterly Stats ({{ dates.year }})</h1>
            <div class="row">
              <div class="col-md-6 col-lg-3">
                <PieChart
                  id="pc3"
                  title="Q1"
                  :data="chart.pieDatas.q1"
                  :options="chart.pie.options"
                  :results="stats.quarterPies[0]"
                  :height="200"
                  :width="200"
                  layout="vertical"
                />
              </div>
              <div class="col-md-6 col-lg-3">
                <PieChart
                  id="pc4"
                  title="Q2"
                  :data="chart.pieDatas.q2"
                  :options="chart.pie.options"
                  :results="stats.quarterPies[1]"
                  layout="vertical"
                />
              </div>
              <div class="col-md-6 col-lg-3">
                <PieChart
                  id="pc5"
                  title="Q3"
                  :data="chart.pieDatas.q3"
                  :options="chart.pie.options"
                  :results="stats.quarterPies[2]"
                  layout="vertical"
                />
              </div>
              <div class="col-md-6 col-lg-3">
                <PieChart
                  id="pc6"
                  title="Q4"
                  :data="chart.pieDatas.q4"
                  :options="chart.pie.options"
                  :results="stats.quarterPies[3]"
                  layout="vertical"
                />
                <!--end card-->
              </div>
            </div>
          </div>
        </div><!-- container -->
      </div>
      <!--end card-body-->
    </div>
  </div>
</template>

<script>
// {labels: 'My label',datasets:[{data:[5,9,11,66], label:'Test', borderColor: '#eb255a', backgroundColor: '#c0c0c0', fill: '+2'}]}
export default {
  props: {
    symbolCode: {
      default: '',
      type: String
    }
  },
  emits: ['back'],
  data () {
    return {
      query: { text: '', month: '', code: '' },
      symbols: [],
      results: {},
      stats: { annualPie: { Confidence: 1 }, quarterPies: [] },
      show: { results: false, symbols: false },
      dates: {
        years: [],
        year: '2022',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      },
      chart: {
        main: {
          data: {
            datasets: [{
              label: 'Title',
              data: [45, 55, 48, 35, 12]
            }]
          },
          options: {
            scales: {
              y: { beginAtZero: true }
            },
            interaction: {
              mode: 'index',
              intersect: false
            },
            annotation: {
              // drawTime: 'afterDatasetsDraw',
            }
          },
          plugins: [{
            afterDraw: (chart) => {
              this.drawVertical(chart, 50)
              if (chart.tooltip?._active?.length) {
                this.drawVertical(chart, false)
              }
            }
          }]
        },
        pie: {
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                label (tooltipItem) {
                  return ''
                }
              }
            }
          }
        },
        pieDatas: {
          monthly: {
            datasets: [{
              data: [],
              backgroundColor: []
            }]
          },
          annual: {
            datasets: [{
              data: [],
              backgroundColor: []
            }]
          },
          q1: {
            datasets: [{
              label: 'Title',
              data: [60.21, 39.79],
              backgroundColor: [
                'rgba(3, 211, 0, .8)', 'rgba(0, 99, 132, .8)'
              ]
            }]
          },
          q2: {
            datasets: [{
              label: 'Title',
              data: [60.21, 39.79],
              backgroundColor: [
                'rgba(3, 211, 0, .8)', 'rgba(0, 99, 132, .8)'
              ]
            }]
          },
          q3: {
            datasets: [{
              label: 'Title',
              data: [60.21, 39.79],
              backgroundColor: [
                'rgba(3, 211, 0, .8)', 'rgba(0, 99, 132, .8)'
              ]
            }]
          },
          q4: {
            datasets: [{
              label: 'Title',
              data: [60.21, 39.79],
              backgroundColor: [
                'rgba(3, 211, 0, .8)', 'rgba(0, 99, 132, .8)'
              ]
            }]
          }
        }
      }
    }
  },
  mounted () {
    this.setDates()
    if (this.symbolCode.length > 0) {
      this.chooseSymbol(this.symbolCode)
    }
  },
  methods: {
    getSymbols () {
      this.$xhr.api.post('/api/seasonality', { action: 'getSymbols', query: this.query.text }).then((response) => {
        this.symbols = response.data
        this.show.symbols = true
      })
    },
    getMonthlyPredication (symbol) {
      this.show.symbols = false
      this.show.results = false
      this.$xhr.api.post('/api/seasonality', { action: 'getMonthlyPredication', symbol, month: this.query.month }).then((response) => {
        this.getStats(symbol)
        this.results = response.data
        this.query.text = response.data.stock.Description

        this.makeMainChart(this.results.stock.Description, this.results.yearlystats)
        this.makeMonthlyChart(this.results.averages[0])
      })
    },
    getStats (symbol) {
      this.$xhr.api.post('/api/seasonality', { action: 'getStats', symbol, month: this.query.month }).then((response) => {
        this.makeAnnualChart(response.data.annualPie)
        this.makeQuarterCharts(response.data.quarterPies)
        this.stats = response.data
        this.show.results = true
      })
    },
    chooseSymbol (symbol) {
      this.query.code = symbol
      this.getMonthlyPredication(symbol)
    },
    getResults () {
      const sym = this.query.code
      this.getMonthlyPredication(sym)
    },
    makeAnnotations (data) {
      const marketing = [data.today]
      const amount = [data.todayvalue]
      // populate 'annotations' array dynamically based on 'marketing'
      const annotations = marketing.map(function (date, index) {
        return {
          type: 'line',
          id: 'vline' + index,
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: date,
          borderColor: 'green',
          borderWidth: 1,
          label: {
            enabled: true,
            position: 'center',
            content: amount[index]
          }
        }
      })
      this.chart.main.annotation = { annotations }
    },
    setDates () {
      const currentDate = new Date()
      this.dates.month = currentDate.getMonth() + 1
      this.dates.year = currentDate.getFullYear()
      this.dates.years = []
      for (let i = 0; i < 10; i++) {
        const onyear = this.dates.year - i
        this.dates.years.push(onyear)
      }
      this.query.month = this.dates.year + '' + this.dates.month
    },
    makeMainChart (symbol, data) {
      this.makeAnnotations(data)
      this.chart.main.data.labels = data.labels
      this.chart.main.data.datasets[0].label = symbol
      this.chart.main.data.datasets[0].pointBorderWidth = 0
      this.chart.main.data.datasets[0].pointRadius = 0
      this.chart.main.data.datasets[0].fill = {
        target: 'origin',
        above: 'rgb(255, 0, 0)', // Area will be red above the origin
        below: 'rgb(0, 0, 255)' // And blue below the origin
      }
      this.chart.main.data.datasets[0].backgroundColor = 'rgba(0, 0, 255, 0.4)'
      this.chart.main.data.datasets[0].borderColor = '#eb255a'
      this.chart.main.data.datasets[0].data = data.series
    },
    drawVertical (chart, idx) {
      const xAxis = chart.scales.x
      const yAxis = chart.scales.y

      // let x = this.results.yearlystats.todayindex
      let x = xAxis.getPixelForValue(this.results.yearlystats.todayindex)
      if (!idx) {
        x = chart.tooltip._active[0].element.x
      }

      const ctx = chart.ctx
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x, yAxis.top)
      ctx.lineTo(x, yAxis.bottom)
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(0, 0, 255, 0.4)'
      ctx.stroke()
      ctx.restore()
    },
    directionIcon (dir) {
      return {
        las: true,
        'la-chevron-down text-red': dir === -1,
        'la-chevron-up text-green': dir === 1
      }
    },
    makeMonthlyChart (data) {
      const conf = data.Confidence
      let color = 'rgba(3, 211, 0, .8)'
      if (data.Direction < 0) { color = 'rgba(209, 0, 0, .8)' }
      this.chart.pieDatas.monthly.datasets[0].data = [conf, 100 - conf]
      this.chart.pieDatas.monthly.datasets[0].backgroundColor = [color, 'rgba(0, 99, 132, .8)']
    },
    makeAnnualChart (data) {
      const conf = data.Confidence
      let color = 'rgba(3, 211, 0, .8)'
      if (data.Direction < 0) { color = 'rgba(209, 0, 0, .8)' }
      this.chart.pieDatas.annual.datasets[0].data = [conf, 100 - conf]
      this.chart.pieDatas.annual.datasets[0].backgroundColor = [color, 'rgba(0, 99, 132, .8)']
    },
    makeQuarterCharts (dataset) {
      dataset.forEach((data, i) => {
        const q = i + 1
        this.makeQuarterChart(q, data)
      })
    },
    makeQuarterChart (quarter, data) {
      const qtext = 'q' + quarter
      const conf = data.Confidence
      let color = 'rgba(3, 211, 0, .8)'
      if (data.Direction < 0) { color = 'rgba(209, 0, 0, .8)' }
      this.chart.pieDatas[qtext].datasets[0].data = [conf, 100 - conf]
      this.chart.pieDatas[qtext].datasets[0].backgroundColor = [color, 'rgba(0, 99, 132, .8)']
    },
    back () {
      console.log('back called')
      this.$emit('back')
    }
  }
}
</script>
