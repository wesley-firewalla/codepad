<template>
  <div>Hello</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LifeContent',
  computed: {
    ...mapState('life', {
      active_tab: state => state.active_tab
    })
  }
}
</script>
