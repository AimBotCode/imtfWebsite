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
            Update Existing Profile
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')" />
        </div>

        <div class="modal-body">
          <!-- Storage Warning Alert -->
          <div class="alert alert-info">
            <i class="las la-info-circle" />
            Select an existing profile to update with your current filter settings.
          </div>

          <div class="mb-3">
            <label for="profileSelect" class="form-label">Select Profile to Update</label>
            <select id="profileSelect" v-model="selectedProfile" class="form-select">
              <option disabled value="">
                Choose a profile to update
              </option>
              <option v-for="p in profiles" :key="p" :value="p">
                {{ p }}
              </option>
            </select>
          </div>

          <!-- Profile count display -->
          <div v-if="profiles.length > 0" class="mt-3">
            <div class="badge bg-primary">
              <i class="las la-database" />
              {{ profiles.length }} profile(s) available for update
            </div>
          </div>

          <!-- No profiles message -->
          <div v-else class="alert alert-warning">
            <i class="las la-exclamation-triangle" />
            No saved profiles found. Create a profile first before you can update one.
          </div>

          <!-- Preview current settings -->
          <div v-if="selectedProfile" class="mt-3">
            <div class="alert alert-success">
              <i class="las la-check-circle" />
              <strong>Ready to update:</strong> Profile "{{ selectedProfile }}" will be overwritten with your current filter settings.
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" @click="$emit('close')">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-warning"
            :disabled="!selectedProfile"
            @click="updateProfile"
          >
            <i class="las la-sync-alt" />
            Update Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentFilters: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'updated'],
  data () {
    return {
      selectedProfile: '',
      profiles: []
    }
  },
  mounted () {
    this.loadProfiles()
  },
  methods: {
    loadProfiles () {
      const saved = JSON.parse(localStorage.getItem('scannerProfiles') || '{}')
      this.profiles = Object.keys(saved)
    },

    async updateProfile () {
      if (!this.selectedProfile) {
        await this.$utils.warn('Please select a profile to update')
        return
      }

      try {
        // Confirm the update action
        await this.$utils.confirm(
          'Update Profile',
          `Are you sure you want to update profile "${this.selectedProfile}" with your current filter settings? This action cannot be undone.`,
          async (result) => {
            if (result.isConfirmed) {
              await this.doUpdateProfile()
            }
          }
        )
      } catch (error) {
        console.error('Error in updateProfile:', error)
      }
    },

    async doUpdateProfile () {
      try {
        const saved = JSON.parse(localStorage.getItem('scannerProfiles') || '{}')

        // Update the selected profile with current filters
        saved[this.selectedProfile] = this.currentFilters
        localStorage.setItem('scannerProfiles', JSON.stringify(saved))

        // Show success message
        await this.$utils.success(`Profile "${this.selectedProfile}" updated successfully with your current settings!`)

        this.$emit('updated', this.selectedProfile)
        this.$emit('close')
      } catch (error) {
        console.error('Error updating profile:', error)
        await this.$utils.error('Failed to update profile. Please try again.')
      }
    }
  }
}
</script>
