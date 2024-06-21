<template>
  <div class="lottie">
    <div id="modal" class="modal fade show" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header" />
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>

          <div class="modal-body">
            <slot name="body" />
          </div><!--end modal-body-->

          <div class="modal-footer">
            <slot name="footer" />
          </div>
        </div><!--end modal-content-->
      </div><!--end modal-dialog-->
    </div>
  </div>
</template>
