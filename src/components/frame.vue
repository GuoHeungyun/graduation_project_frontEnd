<template>
  <div class="home">
    <navigation></navigation>
    <router-view v-slot="{ Component }">
      <keep-alive :include="['homePage','moment','discovery']">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import navigation from "@/components/navigation.vue"
export default defineComponent({
  name: "home",
  components:{
    navigation
  }
})
</script>

<style scoped lang="less">
</style>
