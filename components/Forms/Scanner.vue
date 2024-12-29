<template>
  <div>
    <form class="">
      <div class="mx-6">
        <label>Timeframe</label>
        <div class="toolbar row">
          <div class="col-md-4" >
            <label for="fileInput" id="profileButton" style="float: left;" class="btn-outline-dark btn btn-sm" @input="profileOpenButton()">
              <span>Open Profile</span>
            </label>
            <input type="file" id="fileInput" style="display: none;" class="form-control"  @input="profileOpen()">
            <div class="createFileBorder marginalmove" style="border-radius: 0.2rem;">
              <label id="createProfileButton" style="float: left;" class="btn-outline-dark btn-sm" @input="createProfileOpen()">
                Create Profile
              </label>
              <input id="textInput" type="text" class="btn-sm smaller" style="border: transparent; border-left: 1px solid; border-radius: 1px;" @click="createProfile()">
            </div>
          </div>
          <div class="col-md-4">
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
          <div class="col-md-4">
            <button v-if="isSubscribed" class="btn btn-sm btn-outline-dark resetButton" type="button" @click="reset()">
              Reset Filters
            </button>
          </div>
        </div>
      </div>
      <div class="row">
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
                Neutral New
              </option>
            </select>
          </div>
        </div>
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
            <label>Price@iMTF</label>
            <select v-model="forms[timeframe].priceimtf" class="form-select" @change="formChanged">
              <option selected="" value="0">
                Off
              </option>
              <option value="" disabled="">
                &nbsp;Timing
              </option>
              <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;All Cross
              </option>
              <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;All Dot
              </option>
              <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="6">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option value="" disabled="">
                &nbsp;HB Investment
              </option>
              <option value="7">
                &nbsp;&nbsp;&nbsp;&nbsp;All Gray
              </option>
              <option value="8">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="9">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option value="" disabled="">
                &nbsp;All Investment
              </option>
              <option value="10">
                &nbsp;&nbsp;&nbsp;&nbsp;All Gray
              </option>
              <option value="11">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="12">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option value="" disabled="">
                &nbsp;iMTFA
              </option>
              <option value="13">
                &nbsp;&nbsp;&nbsp;&nbsp;All
              </option>
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
                &nbsp;Real Bull Bar
              </option>
              <option value="2">
                &nbsp;Real Bear Bar
              </option>
              <option value="" disabled="">
                &nbsp;Bars
              </option>
              <option value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull Flip
              </option>
              <option value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear Flip
              </option>
              <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;LDD
              </option>
              <option value="6">
                &nbsp;&nbsp;&nbsp;&nbsp;HDD
              </option>
              <option value="7">
                &nbsp;&nbsp;&nbsp;&nbsp;Fake Low
              </option>
              <option value="8">
                &nbsp;&nbsp;&nbsp;&nbsp;Fake High
              </option>
              <option value="" disabled="">
                &nbsp;Optimize
              </option>
              <option value="9">
                &nbsp;&nbsp;&nbsp;&nbsp;cbull false
              </option>
              <option value="10">
                &nbsp;&nbsp;&nbsp;&nbsp;cbear false
              </option>
              <option value="11">
                &nbsp;&nbsp;&nbsp;&nbsp;cLDD
              </option>
              <option value="12">
                &nbsp;&nbsp;&nbsp;&nbsp;cHDD
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3">
            <label for="subject">Over Extension</label>
            <select v-model="forms[timeframe].overextension" class="form-select" @change="formChanged">
              <option selected="" value="0">
                Off
              </option>
              <option value="1">
                OE
              </option>
              <option value="2">
                2G
              </option>
              <option value="3">
                3G+
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3">
            <label>CT</label>
            <select v-model="forms[timeframe].ct" class="form-select" @change="formChanged">
              <option selected="" value="0">
                Off
              </option>                  <option value="" disabled="">
                &nbsp;Price
              </option>                  <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;Above All
              </option>                  <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;Bellow All
              </option>                <option value="" disabled="">
                Touch
              </option>                  <option value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;Touch Top
              </option>                  <option value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;Touch Bottom
              </option>                   <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;Any
              </option>                  <option value="6">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull Zone
              </option>                   <option value="7">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear Zone
              </option>                    <option value="8">
                Bracket Move
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
              <option value="" disabled="">
                &nbsp;Bar Color
              </option>
              <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;Orange
              </option>
              <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;Orange 1 Bar
              </option>
              <option value="" disabled="">
                &nbsp;TNT
              </option>
              <option value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;TNT
              </option>
              <option value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;TNT 1 Bar
              </option>
              <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;TNT 2 Bar
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
              <option disabled="">
                &nbsp;TNT2 Real
              </option>
              <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;All
              </option>
              <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option value="" disabled="">
                &nbsp;TNT2 PBHold
              </option>
              <option value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;All
              </option>
              <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="6">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option disabled="">
                &nbsp;TNT2 PB
              </option>
              <option value="7">
                &nbsp;&nbsp;&nbsp;&nbsp;All
              </option>
              <option value="8">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="9">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option disabled="">
                &nbsp;TNT2 BO
              </option>
              <option value="10">
                &nbsp;&nbsp;&nbsp;&nbsp;All
              </option>
              <option value="11">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="12">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option disabled="">
                &nbsp;TNT Trend
              </option>
              <option value="13">
                &nbsp;&nbsp;&nbsp;&nbsp;All
              </option>
              <option value="14">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="15">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option disabled="">
                &nbsp;TNT3
              </option>
              <option value="16">
                &nbsp;&nbsp;&nbsp;&nbsp;All
              </option>
              <option value="17">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="18">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option disabled="">
                &nbsp;Yellow
              </option>
              <option value="19">
                &nbsp;&nbsp;&nbsp;&nbsp;All
              </option>
              <option value="20">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="21">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option disabled="">
                &nbsp;Yellow Concept
              </option>
              <option value="22">
                &nbsp;&nbsp;&nbsp;&nbsp;All
              </option>
              <option value="23">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="24">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3">
            <label for="subject">vOpt</label>
            <select v-model="forms[timeframe].vopt" class="form-select" multiple="true" @change="formChanged">
              <option selected="" value="">
                Off
              </option>                  <option value="1">
                &nbsp;&nbsp;Bull Shade
              </option>                  <option value="2">
                &nbsp;&nbsp;Bear Shade
              </option>                 <option disabled="">
                vTrend
              </option>                  <option value="3">
                &nbsp;&nbsp;Bull
              </option>                  <option value="4">
                &nbsp;&nbsp;Bear
              </option>                  <option value="5">
                &nbsp;&nbsp;UpFlip
              </option>                  <option value="6">
                &nbsp;&nbsp;DnFlip
              </option>                     <option value="7">
                &nbsp;&nbsp;UpRealFlip
              </option>                   <option value="8">
                &nbsp;&nbsp;DnRealFlip
              </option>                <option disabled="">
                Arrow
              </option>                  <option value="9">
                &nbsp;&nbsp;Bull
              </option>                  <option value="10">
                &nbsp;&nbsp;Bear
              </option>                  <option value="11">
                &nbsp;&nbsp;pBull
              </option>                  <option value="12">
                &nbsp;&nbsp;pBear
              </option>                <option disabled="">
                Touch
              </option>                  <option value="13">
                &nbsp;&nbsp;T1
              </option>                 <option disabled="">
                Bull Wick
              </option>                  <option value="14">
                &nbsp;&nbsp;Bull
              </option>                  <option disabled="">
                Bear Wick
              </option>                  <option value="15">
                &nbsp;&nbsp;Bear
              </option>                  <option disabled="">
                Bull Wick
              </option>                  <option value="16">
                &nbsp;&nbsp;PB
              </option>                   <option value="17">
                &nbsp;&nbsp;Bleep PB
              </option>                   <option value="18">
                &nbsp;&nbsp;BO
              </option>                   <option value="19">
                &nbsp;&nbsp;Fail PB
              </option>                   <option value="20">
                &nbsp;&nbsp;Fail
              </option>                   <option disabled="">
                Bear Wick
              </option>                  <option value="21">
                &nbsp;&nbsp;PB
              </option>                   <option value="22">
                &nbsp;&nbsp;Bleep PB
              </option>                   <option value="23">
                &nbsp;&nbsp;BO
              </option>                   <option value="24">
                &nbsp;&nbsp;Fail PB
              </option>                   <option value="25">
                &nbsp;&nbsp;Fail
              </option>                   <option disabled="">
                Ideal PB
              </option>                  <option value="26">
                &nbsp;&nbsp;TS
              </option>                   <option value="27">
                &nbsp;&nbsp;KS
              </option>                     <option value="28">
                &nbsp;&nbsp;SKB
              </option>                      <option disabled="">
                Closed Bar Ideal PB
              </option>                  <option value="29">
                &nbsp;&nbsp;TS
              </option>                   <option value="30">
                &nbsp;&nbsp;KS
              </option>                     <option value="31">
                &nbsp;&nbsp;ALL
              </option>                <option disabled="">
                C Div
              </option>                  <option value="32">
                &nbsp;&nbsp;Bull
              </option>                  <option value="33">
                &nbsp;&nbsp;Bear
              </option>                  <option value="34">
                &nbsp;&nbsp;pBull
              </option>                  <option value="35">
                &nbsp;&nbsp;pBear
              </option>                  <option disabled="">
                Bleep
              </option>                  <option value="36">
                &nbsp;&nbsp;Bull
              </option>                  <option value="37">
                &nbsp;&nbsp;Bear
              </option>                    <option value="38">
                &nbsp;&nbsp;all
              </option>        <option disabled="">
                Volatility
              </option>                  <option value="39">
                &nbsp;&nbsp;Bull
              </option>                  <option value="40">
                &nbsp;&nbsp;Bear
              </option>                  <option value="41">
                &nbsp;&nbsp;pBull
              </option>                  <option value="42">
                &nbsp;&nbsp;pBear
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3">
            <label for="subject">Shortcut</label>
            <select v-model="forms[timeframe].shortcut" class="form-select" @change="formChanged">
              <option selected="" value="0">
                Off
              </option>
              <option value="" disabled="">
                &nbsp;TNT Strategy
              </option>
              <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;pBull
              </option>
              <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;pBear
              </option>
              <option value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option value="" disabled="">
                &nbsp;Reverse-CT
              </option>
              <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="6">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option value="" disabled="">
                &nbsp;Timing with vimtf
              </option>
              <option value="7">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="8">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option value="" disabled="">
                &nbsp;pTNT at CIMTF
              </option>
              <option value="9">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="10">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option value="" disabled="">
                &nbsp;pvSetup at CIMTF
              </option>
              <option value="11">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="12">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3">
            <label for="subject">Forecast</label>
            <select v-model="forms[timeframe].forecast" class="form-select" @change="formChanged">
              <option selected="" value="0">
                Off
              </option>
              <option value="" disabled="">
                &nbsp;Live Bar
              </option>
              <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull PB
              </option>
              <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull Break
              </option>
              <option value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear PB
              </option>
              <option value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear Break
              </option>
              <option value="" disabled="">
                &nbsp;Closed Bar
              </option>
              <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull PB
              </option>
              <option value="6">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull Break
              </option>
              <option value="7">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear PB
              </option>
              <option value="8">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear Break
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3">
            <label for="subject">Forecast Adv</label>
            <select v-model="forms[timeframe].forecastadv" class="form-select" @change="formChanged">
              <option selected="" value="0">
                Off
              </option>
              <option value="" disabled="">
                &nbsp;Bull Forecast
              </option>
              <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;Gap
              </option>
              <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;PB
              </option>
              <option value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;Violation
              </option>
              <option value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;Real
              </option>
              <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;PB, Broke, Real
              </option>
              <option value="6">
                &nbsp;&nbsp;&nbsp;&nbsp;PB and Broke
              </option>
              <option value="7">
                &nbsp;&nbsp;&nbsp;&nbsp;Minor Violation
              </option>
              <option value="" disabled="">
                &nbsp;Bear Forecast
              </option>
              <option value="8">
                &nbsp;&nbsp;&nbsp;&nbsp;Gap
              </option>
              <option value="9">
                &nbsp;&nbsp;&nbsp;&nbsp;PB
              </option>
              <option value="10">
                &nbsp;&nbsp;&nbsp;&nbsp;Violation
              </option>
              <option value="11">
                &nbsp;&nbsp;&nbsp;&nbsp;Real
              </option>
              <option value="12">
                &nbsp;&nbsp;&nbsp;&nbsp;PB, Broke, Real
              </option>
              <option value="13">
                &nbsp;&nbsp;&nbsp;&nbsp;PB and Broke
              </option>
              <option value="14">
                &nbsp;&nbsp;&nbsp;&nbsp;Minor Violation
              </option>
              <option value="" disabled="">
                &nbsp;PB Bar
              </option>
              <option value="15">
                &nbsp;&nbsp;&nbsp;&nbsp;All
              </option>
              <option value="16">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option value="17">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
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
          if (form[key] instanceof Array) {
            if (JSON.stringify(form[key]) != JSON.stringify(blank[key])) {
              equal = false
            }
          } else if (form[key] != blank[key]) {
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
    formChanges (timeframe) {
      if (this.changed.includes(timeframe)) {
        const form = JSON.parse(JSON.stringify(this.forms[timeframe]))
        const blank = this.getEmptyForm(timeframe)

        let equal = true
        Object.keys(blank).forEach(function (key) {
          /* eslint eqeqeq: "off" */
          if (form[key] instanceof Array) {
            if (JSON.stringify(form[key]) != JSON.stringify(blank[key])) {
              equal = false
            }
          } else if (form[key] != blank[key]) {
            equal = false
          }
        })
        if (equal === true) {
          const idx = this.changed.indexOf(timeframe)
          this.changed.splice(idx, 1)
        }
      } else {
        this.changed.push(timeframe)
      }

      this.emitForm()
    },
    profileOpenButton () {
      const fileInput = document.getElementById('fileInput')
      const customButton = document.getElementById('profileButton')

      customButton.addEventListener('click', () => {
        fileInput.click()
      })
    },
    profileOpen () {
      const fileInput = document.getElementById('fileInput')
      fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0]

        const reader = new FileReader()

        reader.onload = (event) => {
          try {
            const filters = JSON.parse(event.target.result)
            console.log(filters)
            Object.entries(filters).forEach(([key, value]) => {
              const input = JSON.stringify(key)
              this.forms[key] = value
              console.log(key)
              this.formChanges(input)
            })
            this.emitForm()
          } catch (error) {
            console.error('Error parsing JSON:', error)
          }
        }
        reader.readAsText(file)
        fileInput.value = null
      })
    },
    createProfileOpen () {
      const textInput = document.getElementById('textInput')
      const customButton = document.getElementById('createProfileButton')

      customButton.addEventListener('click', () => {
        textInput.click()
      }, { once: true })
    },
    createProfile () {
      const textInput = document.getElementById('textInput')
      textInput.addEventListener('change', () => {
        const filters = JSON.stringify(this.forms)
        if (textInput.value != null) {
          const file = new File([filters], textInput.value + '.json', { type: 'text/plain:charset=UTF-8' })

          //  create a ObjectURL in order to download the created file
          const url = window.URL.createObjectURL(file)

          //  create a hidden link and set the href and click it
          const a = document.createElement('a')
          a.style = 'display: none'
          a.href = url
          a.download = file.name
          a.click()
          window.URL.revokeObjectURL(url)
        }
      }, { once: true })
      textInput.addEventListener('mouseover', () => {
        textInput.removeEventListener('click', textInput)
      }, { once: true })
    },
    reset () {
      this.forms[10] = this.getEmptyForm(10)
      this.forms[30] = this.getEmptyForm(30)
      this.forms[60] = this.getEmptyForm(60)
      this.forms[120] = this.getEmptyForm(120)
      this.forms[240] = this.getEmptyForm(240)
      this.forms.D = this.getEmptyForm('D')
      this.forms.W = this.getEmptyForm('W')
      this.forms.M = this.getEmptyForm('M')
      this.changed.splice(0, 8)
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
        overextension: 0,
        forecast: 0,
        forecastadv: 0,
        shortcut: 0,
        bar: 0,
        vbar: 0,
        vtnt: 0,
        ct: 0,
        vopt: ['']
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
