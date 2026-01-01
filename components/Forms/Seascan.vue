<template>
  <div>
    <form class="">
      <div class="row">
        <div class="col-md-3">
          <div class="mb-3">
            <label>Type</label>
            <select v-model="form.type" class="form-select">
              <option value="month">
                Month
              </option>
              <option value="quarter">
                Quarter
              </option>
              <option value="year">
                Year
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3">
            <label>Date</label>
            <select v-if="form.type === 'month'" v-model="form.month" class="form-control" @change="formChanged">
              <optgroup v-for="(y, i) in dates.years" :key="i" :label="y">
                <option v-for="(m, idx) in dates.months" :key="idx" :value="y + '' + (idx + 1)">
                  {{ m }}
                </option>
              </optgroup>
            </select>
            <select v-if="['year', 'quarter'].includes(form.type)" v-model="form.year" class="form-select"
              @change="formChanged">
              <option v-for="(n, i) in 10" :key="i" :value="(dates.year - i)">
                {{ dates.year - i }}
              </option>
            </select>
            <select v-if="form.type === 'quarter'" v-model="form.quarter" class="form-select" @change="formChanged">
              <option v-for="(n, i) in 4" :key="i" :value="'q' + n">
                Q{{ n }}
              </option>
            </select>
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
      </div>
      <div class="row">
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
            <div class="col">
              <label for="subject">Price</label>
              <select v-model="form.pricesel" class="form-select" @change="formChanged">
                <option value="greater">
                  Greater than
                </option>
                <option value="lower">
                  Lower than
                </option>
              </select>
            </div>
            <div class="col">
              <label for="subject" />
              <input v-model="form.priceval" class="form-control" type="number">
            </div>
          </div>
        </div>
        <div class="col-md-3" />
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
              <label for="subject">Average Move</label>
              <select v-model="form.movemin" class="form-select" @change="formChanged">
                <option v-for="(n, i) in 100" :key="i" :value="n">
                  {{ n }}
                </option>
              </select>
            </div>
            <div class="col">
              <label for="subject" />
              <select v-model="form.movemax" class="form-select" @change="formChanged">
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
        type: 'month',
        year: 0,
        quarter: 0,
        month: 0,
        market_id: 0,
        exchange_id: 0,
        dir: 1,
        rrmin: 1,
        rrmax: 100,
        pricesel: 'greater',
        priceval: 0,
        sivmin: 10,
        sivmax: 100,
        confmin: 90,
        confmax: 100,
        movemin: 1,
        movemax: 100
      },
      dates: {
        years: [],
        year: '2026',
        month: '1',
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

    const seascanForm = this.$store.getters['app/getItem']('seascanForm')
    if (seascanForm.action) {
      const scanForm = JSON.parse(JSON.stringify(seascanForm))
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
    },
    reset() {
      this.form.year = 0
      this.form.quarteer = 0
      this.form.month = 0
      this.form.market_id = 0
      this.form.exchange_id = 0
      this.form.dir = 1
      this.form.rrmin = 1
      this.form.rrmax = 100
      this.form.pricesel = 'greater'
      this.form.priceval = 0
      this.form.sivmin = 10
      this.form.sivmax = 100
      this.form.confmin = 90
      this.form.confmax = 100
      this.form.movemin = 1
      this.form.movemax = 100
      this.formChanged()
    }
  }

}
</script>
