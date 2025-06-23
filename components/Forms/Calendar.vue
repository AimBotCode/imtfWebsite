<template>
  <div>
    <form class="">
      <div class="row">
        <div class="col-md-3">
          <div class="mb-3">
            <label>Date</label>
            <input v-model="form.day" type="date" class="form-control" @change="formChanged">
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3">
            <label>Market</label>
            <select v-model="form.market_id" class="form-select" @change="formChanged">
              <option v-for="(m, i) in markets" :key="i" :value="m.id">
                {{ m.Market }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3">
            <label>Exchange</label>
            <select v-model="form.exchange_id" class="form-select" @change="formChanged">
              <option v-for="(e, i) in exchanges" :key="i" :value="e.Exchange_id">
                {{ e.Exchange }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3">
            <label for="subject">Sentiment</label>
            <select v-model="form.dir" class="form-select" @change="formChanged">
              <option value="1">
                Bull
              </option>
              <option value="0">
                Neutral
              </option>
              <option value="-1">
                Bear
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="mb-3 row">
            <div class="col">
              <label for="subject">SIV</label>
              <select v-model="form.sivmin" class="form-select" @change="formChanged">
                <option v-for="(n, i) in 100" :key="i" :value="n">
                  {{ n }}
                </option>
              </select>
            </div>
            <div class="col">
              <label for="subject" />
              <select v-model="form.sivmax" class="form-select" @change="formChanged">
                <option v-for="(n, i) in 100" :key="i" :value="101 - n">
                  {{ 101 - n }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3 row">
            <div class="col">
              <label for="subject">Confidence (%)</label>
              <select v-model="form.confmin" class="form-select" @change="formChanged">
                <option v-for="(n, i) in 100" :key="i" :value="n">
                  {{ n }}
                </option>
              </select>
            </div>
            <div class="col">
              <label for="subject" />
              <select v-model="form.confmax" class="form-select" @change="formChanged">
                <option v-for="(n, i) in 100" :key="i" :value="101 - n">
                  {{ 101 - n }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3 row">
            <div class="col">
              <label for="subject">Reward/Risk</label>
              <select v-model="form.rrmin" class="form-select" @change="formChanged">
                <option v-for="(n, i) in 100" :key="i" :value="n">
                  {{ n }}
                </option>
              </select>
            </div>
            <div class="col">
              <label for="subject" />
              <select v-model="form.rrmax" class="form-select" @change="formChanged">
                <option v-for="(n, i) in 100" :key="i" :value="101 - n">
                  {{ 101 - n }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3 row">
            <label for="subject">Reset Filters</label>
            <button class="resetButton2" style="margin-top: 0.1rem;" type="button" @click="reset()">
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  emits: ['change'],
  data() {
    return {
      form: {
        day: 0,
        market_id: 0,
        exchange_id: 0,
        dir: 1,
        rrmin: 1,
        rrmax: 100,
        sivmin: 1,
        sivmax: 100,
        confmin: 1,
        confmax: 100,
        pattern: 'pattern_2_1'
      },
      dates: {
        years: [],
        year: '2025',
        month: '6',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        yearmonth: ''
      },
      markets: [],
      exchanges: []
    }
  },
  mounted() {
    this.getExchanges()
    this.setDates()

    const calendarForm = this.$store.getters['app/getItem']('calendarForm')
    if (calendarForm.action) {
      const scanForm = JSON.parse(JSON.stringify(calendarForm))
      this.form = scanForm.filters
      this.formChanged()
    } else {
      this.formChanged()
    }
  },
  methods: {
    getExchanges() {
      this.$xhr.api.post('/api/seasonality', { action: 'getExchanges' }).then((response) => {
        this.markets = response.data.markets
        this.exchanges = response.data.exchanges
      })
    },
    formChanged() {
      this.$emit('change', this.form)
    },
    setType(t) {
      this.form.type = 'month'
    },
    setDates() {
      const currentDate = new Date()
      this.dates.month = currentDate.getMonth() + 1
      this.dates.year = currentDate.getFullYear()
      this.dates.years = []
      for (let i = 0; i < 10; i++) {
        const onyear = this.dates.year - i
        this.dates.years.push(onyear)
      }
      this.dates.yearmonth = this.dates.year + '' + this.dates.month
      this.form.month = this.dates.yearmonth
      this.form.year = this.dates.year
      this.form.day = this.getToday(currentDate)
    },
    getToday(date) {
      const m = (date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))
      const d = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))
      return date.getFullYear() + '-' + m + '-' + d
    },
    reset() {
      this.form.day = 0
      this.form.market_id = 0
      this.form.exchange_id = 0
      this.form.dir = 1
      this.form.rrmin = 1
      this.form.rrmax = 100
      this.form.sivmin = 1
      this.form.sivmax = 100
      this.form.confmin = 1
      this.form.confmax = 100
      this.form.pattern = 'pattern_2_1'
      this.formChanged()
    }
  }

}
</script>
