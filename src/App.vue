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
  width: 100%;
  background-color: #F6F6F6;
}
</style>

<style lang="less">
.set-line-height{
  p{
    line-height: @line-height-big;
  }
}
</style>
