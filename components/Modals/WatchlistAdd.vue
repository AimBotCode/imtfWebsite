<template>
  <div class="lottie">
    <div id="modal" class="modal fade show" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h6 id="exampleModalDefaultLabel" class="modal-title m-0">
              New Watchlist
            </h6>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close" />
          </div>

          <div class="modal-body">
            <div class="mb-3 row">
              <label for="example-text-input" class="col-sm-2 col-form-label text-end">Name</label>
              <div class="col-sm-10">
                <input id="example-text-input" v-model="name" class="form-control" type="text" placeholder="Watchlist name">
              </div>
            </div>
          </div><!--end modal-body-->

          <div class="modal-footer">
            <div class="d-flex justify-content-between w-100">
              <button type="button" class="btn btn-warning btn-sm" data-bs-dismiss="modal" @click="close">
                Close
              </button>
              <button type="button" class="btn btn-primary btn-sm" @click="save">
                Save changes
              </button>
            </div>
          </div>
        </div><!--end modal-content-->
      </div><!--end modal-dialog-->
    </div>
  </div>
</template>

<script>
export default {
  emits: ['save', 'close'],
  data () {
    return {
      name: ''
    }
  },
  methods: {
    save () {
      this.$emit('save', { name: this.name })
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
