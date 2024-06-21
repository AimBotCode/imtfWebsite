<template>
  <div class="card">
    <div class="card-body" style="min-height: 800px;">
      <highchart
        :options="chartOptions"
        :modules="['treemap']"
        :redraw="true"
        :exporting="true"
        :update="watchers"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    series: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      heatmap: 'BSE200Heatmap',
      colors: ['#089950', '#1a3326', '#313641', '#74242c', '#db3241'],
      watchers: ['options.title', 'options.subtitle', 'options.series'],
      points: []
    }
  },
  computed: {
    chartOptions () {
      let height = 1200
      if (this.series.length < 100) { height = 900 } else if (this.series.length < 50) { height = 600 } else if (this.series.length < 25) { height = 300 } else {
        height = 1200
      }
      return {
        chart: {
          height
        },
        colorAxis: {
          minColor: '#FFFFFF',
          maxColor: '#000000'
        },
        series: [{
          type: 'treemap',
          layoutAlgorithm: 'squarified',
          data: this.series
        }],
        title: {
          text: ''
        },
        tooltip: {
          formatter () {
            return this.point.description + ' (%' + this.point.fakeVal + ')'
          }
        }
      }
    }
  },
  methods: {
    getColor (val) {
      if (val > 3) { return 0 }
      if (val > 1) { return 1 }
      if (val > -1) { return 2 }
      if (val > -3) { return 3 }
      return 4
    }
  }
}
</script>
