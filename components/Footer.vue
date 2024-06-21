<template>
  <footer class="footer text-center text-sm-start">
    &copy;  eiicapital
    <span class="text-muted d-none d-sm-inline-block float-end">info@eiicapital.com | +1 646-863-9620</span>

    <div v-if="$store.state.app.show.lottie" class="lottie">
      <div class="bg-white rounded">
        <Lottie
          :options="defaultOptions"
          :height="400"
          :width="400"
          @anim-created="handleAnimation"
        />
      </div>
    </div>
  </footer>
</template>

<script>
import * as animationData from '~/assets/lottie/graph.json'

export default {
  data () {
    return {
      defaultOptions: { animationData },
      animationSpeed: 1,
      show: { login: false, message: false }
    }
  },
  mounted () {
  },
  methods: {
    handleAnimation (anim) {
      this.anim = anim
    }
  }
}
</script>
