<template>
  <div>
    <form class="">
      <div class="">
        <div class="toolbar row align-items-end pb-3 border-bottom">
          <div class="col-lg-4 col-md-4 col-sm-12 col-12 sm-mb-3" />
          <div class="col-lg-4 col-md-4 col-sm-12 col-12 sm-mb-3">
            <div class="lable">
              Timeframe
            </div>
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
            <button v-if="isAdmin()" type="button" :class="getClass('W3')" @click="setTimeframe('W3')">
              3W
            </button>
            <button type="button" :class="getClass('M')" @click="setTimeframe('M')">
              M
            </button>
            <button v-if="isAdmin()" type="button" :class="getClass('Q')" @click="setTimeframe('Q')">
              Q
            </button>
          </div>
        </div>
        <div class="toolbar row align-items-end border-bottom pb-3 mb-2">
        <div class="col-md-6">
          <div class="lable">
            Profiles
          </div>
          <select v-model="profile" class="form-select" @change="profileChanged">
            <option selected="" value="default">default</option>
            <option v-for="(r, i) in this.profiles" :key="i" :value="r.name">
              {{ r.name }}
            </option>
          </select>
        </div>
        <div class="col-md-6 mb-1">
          <button type="button" class="btn btn-sm btn-outline-dark" @click="updateProfile()">
            Update
          </button>
          <button type="button" class="btn btn-sm btn-outline-dark" @click="deleteProfile()">
            Delete
          </button>
          <button type="button" class="btn btn-sm btn-outline-dark" @click="createProfile()">
            Create
          </button>
          <input v-model="profileName" />
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
              <option v-if="isSubscribed" value="" disabled="">
                &nbsp;vIMTF Yellow Setup
              </option>
              <option v-if="isSubscribed" value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;vBull
              </option>
              <option v-if="isSubscribed" value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;vBear
              </option>
              <option v-if="isSubscribed" value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;vBull or vBear
              </option>
              <option v-if="isSubscribed" value="" disabled="">
                &nbsp;vIMTF Yellow Trend
              </option>
              <option v-if="isSubscribed" value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;vBull
              </option>
              <option v-if="isSubscribed" value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;vBear
              </option>
              <option v-if="isSubscribed" value="6">
                &nbsp;&nbsp;&nbsp;&nbsp;vBull or vBear
              </option>
              <option v-if="isSubscribed" value="" disabled="">
                &nbsp;vIMTF Purple Setup
              </option>
              <option v-if="isSubscribed" value="7">
                &nbsp;&nbsp;&nbsp;&nbsp;vBull
              </option>
              <option v-if="isSubscribed" value="8">
                &nbsp;&nbsp;&nbsp;&nbsp;vBear
              </option>
              <option v-if="isSubscribed" value="9">
                &nbsp;&nbsp;&nbsp;&nbsp;vBull or vBear
              </option>
              <option v-if="isSubscribed" value="" disabled="">
                &nbsp;vIMTF Purple Trend
              </option>
              <option v-if="isSubscribed" value="10">
                &nbsp;&nbsp;&nbsp;&nbsp;vBull
              </option>
              <option v-if="isSubscribed" value="11">
                &nbsp;&nbsp;&nbsp;&nbsp;vBear
              </option>
              <option v-if="isSubscribed" value="12">
                &nbsp;&nbsp;&nbsp;&nbsp;vBull or vBear
              </option>
              <option v-if="isSubscribed" value="" disabled="">
                &nbsp;cIMTF Test and Break
              </option>
              <option v-if="isSubscribed" value="13">
                &nbsp;&nbsp;&nbsp;&nbsp;cBull
              </option>
              <option v-if="isSubscribed" value="14">
                &nbsp;&nbsp;&nbsp;&nbsp;cBear
              </option>
              <option v-if="isSubscribed" value="15">
                &nbsp;&nbsp;&nbsp;&nbsp;cBoth
              </option>
              <option v-if="isSubscribed" value="" disabled="">
                &nbsp;cIMTF Test, Break and pb
              </option>
              <option v-if="isSubscribed" value="16">
                &nbsp;&nbsp;&nbsp;&nbsp;cBull
              </option>
              <option v-if="isSubscribed" value="17">
                &nbsp;&nbsp;&nbsp;&nbsp;cBear
              </option>
              <option v-if="isSubscribed" value="18">
                &nbsp;&nbsp;&nbsp;&nbsp;cBoth
              </option>
              <option v-if="isSubscribed" value="" disabled="">
                &nbsp;cIMTF Break and Pull Back
              </option>
              <option v-if="isSubscribed" value="19">
                &nbsp;&nbsp;&nbsp;&nbsp;cBull
              </option>
              <option v-if="isSubscribed" value="20">
                &nbsp;&nbsp;&nbsp;&nbsp;cBear
              </option>
              <option v-if="isSubscribed" value="21">
                &nbsp;&nbsp;&nbsp;&nbsp;cBoth
              </option>
              <option v-if="isSubscribed" value="" disabled="">
                &nbsp;cIMTF Break and No Pull Back
              </option>
              <option v-if="isSubscribed" value="22">
                &nbsp;&nbsp;&nbsp;&nbsp;cBull
              </option>
              <option v-if="isSubscribed" value="23">
                &nbsp;&nbsp;&nbsp;&nbsp;cBear
              </option>
              <option v-if="isSubscribed" value="24">
                &nbsp;&nbsp;&nbsp;&nbsp;cBoth
              </option>
              <option v-if="isSubscribed" value="" disabled="">
                &nbsp;iMTF Setup
              </option>
              <option v-if="isSubscribed" value="25">
                &nbsp;&nbsp;&nbsp;&nbsp;Green Shade
              </option>
              <option v-if="isSubscribed" value="26">
                &nbsp;&nbsp;&nbsp;&nbsp;Red Shade
              </option>
              <option v-if="isSubscribed" value="27">
                &nbsp;&nbsp;&nbsp;&nbsp;Any Shade
              </option>
              <option v-if="isSubscribed" value="" disabled="">
                &nbsp;iMTF Trend
              </option>
              <option v-if="isSubscribed" value="28">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option v-if="isSubscribed" value="29">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option v-if="isSubscribed" value="30">
                &nbsp;&nbsp;&nbsp;&nbsp;Both
              </option>
              <option v-if="isSubscribed" value="" disabled="">
                &nbsp;iMTF Trend Cont.
              </option>
              <option v-if="isSubscribed" value="31">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull
              </option>
              <option v-if="isSubscribed" value="32">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear
              </option>
              <option v-if="isSubscribed" value="33">
                &nbsp;&nbsp;&nbsp;&nbsp;Both
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
                Neutral New
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
          <div v-if="isSubscribed" class="mb-3 row">
            <div class="col">
              <label for="subject">iState</label>
              <select v-model="forms[timeframe].istatefrom" class="form-select" @change="formChanged">
                <option v-for="(n, i) in 51" :key="i" :value="n - 1">
                  {{ n - 1 }}
                </option>
              </select>
            </div>
            <div class="col">
              <label for="subject" />
              <select v-model="forms[timeframe].istateto" class="form-select" @change="formChanged">
                <option v-for="(n, i) in 51" :key="i" :value="n - 1">
                  {{ n - 1 }}
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
                &nbsp;&nbsp;&nbsp;&nbsp;Bull Black
              </option>
              <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear Black
              </option>
              <option value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull HPB Gray
              </option>
              <option value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear HPB Gray
              </option>
              <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull Gray
              </option>
              <option value="6">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear Gray
              </option>
              <option value="7">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull Dot
              </option>
              <option value="8">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear Dot
              </option>
              <option value="" disabled="">
                &nbsp;iMTFA
              </option>
              <option value="9">
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
              </option>
              <option value="" disabled="">
                &nbsp;Price
              </option>
              <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;Above All
              </option>
              <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;Bellow All
              </option>
              <option value="" disabled="">
                Touch
              </option>
              <option value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;Touch Top
              </option>
              <option value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;Touch Bottom
              </option>
              <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;Any
              </option>
              <option value="6">
                &nbsp;&nbsp;&nbsp;&nbsp;Bull Zone
              </option>
              <option value="7">
                &nbsp;&nbsp;&nbsp;&nbsp;Bear Zone
              </option>
              <option value="" disabled="">
                Bracket Move
              </option>
              <option value="8">
                &nbsp;&nbsp;&nbsp;&nbsp;Bar 1
              </option>
              <option value="9">
                &nbsp;&nbsp;&nbsp;&nbsp;Bar 2-5
              </option>
              <option value="10">
                &nbsp;&nbsp;&nbsp;&nbsp;Bar 6-10
              </option>
              <option value="11">
                &nbsp;&nbsp;&nbsp;&nbsp;All
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
              </option>
              <option value="1">
                &nbsp;&nbsp;Bull Shade
              </option>
              <option value="2">
                &nbsp;&nbsp;Bear Shade
              </option>
              <option disabled="">
                vTrend
              </option>
              <option value="3">
                &nbsp;&nbsp;Bull
              </option>
              <option value="4">
                &nbsp;&nbsp;Bear
              </option>
              <option value="5">
                &nbsp;&nbsp;UpFlip
              </option>
              <option value="6">
                &nbsp;&nbsp;DnFlip
              </option>
              <option value="7">
                &nbsp;&nbsp;UpRealFlip
              </option>
              <option value="8">
                &nbsp;&nbsp;DnRealFlip
              </option>
              <option disabled="">
                Arrow
              </option>
              <option value="9">
                &nbsp;&nbsp;Bull
              </option>
              <option value="10">
                &nbsp;&nbsp;Bear
              </option>
              <option value="11">
                &nbsp;&nbsp;pBull
              </option>
              <option value="12">
                &nbsp;&nbsp;pBear
              </option>
              <option disabled="">
                Touch
              </option>
              <option value="13">
                &nbsp;&nbsp;T1
              </option>
              <option disabled="">
                Ideal PB
              </option>
              <option value="26">
                &nbsp;&nbsp;TS
              </option>
              <option value="27">
                &nbsp;&nbsp;KS
              </option>
              <option value="28">
                &nbsp;&nbsp;SKB
              </option>
              <option disabled="">
                Closed Bar Ideal PB
              </option>
              <option value="29">
                &nbsp;&nbsp;TS
              </option>
              <option value="30">
                &nbsp;&nbsp;KS
              </option>
              <option value="31">
                &nbsp;&nbsp;ALL
              </option>
              <option disabled="">
                C Div
              </option>
              <option value="32">
                &nbsp;&nbsp;Bull
              </option>
              <option value="33">
                &nbsp;&nbsp;Bear
              </option>
              <option value="34">
                &nbsp;&nbsp;pBull
              </option>
              <option value="35">
                &nbsp;&nbsp;pBear
              </option>
              <option disabled="">
                Bleep
              </option>
              <option value="36">
                &nbsp;&nbsp;Bull
              </option>
              <option value="37">
                &nbsp;&nbsp;Bear
              </option>
              <option value="38">
                &nbsp;&nbsp;all
              </option>
              <!-- <option disabled="">
                Volatility
              </option>
              <option value="39">
                &nbsp;&nbsp;Bull
              </option>
              <option value="40">
                &nbsp;&nbsp;Bear
              </option>
              <option value="41">
                &nbsp;&nbsp;pBull
              </option>
              <option value="42">
                &nbsp;&nbsp;pBear
              </option> -->
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
                &nbsp;Past advForecast
              </option>
              <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;UpBO
              </option>
              <option value="2">
                &nbsp;&nbsp;&nbsp;&nbsp;UpPB
              </option>
              <option value="3">
                &nbsp;&nbsp;&nbsp;&nbsp;DnBO
              </option>
              <option value="4">
                &nbsp;&nbsp;&nbsp;&nbsp;DnBO
              </option>
              <option value="" disabled="">
                &nbsp;Current advForecast
              </option>
              <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;UpPB
              </option>
              <option value="6">
                &nbsp;&nbsp;&nbsp;&nbsp;UpBO
              </option>
              <option value="7">
                &nbsp;&nbsp;&nbsp;&nbsp;DnPB
              </option>
              <option value="8">
                &nbsp;&nbsp;&nbsp;&nbsp;DnPB
              </option>
            </select>
          </div>
        </div>
      </div>
    </form>

    <!-- Profile Modal -->
    <ModalsProfile v-if="showProfileModal" :mode="modalMode" :title="modalTitle" :filters="forms"
      :enable-download="enableDownload" @close="showProfileModal = false" @saved="onProfileSaved"
      @loaded="onProfileLoaded" />

    <!-- Update Profile Modal -->
    <ModalsUpdateProfile v-if="showUpdateModal" :current-filters="forms" @close="showUpdateModal = false"
      @updated="onProfileUpdated" />
  </div>
</template>

<script>
export default {
  emits: ['change'],
  props: {
    profiles: {},
    currentProfile: {
      type: String
    }
  },
  data() {
    return {
      file: '',
      lastCreatedProfile: '', // Track the most recently created profile
      forms: {
        10: this.getEmptyForm(10),
        30: this.getEmptyForm(30),
        60: this.getEmptyForm(60),
        120: this.getEmptyForm(120),
        240: this.getEmptyForm(240),
        D: this.getEmptyForm('D'),
        W: this.getEmptyForm('W'),
        W3: this.getEmptyForm('3W'),
        M: this.getEmptyForm('M'),
        Q: this.getEmptyForm('Q')
      },
      profileName: '',
      profile: 'default',
      timeframe: 'D',
      changed: [],
      showProfileModal: false,
      showUpdateModal: false,
      modalMode: '',
      modalTitle: ''
    }
  },
  computed: {
    isSubscribed() {
      if (this.$config.env === 'development') { return true }
      const roles = this.$store.getters['app/getItem']('roles')
      if (roles.includes('memberium_memberships-rtscannerleveliii')) {
        return true
      }

      return this.$store.getters['app/getItem']('active')
    }
  },
  mounted() {
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
    onProfileSaved(profileName) {
      this.lastCreatedProfile = profileName // Store the name of the created profile
      this.showProfileModal = false
    },
    onProfileLoaded(loadedFilters) {
      this.forms = loadedFilters
      this.emitForm() // emit changes
      this.showProfileModal = false
    },

    onProfileUpdated() {
      this.showUpdateModal = false
    },
    emitForm() {
      this.$emit('change', this.forms)
    },
    formChanged() {
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
    profileChanged() {
      if (this.profile != 'default') {
        const profiles = JSON.parse(JSON.stringify(this.profiles))
        profiles.forEach(profile => {
          console.log(profile)
          if (profile.name = this.profile) {
            this.formUpdate(profile)
            return
          }
        })
      } else {
        this.reset()
      }
    },
    formUpdate(profile) {
      this.changed.splice(0, 10)
      this.profile10(profile)
      this.profile30(profile)
      this.profile60(profile)
      this.profile120(profile)
      this.profile240(profile)
      this.profileD(profile)
      this.profileW(profile)
      this.profile3W(profile)
      this.profileM(profile)
      this.profileQ(profile)
      this.$emit('changeProfile', this.profile)
    },
    profile10(profile) {
      this.forms[10].strategy = profile.strategy_10
      this.forms[10].priceimtf = profile.priceImtf_10
      this.forms[10].istatefrom = profile.iStateFrom_10
      this.forms[10].istateto = profile.iStateTo_10
      this.forms[10].momentum = profile.momentum_10
      this.forms[10].optimize = profile.optimize_10
      this.forms[10].overextension = profile.overExtension_10
      this.forms[10].forecast = profile.forecast_10
      this.forms[10].forecastadv = profile.advForecast_10
      this.forms[10].shortcut = profile.shortcut_10
      this.forms[10].bar = profile.bar_10
      this.forms[10].vbar = profile.vBar_10
      this.forms[10].vtnt = profile.vTnt_10
      this.forms[10].ct = profile.ct_10
      if (profile.vOpt_10 instanceof String && profile.vOpt_10 !== '') {
        this.forms[10].vopt = profile.vOpt_10.split(',')
      }
    },
    profile30(profile) {
      this.forms[30].strategy = profile.strategy_30
      this.forms[30].priceimtf = profile.priceImtf_30
      this.forms[30].istatefrom = profile.iStateFrom_30
      this.forms[30].istateto = profile.iStateTo_30
      this.forms[30].momentum = profile.momentum_30
      this.forms[30].optimize = profile.optimize_30
      this.forms[30].overextension = profile.overExtension_30
      this.forms[30].forecast = profile.forecast_30
      this.forms[30].forecastadv = profile.advForecast_30
      this.forms[30].shortcut = profile.shortcut_30
      this.forms[30].bar = profile.bar_30
      this.forms[30].vbar = profile.vBar_30
      this.forms[30].vtnt = profile.vTnt_30
      this.forms[30].ct = profile.ct_30
      if (profile.vOpt_30 instanceof String && profile.vOpt_30 !== '') {
        this.forms[30].vopt = profile.vOpt_30.split(',')
      }
    },
    profile60(profile) {
      this.forms[60].strategy = profile.strategy_60
      this.forms[60].priceimtf = profile.priceImtf_60
      this.forms[60].istatefrom = profile.iStateFrom_60
      this.forms[60].istateto = profile.iStateTo_60
      this.forms[60].momentum = profile.momentum_60
      this.forms[60].optimize = profile.optimize_60
      this.forms[60].overextension = profile.overExtension_60
      this.forms[60].forecast = profile.forecast_60
      this.forms[60].forecastadv = profile.advForecast_60
      this.forms[60].shortcut = profile.shortcut_60
      this.forms[60].bar = profile.bar_60
      this.forms[60].vbar = profile.vBar_60
      this.forms[60].vtnt = profile.vTnt_60
      this.forms[60].ct = profile.ct_60
      if (profile.vOpt_60 instanceof String && profile.vOpt_60 !== '') {
        this.forms[30].vopt = profile.vOpt_60.split(',')
      }
    },
    profile120(profile) {
      this.forms[120].strategy = profile.strategy_120
      this.forms[120].priceimtf = profile.priceImtf_120
      this.forms[120].istatefrom = profile.iStateFrom_120
      this.forms[120].istateto = profile.iStateTo_120
      this.forms[120].momentum = profile.momentum_120
      this.forms[120].optimize = profile.optimize_120
      this.forms[120].overextension = profile.overExtension_120
      this.forms[120].forecast = profile.forecast_120
      this.forms[120].forecastadv = profile.advForecast_120
      this.forms[120].shortcut = profile.shortcut_120
      this.forms[120].bar = profile.bar_120
      this.forms[120].vbar = profile.vBar_120
      this.forms[120].vtnt = profile.vTnt_120
      this.forms[120].ct = profile.ct_120
      if (profile.vOpt_120 instanceof String && profile.vOpt_120 !== '') {
        this.forms[120].vopt = profile.vOpt_120.split(',')
      }
    },
    profile240(profile) {
      this.forms[240].strategy = profile.strategy_240
      this.forms[240].priceimtf = profile.priceImtf_240
      this.forms[240].istatefrom = profile.iStateFrom_240
      this.forms[240].istateto = profile.iStateTo_240
      this.forms[240].momentum = profile.momentum_240
      this.forms[240].optimize = profile.optimize_240
      this.forms[240].overextension = profile.overExtension_240
      this.forms[240].forecast = profile.forecast_240
      this.forms[240].forecastadv = profile.advForecast_240
      this.forms[240].shortcut = profile.shortcut_240
      this.forms[240].bar = profile.bar_240
      this.forms[240].vbar = profile.vBar_240
      this.forms[240].vtnt = profile.vTnt_240
      this.forms[240].ct = profile.ct_240
      if (profile.vOpt_240 instanceof String && profile.vOpt_240 !== '') {
        this.forms[240].vopt = profile.vOpt_240.split(',')
      }
    },
    profileD(profile) {
      this.forms.D.strategy = profile.strategy_D
      this.forms.D.priceimtf = profile.priceImtf_D
      this.forms.D.istatefrom = profile.iStateFrom_D
      this.forms.D.istateto = profile.iStateTo_D
      this.forms.D.momentum = profile.momentum_D
      this.forms.D.optimize = profile.optimize_D
      this.forms.D.overextension = profile.overExtension_D
      this.forms.D.forecast = profile.forecast_D
      this.forms.D.forecastadv = profile.advForecast_D
      this.forms.D.shortcut = profile.shortcut_D
      this.forms.D.bar = profile.bar_D
      this.forms.D.vbar = profile.vBar_D
      this.forms.D.vtnt = profile.vTnt_D
      this.forms.D.ct = profile.ct_D
      if (profile.vOpt_D instanceof String && profile.vOpt_D !== '') {
        this.forms.D.vopt = profile.vOpt_D.split(',')
      }
    },
    profileW(profile) {
      this.forms.W.strategy = profile.strategy_W
      this.forms.W.priceimtf = profile.priceImtf_W
      this.forms.W.istatefrom = profile.iStateFrom_W
      this.forms.W.istateto = profile.iStateTo_W
      this.forms.W.momentum = profile.momentum_W
      this.forms.W.optimize = profile.optimize_W
      this.forms.W.overextension = profile.overExtension_W
      this.forms.W.forecast = profile.forecast_W
      this.forms.W.forecastadv = profile.advForecast_W
      this.forms.W.shortcut = profile.shortcut_W
      this.forms.W.bar = profile.bar_W
      this.forms.W.vbar = profile.vBar_W
      this.forms.W.vtnt = profile.vTnt_W
      this.forms.W.ct = profile.ct_W
      if (profile.vOpt_W instanceof String && profile.vOpt_W !== '') {
        this.forms.W.vopt = profile.vOpt_W.split(',')
      }
    },
    profile3W(profile) {
      this.forms.W3.strategy = profile.strategy_3W
      this.forms.W3.priceimtf = profile.priceImtf_3W
      this.forms.W3.istatefrom = profile.iStateFrom_3W
      this.forms.W3.istateto = profile.iStateTo_3W
      this.forms.W3.momentum = profile.momentum_3W
      this.forms.W3.optimize = profile.optimize_3W
      this.forms.W3.overextension = profile.overExtension_3W
      this.forms.W3.forecast = profile.forecast_3W
      this.forms.W3.forecastadv = profile.advForecast_3W
      this.forms.W3.shortcut = profile.shortcut_3W
      this.forms.W3.bar = profile.bar_3W
      this.forms.W3.vbar = profile.vBar_3W
      this.forms.W3.vtnt = profile.vTnt_3W
      this.forms.W3.ct = profile.ct_3W
      if (profile.vOpt_3W instanceof String && profile.vOpt_3W !== '') {
        this.forms.W3.vopt = profile.vOpt_3W.split(',')
      }
    },
    profileM(profile) {
      this.forms.M.strategy = profile.strategy_M
      this.forms.M.priceimtf = profile.priceImtf_M
      this.forms.M.istatefrom = profile.iStateFrom_M
      this.forms.M.istateto = profile.iStateTo_M
      this.forms.M.momentum = profile.momentum_M
      this.forms.M.optimize = profile.optimize_M
      this.forms.M.overextension = profile.overExtension_M
      this.forms.M.forecast = profile.forecast_M
      this.forms.M.forecastadv = profile.advForecast_M
      this.forms.M.shortcut = profile.shortcut_M
      this.forms.M.bar = profile.bar_M
      this.forms.M.vbar = profile.vBar_M
      this.forms.M.vtnt = profile.vTnt_M
      this.forms.M.ct = profile.ct_M
      if (profile.vOpt_M instanceof String && profile.vOpt_M !== '') {
        this.forms.M.vopt = profile.vOpt_M.split(',')
      }
    },
    profileQ(profile) {
      this.forms.Q.strategy = profile.strategy_Q
      this.forms.Q.priceimtf = profile.priceImtf_Q
      this.forms.Q.istatefrom = profile.iStateFrom_Q
      this.forms.Q.istateto = profile.iStateTo_Q
      this.forms.Q.momentum = profile.momentum_Q
      this.forms.Q.optimize = profile.optimize_Q
      this.forms.Q.overextension = profile.overExtension_Q
      this.forms.Q.forecast = profile.forecast_Q
      this.forms.Q.forecastadv = profile.advForecast_Q
      this.forms.Q.shortcut = profile.shortcut_Q
      this.forms.Q.bar = profile.bar_Q
      this.forms.Q.vbar = profile.vBar_Q
      this.forms.Q.vtnt = profile.vTnt_Q
      this.forms.Q.ct = profile.ct_Q
      if (profile.vOpt_Q instanceof String && profile.vOpt_Q !== '') {
        this.forms.Q.vopt = profile.vOpt_Q.split(',')
      }
    },
    formChanges(timeframe) {
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
    updateProfile() {
      this.$emit('updateProfile')
    },
    deleteProfile() {
      this.$emit('deleteProfile')
    },
    createProfile() {
      this.$emit('createProfile', this.profileName)
    },
    reset() {
      this.forms[10] = this.getEmptyForm(10)
      this.forms[30] = this.getEmptyForm(30)
      this.forms[60] = this.getEmptyForm(60)
      this.forms[120] = this.getEmptyForm(120)
      this.forms[240] = this.getEmptyForm(240)
      this.forms.D = this.getEmptyForm('D')
      this.forms.W = this.getEmptyForm('W')
      this.forms.W3 = this.getEmptyForm('W3')
      this.forms.M = this.getEmptyForm('M')
      this.forms.Q = this.getEmptyForm('Q')
      this.changed.splice(0, 10)
      this.emitForm()
    },
    setTimeframe(t) {
      this.timeframe = t
      this.$emit('timeframe', this.timeframe)
      this.emitForm()
    },
    getEmptyForm(tf) {
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
    getClass(tf) {
      return {
        'btn btn-sm btn-outline-dark': true,
        active: tf === this.timeframe,
        'bg-info': this.changed.includes(tf)
      }
    },
    isAdmin() {
      const user = this.$store.getters['app/getItem']('user')
      if (['seasonaluser', 'eiicapital@gmail.com'].includes(user.user_login)) {
        return true
      }
      return false
    },
  }
}
</script>
