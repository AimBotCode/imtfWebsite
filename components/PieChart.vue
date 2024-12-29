<template>
  <div class="card">
    <div class="card-header">
      <div class="row align-items-center">
        <div class="col">
          <h4 class="card-title">
            {{ title }}
          </h4>
        </div>
        <!--end col-->
        <div class="col-auto" />
        <!--end col-->
      </div>
      <!--end row-->
    </div>
    <!--end card-header-->
    <div class="card-body">
      <div v-if="layout==='horizontal'" class="row">
        <div class="col-md-8">
          <div class="chart-wrapper">
            <doughnut-chart
              :chart-options="options"
              :chart-data="data"
              :height="200"
              :width="200"
              chart-id="pieChart1"
            />
            <div class="pieLabel">
              <span>Confidence  <span class="confnum">{{ results.Confidence }}%</span></span>
            </div>
          </div>
        </div>
        <!--end col-->
        <div class="col-md-4">
          <ul class="list-unstyled mb-0 resultlist">
            <li class="d-flex justify-content-between align-items-start">
              <div class="me-auto">
                <p class="mb-0 ">
                  <b>Average Move</b>
                </p>
              </div>
              <span :class="(results.Move>0?'bg-soft-success':'bg-soft-danger')+' px-1 rounded'">{{ results.Move }}</span>
            </li>
            <li class="d-flex justify-content-between align-items-start">
              <div class="me-auto">
                <p class="mb-0 ">
                  <b>Max. Drawdown</b>
                </p>
              </div>
              <span :class="(results.MaxDrawdown>0?'bg-soft-success':'bg-soft-danger')+' px-1 rounded'">{{ results.MaxDrawdown }}</span>
            </li>
            <li class="d-flex justify-content-between align-items-start">
              <div class="me-auto">
                <p class="mb-0 ">
                  <b>Max. Profit</b>
                </p>
              </div>
              <span :class="(results.MaxProfit>0?'bg-soft-success':'bg-soft-danger')+' px-1 rounded'">{{ results.MaxProfit }}</span>
            </li>
            <li class="d-flex justify-content-between align-items-start">
              <div class="me-auto">
                <p class="mb-0 ">
                  <b>Reward / Risk</b>
                </p>
              </div>
              <span :class="(results.Reward_Risk>0?'bg-soft-success':'bg-soft-danger')+' px-1 rounded'">{{ results.Reward_Risk }}</span>
            </li>
            <li class="d-flex justify-content-between align-items-start">
              <div class="me-auto">
                <p class="mb-0 ">
                  <b>SIV</b>
                </p>
              </div>
              <span :class="(results.SIV>0?'bg-soft-success':'bg-soft-danger')+' px-1 rounded'">{{ results.SIV }}</span>
            </li>
          </ul>
        </div>
        <!--end col-->
      </div>
      <div v-else>
        <div class="row">
          <div class="col">
            <div class="chart-wrapper">
              <doughnut-chart
                :chart-options="options"
                :chart-data="data"
                :height="250"
                :width="250"
                chart-id="pieChart1"
              />
              <div class="pieLabel">
                <span>Confidence  <span class="confnum">{{ results.Confidence }}%</span></span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col resultlist">
            <ul class="list-unstyled mb-0">
              <li class="d-flex justify-content-between align-items-start">
                <div class="me-auto">
                  <p class="mb-0 ">
                    <b>Average Move</b>
                  </p>
                </div>
                <span :class="(results.Move>0?'bg-soft-success':'bg-soft-danger')+' px-1 rounded'">{{ results.Move }}</span>
              </li>
              <li class="d-flex justify-content-between align-items-start">
                <div class="me-auto">
                  <p class="mb-0 ">
                    <b>Max. Drawdown</b>
                  </p>
                </div>
                <span :class="(results.MaxDrawdown>0?'bg-soft-success':'bg-soft-danger')+' px-1 rounded'">{{ results.MaxDrawdown }}</span>
              </li>
              <li class="d-flex justify-content-between align-items-start">
                <div class="me-auto">
                  <p class="mb-0 ">
                    <b>Max. Profit</b>
                  </p>
                </div>
                <span :class="(results.MaxProfit>0?'bg-soft-success':'bg-soft-danger')+' px-1 rounded'">{{ results.MaxProfit }}</span>
              </li>
              <li class="d-flex justify-content-between align-items-start">
                <div class="me-auto">
                  <p class="mb-0 ">
                    <b>Reward / Risk</b>
                  </p>
                </div>
                <span :class="(results.Reward_Risk>0?'bg-soft-success':'bg-soft-danger')+' px-1 rounded'">{{ results.Reward_Risk }}</span>
              </li>
              <li class="d-flex justify-content-between align-items-start">
                <div class="me-auto">
                  <p class="mb-0 ">
                    <b>SIV</b>
                  </p>
                </div>
                <span :class="(results.SIV>0?'bg-soft-success':'bg-soft-danger')+' px-1 rounded'">{{ results.SIV }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--end card-body-->
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    layout: {
      type: String,
      default: 'vertical'
    },
    data: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    },
    results: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
