<template>
  <div>
    <div class="page-wrapper">
      <!-- Page Content-->
      <div class="page-content-tab">
        <div class="container-fluid">
          <!-- end page title end breadcrumb -->
          <div class="row">
            <div class="col-lg-12">
              <div class="d-flex flex-column justify-content-center align-items-center my-5">
                <div class="brand">
                  <NuxtLink to="/scanner" class="logo">
                    <span>
                      <img src="~/assets/images/imtflogo.png" alt="logo-small" class="logo-sm" style="max-height: 140px;">
                    </span>
                  </NuxtLink>
                </div>
                <h2>You don't have any active subscriptions.</h2>
                <span class="my-3">In order to subscribe use following link.</span>
                <div class="d-flex">
                  <a href="https://qr220.infusionsoft.com/app/orderForms/RT-Scanner-Level-3" target="_blank" class="btn btn-xl btn-primary my-3">Subscribe</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
