<template>
  <dialog ref="dialog">
    <div class="form-group">
      <label>Save As</label>
      <input type="text" class="form-control" v-model="name" />
    </div>
    <div class="dialog-bottom">
      <button class="btn btn-default" @click="close">Cancel</button>
      <button class="btn btn-primary" @click="save">Save</button>
    </div>
  </dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CodeSaveName',
  data() {
    return {
      name: 'Untitled'
    }
  },
  methods: {
    ...mapActions('code', ['saveActiveTab']),
    show() {
      this.$refs.dialog.showModal()
    },
    close() {
      this.$refs.dialog.close()
    },
    save() {
      this.saveActiveTab(this.name)
      this.close()
    }
  }
}
</script>
