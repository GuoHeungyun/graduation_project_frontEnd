<template>
  <div class="main">
    <router-view/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  components:{
  }
})

</script>

<style lang="less" scoped>
.main {
  height: 100vh;
  width: 100%;
  background-color: #F6F6F6;
}
</style>
