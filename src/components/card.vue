<template>
  <div class="card-content">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
      name: "card",
})
</script>

<style scoped lang="less">
.card-content{
  min-width: 1000px;
  max-width: 1000px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px;
  background-color: #fff;
}
</style>
