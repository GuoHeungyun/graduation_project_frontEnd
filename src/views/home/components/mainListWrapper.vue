<template>
<div class="main-list-wrapper">
  <main-list-nav></main-list-nav>
  <el-card>
    <router-view>

    </router-view>
  </el-card>
</div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted, Ref} from 'vue'
import mainListNav from "@/views/home/components/mainListNav.vue";

export default defineComponent({
  name: "mainListWrapper",
  components:{
    mainListNav
  },
  setup() {
    return {

    }
  }
})
</script>

<style scoped lang="less">
.main-list-wrapper{

}
</style>
