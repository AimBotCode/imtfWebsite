<template>
  <div>
    <form class="">
      <div class="row">
        <div class="col-md-3">
          <div class="mb-3">
            <label>Timeframe</label>
            <div class="toolbar">
              <button type="button" :class="getClass(10)" @click="setTimeframe(10)">
                10
              </button>
              <button type="button" :class="getClass(30)" @click="setTimeframe(30)">
                30
              </button>
              <button type="button" :class="getClass(60)" @click="setTimeframe(60)">
                60
              </button>
              <button type="button" :class="getClass(120)" @click="setTimeframe(120)">
                120
              </button>
              <button type="button" :class="getClass(240)" @click="setTimeframe(240)">
                240
              </button>
              <button type="button" :class="getClass('D')" @click="setTimeframe('D')">
                D
              </button>
              <button type="button" :class="getClass('W')" @click="setTimeframe('W')">
                W
              </button>
              <button type="button" :class="getClass('M')" @click="setTimeframe('M')">
                M
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="mb-3">
            <label>Strategy</label>
            <select v-model="forms[timeframe].strategy" class="form-select" @change="formChanged">
              <option selected="" value="0">
                None
              </option>
              <option value="" disabled="">
                &nbsp;Shaded (Setup): #4
              </option>
              <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;Trend: Bull (Green): Green shaded Bullish Setup
              </option>
              <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;Trend: Bear (Red): Red shaded Bearish Setup
              </option>
              <option v-if="isSubscribed" value="3" hidden="">
                &nbsp;&nbsp;&nbsp;&nbsp;Trend: Neutral
              </option>
              <option v-if="isSubscribed" value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;CT: Bull (Green): Green shaded Bullish Setup
              </option>
              <option v-if="isSubscribed" value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;CT: Bear (Red): Red shaded Bearish Setup
              </option>
              <option v-if="isSubscribed" value="6">
                &nbsp;&nbsp;&nbsp;&nbsp;CT: Neutral
              </option>
              <option v-if="isSubscribed" value="7">
                &nbsp;&nbsp;&nbsp;&nbsp;VT: Bull (Green): Green shaded Bullish Setup
              </option>
              <option v-if="isSubscribed" value="8">
                &nbsp;&nbsp;&nbsp;&nbsp;VT: Bear (Red): Red shaded Bearish Setup
              </option>
              <option v-if="isSubscribed" value="9">
                &nbsp;&nbsp;&nbsp;&nbsp;VT: Neutral
              </option>
              <option v-if="isSubscribed" value="" disabled="">
                &nbsp;Breakout (Trending): #5
              </option>
              <option v-if="isSubscribed" value="13">
                &nbsp;&nbsp;&nbsp;&nbsp;CT: Bull (Green): Green shaded Bullish Setup
              </option>
              <option v-if="isSubscribed" value="14">
                &nbsp;&nbsp;&nbsp;&nbsp;CT: Bear (Red): Red shaded Bearish Setup
              </option>
              <option v-if="isSubscribed" value="15">
                &nbsp;&nbsp;&nbsp;&nbsp;CT: Neutral
              </option>
              <option v-if="isSubscribed" value="16">
                &nbsp;&nbsp;&nbsp;&nbsp;VT: Bull (Green): Green shaded Bullish Setup
              </option>
              <option v-if="isSubscribed" value="17">
                &nbsp;&nbsp;&nbsp;&nbsp;VT: Bear (Red): Red shaded Bearish Setup
              </option>
              <option v-if="isSubscribed" value="18">
                &nbsp;&nbsp;&nbsp;&nbsp;VT: Neutral
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3">
            <label for="subject">CK Momentum</label>
            <select v-model="forms[timeframe].momentum" class="form-select" @change="formChanged">
              <option selected="" value="0">
                Off
              </option>
              <option value="" disabled="">
                &nbsp;Bull
              </option>
              <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull New
              </option>
              <option value="" disabled="">
                &nbsp;Bear
              </option>
              <option value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear New
              </option>
              <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;Neutral New
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3 row">
            <div class="col">
              <label for="subject">iState</label>
              <select v-model="forms[timeframe].istatefrom" class="form-select" @change="formChanged">
                <option v-for="(n,i) in 51" :key="i" :value="n-1">
                  {{ n-1 }}
                </option>
              </select>
            </div>
            <div class="col">
              <label for="subject" />
              <select v-model="forms[timeframe].istateto" class="form-select" @change="formChanged">
                <option v-for="(n,i) in 51" :key="i" :value="n-1">
                  {{ n-1 }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3">
            <label>Optimize</label>
            <select v-model="forms[timeframe].optimize" class="form-select" @change="formChanged">
              <option selected="" value="0">
                Off
              </option>
              <option value="" disabled="">
                &nbsp;Bull
              </option>
              <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull New
              </option>
              <option value="" disabled="">
                &nbsp;Bear
              </option>
              <option value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear New
              </option>
              <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;Neutral New
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3">
            <label for="subject">Manesh</label>
            <select v-model="forms[timeframe].manesh" class="form-select" @change="formChanged">
              <option selected="" value="0">
                Off
              </option>
              <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;Neutral
              </option>
              <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option value="16">
                &nbsp;&nbsp;&nbsp;&nbsp;Vimtf
              </option>
              <option value="17">
                &nbsp;&nbsp;&nbsp;&nbsp;Orange
              </option>
              <!--               <option value="" disabled="">
                &nbsp;Bar Range
              </option>
              <option value="" disabled="">
                &nbsp;Bull
              </option>
              <option value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull: New
              </option>
              <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull: 1-5
              </option>
              <option value="6">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull: 6-10
              </option>
              <option value="7">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull: >10
              </option>
              <option value="" disabled="">
                &nbsp;Bear
              </option>
              <option value="8">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear: New
              </option>
              <option value="9">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear: 1-5
              </option>
              <option value="10">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear: 6-10
              </option>
              <option value="11">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear: >10
              </option>
              <option value="" disabled="">
                &nbsp;Neutral
              </option>
              <option value="12">
                &nbsp;&nbsp;&nbsp;&nbsp;Neutral: New
              </option>
              <option value="13">
                &nbsp;&nbsp;&nbsp;&nbsp;Neutral: 1-5
              </option>
              <option value="14">
                &nbsp;&nbsp;&nbsp;&nbsp;Neutral: 6-10
              </option>
              <option value="15">
                &nbsp;&nbsp;&nbsp;&nbsp;Neutral: >10
              </option> -->
            </select>
          </div>
        </div>

        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3">
            <label>Bar</label>
            <select v-model="forms[timeframe].bar" class="form-select" @change="formChanged">
              <option selected="" value="0">
                &nbsp;Off
              </option>
              <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;Real Bull Bar
              </option>
              <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;Real Bear Bar
              </option>
              <option value="" disabled="">
                &nbsp;Bars
              </option>
              <option value="15">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull Flip
              </option>
              <option value="16">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear Flip
              </option>
              <option value="17">
                &nbsp;&nbsp;&nbsp;&nbsp;BearDD False
              </option>
              <option value="18">
                &nbsp;&nbsp;&nbsp;&nbsp;BullDD False
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3">
            <label>Price@iMTF</label>
            <select v-model="forms[timeframe].priceimtf" class="form-select" @change="formChanged">
              <option selected="" value="0">
                Off
              </option>
              <option value="" disabled="">
                &nbsp;Real Time Line
              </option>
              <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;Black Cross
              </option>
              <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;Purple Dot
              </option>
              <option value="" disabled="">
                &nbsp;Real Time
              </option>
              <option value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;Black Cross
              </option>
              <option value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;Purple Dot
              </option>
              <option value="" disabled="">
                &nbsp;Time
              </option>
              <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;Black Cross
              </option>
              <option value="6">
                &nbsp;&nbsp;&nbsp;&nbsp;Purple Dot
              </option>
              <option value="" disabled="">
                &nbsp;iMTFA
              </option>
              <option value="7">
                &nbsp;&nbsp;&nbsp;&nbsp;Real Time Line
              </option>
              <option value="8">
                &nbsp;&nbsp;&nbsp;&nbsp;Real Time
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3">
            <label for="subject">vBar</label>
            <select v-model="forms[timeframe].vbar" class="form-select" @change="formChanged">
              <option selected="" value="0">
                Off
              </option>
              <option value="1">
                Yellow
              </option>
              <option value="2">
                Purple
              </option>
              <option value="3">
                Yellow/Purple
              </option>
              <option value="4">
                Gray
              </option>
              <option value="5">
                Green
              </option>
              <option value="6">
                Red
              </option>
              <option value="7">
                Orange
              </option>
              <option value="8">
                Orange 1 bar
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3">
            <label for="subject">vTNT</label>
            <select v-model="forms[timeframe].vtnt" class="form-select" @change="formChanged">
              <option selected="" value="0">
                Off
              </option>
              <option value="3">
                TNT
              </option>
              <option value="4">
                TNT 1 bar
              </option>
              <option value="5">
                TNT 2 bar
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3">
            <label for="subject">vOpt</label>
            <select v-model="forms[timeframe].vopt" class="form-select" @change="formChanged">
              <option value="0">
                Off
              </option>                  <option value="15">
                PY Shade
              </option>                  <option value="16">
                TNT Shakeout
              </option>                  <option value="17">
                Reverse
              </option>                  <option value="5">
                Shakeout
              </option>                  <option value="" disabled="">
                Type
              </option>                  <option value="2">
                &nbsp;&nbsp;Bull Shade
              </option>                  <option value="3">
                &nbsp;&nbsp;Bear Shade
              </option>                  <option value="4">
                &nbsp;&nbsp;Any Shade
              </option>                  <option value="" disabled="">
                Arrow
              </option>                  <option value="8">
                &nbsp;&nbsp;Green
              </option>                  <option value="9">
                &nbsp;&nbsp;Red
              </option>                  <option value="19">
                &nbsp;&nbsp;Red/Green
              </option>                  <option value="20">
                &nbsp;&nbsp;Previous Arrow
              </option>                  <option value="" disabled="">
                Touch
              </option>                  <option value="11">
                &nbsp;&nbsp;T1
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3">
            <label>CT</label>
            <select v-model="forms[timeframe].ct" class="form-select" @change="formChanged">
              <option value="0">
                Off
              </option>                  <option value="" disabled="">
                All
              </option>                  <option value="1">
                &nbsp;&nbsp;All Blue
              </option>                  <option value="2">
                &nbsp;&nbsp;All Green
              </option>                  <option value="3">
                &nbsp;&nbsp;All Red
              </option>                  <option value="" disabled="">
                CT
              </option>                  <option value="4">
                &nbsp;&nbsp;Bear Zone
              </option>                  <option value="5">
                &nbsp;&nbsp;Bull Zone
              </option>                  <option value="" disabled="">
                Touch
              </option>                  <option value="6">
                &nbsp;&nbsp;Any
              </option>                  <option value="7">
                &nbsp;&nbsp;Bull Zone
              </option>                  <option value="8">
                &nbsp;&nbsp;Bear Zone
              </option>                  <option value="9">
                &nbsp;&nbsp;Blue
              </option>                  <option value="10">
                &nbsp;&nbsp;Green
              </option>                  <option value="11">
                &nbsp;&nbsp;Red
              </option>                  <option value="12">
                &nbsp;&nbsp;Upper Bull
              </option>                  <option value="13">
                &nbsp;&nbsp;Lower Bear
              </option>                  <option value="14">
                &nbsp;&nbsp;CT Bear Zone
              </option>                  <option value="15">
                &nbsp;&nbsp;CT Bull Zone
              </option>
            </select>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  emits: ['change'],
  data () {
    return {
      forms: {
        10: this.getEmptyForm(10),
        30: this.getEmptyForm(30),
        60: this.getEmptyForm(60),
        120: this.getEmptyForm(120),
        240: this.getEmptyForm(240),
        D: this.getEmptyForm('D'),
        W: this.getEmptyForm('W'),
        M: this.getEmptyForm('M')
      },
      timeframe: 'D',
      changed: []
    }
  },
  computed: {
    isSubscribed () {
      if (this.$config.env === 'development') { return true }
      const roles = this.$store.getters['app/getItem']('roles')
      if (roles.includes('memberium_memberships-rtscannerleveliii')) {
        return true
      }

      return this.$store.getters['app/getItem']('active')
    }
  },
  mounted () {
    // this.emitForm()
    const scannerForm = this.$store.getters['app/getItem']('scannerForm')
    if (scannerForm.action) {
      const scanForm = JSON.parse(JSON.stringify(scannerForm))
      this.forms = scanForm.filters
      this.emitForm()
    } else {
      this.emitForm()
    }
  },
  methods: {
    emitForm () {
      this.$emit('change', this.forms)
    },
    formChanged () {
      if (this.changed.includes(this.timeframe)) {
        const form = JSON.parse(JSON.stringify(this.forms[this.timeframe]))
        const blank = this.getEmptyForm(this.timeframe)

        let equal = true
        Object.keys(blank).forEach(function (key) {
          /* eslint eqeqeq: "off" */
          if (form[key] != blank[key]) {
            equal = false
          }
        })

        if (equal === true) {
          const idx = this.changed.indexOf(this.timeframe)
          this.changed.splice(idx, 1)
        }
      } else {
        this.changed.push(this.timeframe)
      }

      this.emitForm()
    },
    setTimeframe (t) {
      this.timeframe = t
      this.$emit('timeframe', this.timeframe)
    },
    getEmptyForm (tf) {
      return {
        timeframe: tf,
        strategy: 0,
        istatefrom: 0,
        istateto: 0,
        priceimtf: 0,
        momentum: 0,
        optimize: 0,
        bar: 0,
        vbar: 0,
        vtnt: 0,
        ct: 0,
        vopt: 0,
        manesh: 0
      }
    },
    getClass (tf) {
      return {
        'btn btn-sm btn-outline-dark': true,
        active: tf === this.timeframe,
        'bg-info': this.changed.includes(tf)
      }
    }
  }
}
</script>
