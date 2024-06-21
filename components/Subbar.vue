<template>
  <div class="national-data">
    <div class="container-fluid">
      <!-- Page-Title -->
      <div class="row">
        <div class="col-sm-12">
          <div
            class="page-title-box d-inline-block d-md-flex justify-content-start justify-content-md-between align-items-center"
          >
            <div class="my-3 my-md-0 ps-2">
              <h1>{{ title }}</h1>
            </div>
            <div class="">
              <ul v-if="submenu" class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <NuxtLink :class="'nav-link'+($route.name==='seasonality'?' active':'')" to="/seasonality" role="tab" aria-selected="true">
                    Main
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink :class="'nav-link'+($route.name==='seasonality-besttrades'?' active':'')" to="/seasonality/besttrades" role="tab" aria-selected="true">
                    Best Trades
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink :class="'nav-link'+($route.name==='seasonality-scanner'?' active':'')" to="/seasonality/scanner" role="tab" aria-selected="false">
                    Scanner
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink :class="'nav-link'+($route.name==='seasonality-pattern'?' active':'')" to="/seasonality/pattern" role="tab" aria-selected="false">
                    Pattern
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink :class="'nav-link'+($route.name==='seasonality-calendar'?' active':'')" to="/seasonality/calendar" role="tab" aria-selected="false">
                    Calendar
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
          <!--end page-title-box-->
        </div>
        <!--end col-->
      </div>
      <!-- end page title end breadcrumb -->
    </div>
    <!--end container-->
  </div>
  <!--end national-data-->
</template>

<script>
export default {
  props: {
    title: {
      default: '',
      type: String
    },
    submenu: {
      default: false,
      type: Boolean
    }
  }
}
</script>
