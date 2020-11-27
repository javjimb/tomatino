<template>
  <div>
    <h3 class="settings-label">{{label}}</h3>
  </div>
</template>

<script>
export default {
  name: 'SettingsLabel',
  props: {
    label: {
      type: String,
      default: 'Settings label'
    }
  }
}
</script>

<style scoped>
.settings-label {
  padding-left: 15px;
  color: #424242;
}
</style>
