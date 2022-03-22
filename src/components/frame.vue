<template>
  <div class="home">
    <navigation></navigation>
    <div class="main">
      <router-view v-slot="{ Component }">
        <keep-alive :include="['homePage','moment','discovery']">
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </div>
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
.home{
  .main{
    max-width: @max-width;
    min-width: @min-width;
    margin: 0 auto;
  }
}
</style>
