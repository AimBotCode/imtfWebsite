<template>
  <!-- Top Bar Start -->
  <div class="topbar">
    <!-- LOGO -->
    <div class="brand">
      <NuxtLink to="/scanner" class="logo">
        <span>
          <img
            src="~/assets/images/imtflogo.png"
            alt="logo-small"
            class="logo-sm"
          >
        </span>
        <span>
          <img
            src="~/assets/images/imtflogo.png"
            alt="logo-large"
            class="logo-lg logo-light"
          >
          <img
            src="~/assets/images/imtflogo-dark.png"
            alt="logo-large"
            class="logo-lg logo-dark"
          >
        </span>
      </NuxtLink>
    </div>
    <!--end logo-->
    <!-- Navbar -->
    <nav class="navbar-custom">
      <ul class="list-unstyled topbar-nav float-end mb-0">
        <li class="dropdown">
          <a
            class="nav-link dropdown-toggle nav-user"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="false"
            aria-expanded="false"
            @click="show.usermenu = !show.usermenu"
          >
            <div class="d-flex align-items-center">
              <img
                src="assets/images/users/user-4.jpg"
                alt=""
                class="rounded-circle me-0 me-md-2 thumb-xs"
              >
              <div class="user-name">
                <small class="d-none d-lg-block font-11">Welcome</small>
                <span
                  class="d-none d-lg-block fw-semibold font-12"
                >{{ $store.state.app.user.display_name }}
                  <i
                    class="mdi mdi-chevron-down"
                  /></span>
              </div>
            </div>
          </a>
          <div
            v-if="show.usermenu"
            class="dropdown-menu dropdown-menu-end"
            style="display: block"
          >
            <!-- <a class="dropdown-item" href="#"><i class="ti ti-user font-16 me-1 align-text-bottom" />
              Profile</a>
            <div class="dropdown-divider mb-0" /> -->
            <a
              class="dropdown-item"
              href="#"
              @click="logout"
            ><i class="ti ti-power font-16 me-1 align-text-bottom" />
              Logout</a>
          </div>
        </li>
        <li>
          <div>
            <span v-if="$store.state.app.active" class="badge bg-success">PRO</span>
            <a v-if="!$store.state.app.active" href="https://qr220.infusionsoft.com/app/orderForms/RT-Scanner-Level-3" target="_blank" class="btn btn-xl btn-primary my-3">Free</a>
          </div>
        </li>
      </ul>
      <!--end topbar-nav-->

      <div class="navbar-custom-menu">
        <div id="navigation" style="display:block">
          <!-- Navigation Menu-->
          <ul class="navigation-menu">
            <li class="nav-item parent-menu-item">
              <NuxtLink id="navbarDashboards" class="nav-link" to="/scanner">
                <span><i class="las la-search-dollar menu-icon" />Scanner</span>
              </NuxtLink>
            </li>
            <!--end nav-item-->

            <li class="nav-item parent-menu-item">
              <NuxtLink id="navbarMarket" class="nav-link" to="/seasonality">
                <span><i
                  class="ti ti-chart-arrows-vertical menu-icon"
                />Seasonality</span>
              </NuxtLink>
            </li>

            <!-- <li class="nav-item  parent-menu-item">
              <NuxtLink id="navbarMarket" class="nav-link" to="/heatmaps">
                <span><i class="las la-fire-alt menu-icon" />Heatmaps</span>
              </NuxtLink>
            </li> -->
            <!--end nav-item-->

            <!-- <li class="nav-item  parent-menu-item">
              <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" @click="show.seasonalityMenu=true">
                Primary <i class="las la-angle-down" />
              </button>
              <div v-if="show.seasonalityMenu" class="dropdown-menu" style="display:block">
                <a class="dropdown-item" href="#">Stock Search</a>
                <a class="dropdown-item" href="#">Best Trades</a>
                <div class="dropdown-divider" />
                <a class="dropdown-item" href="#">Scanner</a>
                <a class="dropdown-item" href="#">Pattern</a>
                <a class="dropdown-item" href="#">Calendar</a>
              </div>
            </li> -->

            <!--end nav-item-->
          </ul>
          <!-- End navigation menu -->
        </div>
        <!-- end navigation -->
      </div>
      <!-- Navbar -->
    </nav>
    <!-- end navbar-->
  </div>
  <!-- Top Bar End -->
</template>

<script>
export default {
  data () {
    return {
      subscriptions: [],
      show: { seasonalityMenu: false, usermenu: false, subscriptions: false, mobileMenu: false }
    }
  },
  mounted () {
    this.$store.commit('app/restoreState')
  },
  methods: {
    logout () {
      // this.$cookies.removeAll({ path: '/' })
      this.$cookies.remove('imtftkn')
      this.$store.commit('app/user', {})
      this.$store.commit('app/setActive', false)
      this.$router.push({ name: 'login' })
    },
    toggleMenu () {
      this.show.mobileMenu = !this.show.mobileMenu
    }
  }
}
</script>
