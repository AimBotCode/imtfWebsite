<template>
  <div
    class="modal fade show"
    style="display: block; background-color: rgba(0,0,0,0.5); position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1050;"
    tabindex="-1"
    @click.self="$emit('close')"
  >
    <div class="modal-dialog modal-dialog-centered" style="max-width: 500px;">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Configure Table Columns
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')" />
        </div>
        <div class="modal-body">
          <div class="alert alert-info">
            <i class="las la-info-circle" />
            First, check if exactly 4 columns are already selected. Only 4 columns can be selected to display in the table.
          </div>

          <div class="row">
            <div class="col-12">
              <div v-for="column in availableColumns" :key="column.key" class="form-check mb-3">
                <input
                  :id="'column-' + column.key"
                  v-model="selectedColumns"
                  class="form-check-input"
                  type="checkbox"
                  :value="column.key"
                  :disabled="!selectedColumns.includes(column.key) && selectedColumns.length >= 4"
                >
                <label class="form-check-label" :for="'column-' + column.key">
                  <strong>{{ column.label }}</strong>
                  <small class="text-muted d-block">{{ column.description }}</small>
                </label>
              </div>
            </div>
          </div>

          <div class="mt-3">
            <div class="badge bg-primary">
              {{ selectedColumns.length }} of 4 columns selected
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="resetToDefault">
            Reset to Default
          </button>
          <button type="button" class="btn btn-outline-secondary" @click="$emit('close')">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            :disabled="selectedColumns.length !== 4"
            @click="saveConfiguration"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentColumns: {
      type: Array,
      default: () => ['sym', 'sector', 'close', 'change']
    }
  },
  emits: ['close', 'save'],
  data () {
    return {
      selectedColumns: [],
      availableColumns: [
        { key: 'sym', label: 'Symbol', description: 'Stock ticker symbol', sortKey: 'Sym' },
        { key: 'sector', label: 'Market', description: 'Market sector classification', sortKey: 'sector' },
        { key: 'close', label: 'Close', description: 'Current closing price', sortKey: 'close' },
        { key: 'change', label: 'Change (%)', description: 'Percentage change from previous close', sortKey: 'change' },
        { key: 'dtime', label: 'Date/Time', description: 'Last update timestamp', sortKey: 'dtime' },
        { key: 'istate', label: 'IState', description: 'StateBarCount indicator', sortKey: 'istate' },
        { key: 'vstate', label: 'VState', description: 'HasStateBars indicator', sortKey: 'vstate' },
        { key: 'cstate', label: 'CState', description: 'CStateCount indicator', sortKey: 'cstate' },
        { key: 'sectors', label: 'Sector', description: 'Industry sector classification', sortKey: 'sectors' },
        { key: 'description', label: 'Description', description: 'Company full name', sortKey: 'description' }
      ]
    }
  },
  mounted () {
    this.selectedColumns = [...this.currentColumns]
  },
  methods: {
    saveConfiguration () {
      if (this.selectedColumns.length === 4) {
        this.$emit('save', this.selectedColumns)
        // Close modal after emitting save
        this.$emit('close')
      }
    },
    resetToDefault () {
      this.selectedColumns = ['sym', 'sector', 'close', 'change']
      this.$emit('save', this.selectedColumns)
      // Close modal after emitting save
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal {
  z-index: 1050;
}
.modal-dialog {
  margin: 1.75rem auto;
}
</style>
