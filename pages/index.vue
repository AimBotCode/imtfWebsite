<template>
  <div class="container-md">
    <div class="row vh-100 d-flex justify-content-center">
      <div class="col-12 align-self-center">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-4 mx-auto">
              <div class="card">
                <div class="card-body p-0">
                  <div class="text-center p-3">
                    <a href="index.html" class="logo logo-admin">
                      <img src="~/assets/images/imtflogo.png" height="50" alt="logo" class="auth-logo">
                    </a>
                    <h4 class="mt-3 mb-1 fw-semibold font-18">
                      IMTF Scanner & Seasonality
                    </h4>
                    <p class="text-muted  mb-0">
                      Sign in to continue.
                    </p>
                  </div>
                </div>
                <hr class="hr-dashed">
                <div class="card-body pt-0">
                  <div v-if="show.error" class="alert alert-danger border-0 mt-3" role="alert">
                    <strong>*</strong> Invalid credentials.
                  </div>
                  <form class="mb-4" action="index.html">
                    <div class="form-group mb-2">
                      <label class="form-label" for="username">Username</label>
                      <input
                        id="username"
                        v-model="form.username"
                        type="text"
                        class="form-control"
                        name="username"
                        placeholder="Enter username"
                      >
                    </div><!--end form-group-->

                    <div class="form-group">
                      <label class="form-label" for="userpassword">Password</label>
                      <input
                        id="userpassword"
                        v-model="form.password"
                        type="password"
                        class="form-control"
                        name="password"
                        placeholder="Enter password"
                      >
                    </div><!--end form-group-->

                    <div class="form-group row mt-3">
                      <div class="col-sm-6">
                        <div class="form-check form-switch form-switch-success">
                          <input id="customSwitchSuccess" class="form-check-input" type="checkbox">
                          <label class="form-check-label" for="customSwitchSuccess">Remember me</label>
                        </div>
                      </div><!--end col-->
                      <div class="col-sm-6 text-end">
                        <a href="https://www.imtftrade.com/login/" class="text-muted font-13" target="_blank"><i class="dripicons-lock" /> Forgot password?</a>
                      </div><!--end col-->
                    </div><!--end form-group-->

                    <div class="form-group mb-0 row">
                      <div class="col-12">
                        <div class="d-grid mt-3">
                          <button class="btn btn-primary" type="button" @click="tryLogin">
                            Log In <i class="fas fa-sign-in-alt ms-1" />
                          </button>
                        </div>
                      </div><!--end col-->
                    </div> <!--end form-group-->
                  </form><!--end form-->
                  <div class="m-3 text-center text-muted">
                    <p class="mb-0">
                      Don't have an account ?  <a href="https://www.imtftrade.com/register/" target="_blank" class="text-primary ms-2">Free Register</a>
                    </p>
                  </div>
                  <!-- <hr class="hr-dashed mt-4">
                  <div class="text-center mt-n5">
                    <h6 class="card-bg px-3 my-4 d-inline-block">
                      Or Login With
                    </h6>
                  </div>
                  <div class="d-flex justify-content-center mb-1">
                    <a href="" class="d-flex justify-content-center align-items-center thumb-sm bg-soft-primary rounded-circle me-2">
                      <i class="lab la-facebook align-self-center" />
                    </a>
                    <a href="" class="d-flex justify-content-center align-items-center thumb-sm bg-soft-info rounded-circle me-2">
                      <i class="lab la-twitter align-self-center" />
                    </a>
                    <a href="" class="d-flex justify-content-center align-items-center thumb-sm bg-soft-danger rounded-circle">
                      <i class="lab la-google align-self-center" />
                    </a>
                  </div> -->
                </div><!--end card-body-->
              </div><!--end card-->
            </div><!--end col-->
          </div><!--end row-->
        </div><!--end card-body-->
      </div><!--end col-->
    </div><!--end row-->
    <Footer />
  </div><!--end container-->
</template>

<script>
import Vue from 'vue'
import VueCookies from 'vue-cookies'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      show: { error: false }
    }
  },
  mounted () {
    console.log(this.$store.state.app.loggedIn)
    if (this.$store.state.app.loggedIn === true) {
      this.$router.push({ name: 'scanner' })
    }
  },
  methods: {
    tryLogin () {
      this.$store.commit('app/showLottie')
      this.$xhr.wordpress.post('https://www.imtftrade.com/index.php/wp-json/custom-plugin/login', this.form).then((resp) => {
        if (resp.ID) {
          Vue.use(VueCookies, { expires: '1d' })
          this.$cookies.set('imtftkn', 'Pxw5JSEDu7KVgT2', {
            path: '/',
            maxAge: 60 * 60 * 24,
            httpOnly: false,
            sameSite: true,
            secure: process.env.NODE_ENV !== 'development'
          })
          this.$store.commit('app/user', resp)

          this.checkSubscriptions(resp.data)
        } else {
          this.show.error = true
        }
        this.$store.commit('app/hideLottie')

        // get subscriptions // autoforex@yahoo.com // resp.data.user_email // tradingathlete@gmail.com
        // this.$imtf.subscriberFlow('tradingathlete@gmail.com')
      })
    },
    checkSubscriptions (user) {
      const email = user.user_email
      // email = 'eiicapital@gmail.com'
      this.$imtf.subscriberFlow(email).then((active) => {
        console.log(active)
        if (active) {
          this.$store.commit('app/setActive', true)
        }
        this.$router.push({ name: 'scanner' })
      })
    }
  }
}
</script>
