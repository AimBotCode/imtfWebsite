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
            {{ title }}
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')" />
        </div>

        <div class="modal-body">
          <!-- Storage Warning Alert -->
          <div v-if="!enableDownload" class="alert alert-info">
            <i class="las la-info-circle" />
            Profiles are saved in your browser's local storage and will be automatically removed when you clear your browser cache or browsing data.
          </div>

          <!-- CREATE MODE -->
          <div v-if="mode === 'create' || mode === 'update'">
            <div class="mb-3">
              <label for="profileName" class="form-label">Profile Name</label>
              <input
                id="profileName"
                v-model="profileName"
                type="text"
                placeholder="Enter profile name"
                class="form-control"
              >
            </div>
          </div>

          <!-- OPEN MODE -->
          <div v-else-if="mode === 'open'">
            <div class="mb-3">
              <label for="profileSelect" class="form-label">Select Profile</label>
              <select id="profileSelect" v-model="selectedProfile" class="form-select">
                <option disabled value="">
                  Choose a profile to load
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
                {{ profiles.length }} profile(s) saved locally
              </div>
            </div>

            <!-- No profiles message -->
            <div v-else class="alert alert-warning">
              <i class="las la-exclamation-triangle" />
              No saved profiles found. Create a profile first to save your current filter settings.
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <!-- CREATE/UPDATE MODE BUTTONS -->
          <template v-if="mode === 'create' || mode === 'update'">
            <button type="button" class="btn btn-outline-secondary" @click="$emit('close')">
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-success"
              :disabled="!profileName.trim()"
              @click="saveProfile"
            >
              <i class="las la-save" />
              {{ mode === 'create' ? 'Create Profile' : 'Update Profile' }}
            </button>
          </template>

          <!-- OPEN MODE BUTTONS -->
          <template v-else-if="mode === 'open'">
            <button type="button" class="btn btn-outline-secondary" @click="$emit('close')">
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              :disabled="!selectedProfile"
              @click="loadProfile"
            >
              <i class="las la-folder-open" />
              Load Profile
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String, // create, update, open
      default: 'create'
    },
    title: {
      type: String,
      default: ''
    },
    filters: {
      type: Object,
      default: () => ({})
    },
    enableDownload: {
      type: Boolean,
      default: false // enable download for create/update
    }
  },
  emits: ['close', 'saved', 'loaded'],
  data () {
    return {
      profileName: '',
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

    async saveProfile () {
      // Validation with SweetAlert
      if (!this.profileName.trim()) {
        await this.$utils.warn('Please enter a profile name')
        return
      }

      // Check if profile already exists (for update mode)
      const saved = JSON.parse(localStorage.getItem('scannerProfiles') || '{}')
      const profileExists = saved[this.profileName]

      if (this.mode === 'create' && profileExists) {
        // Profile exists, ask for confirmation to overwrite
        await this.$utils.confirm(
          'Profile Exists',
          `Profile "${this.profileName}" already exists. Do you want to overwrite it?`,
          async (result) => {
            if (result.isConfirmed) {
              await this.doSaveProfile()
            }
          }
        )
      } else {
        // Save directly
        await this.doSaveProfile()
      }
    },

    async doSaveProfile () {
      try {
        const saved = JSON.parse(localStorage.getItem('scannerProfiles') || '{}')
        saved[this.profileName] = this.filters
        localStorage.setItem('scannerProfiles', JSON.stringify(saved))

        // Download the profile if enabled
        if (this.enableDownload) {
          const dataStr = JSON.stringify(this.filters, null, 2)
          const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = `${this.profileName}.json`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(link.href)
        }

        const actionText = this.mode === 'create' ? 'created' : 'updated'
        await this.$utils.success(`Profile "${this.profileName}" ${actionText} successfully!`)

        this.$emit('saved', this.profileName) // send profile name back
        this.$emit('close')
      } catch (error) {
        await this.$utils.error('Failed to save profile. Please try again.')
      }
    },

    async loadProfile () {
      if (!this.selectedProfile) {
        await this.$utils.warn('Please select a profile to load')
        return
      }

      try {
        const saved = JSON.parse(localStorage.getItem('scannerProfiles') || '{}')
        if (saved[this.selectedProfile]) {
          await this.$utils.success(`Profile "${this.selectedProfile}" loaded successfully!`)
          this.$emit('loaded', saved[this.selectedProfile])
          this.$emit('close')
        } else {
          await this.$utils.error('Profile not found')
        }
      } catch (error) {
        await this.$utils.error('Failed to load profile. Please try again.')
      }
    }
  }
}
</script>
