<template>
<div class="main-list-nav">
  <el-card class="list-nav-card">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
      <el-menu-item index="1">
        <router-link :to="{name: 'homeList'}" custom v-slot="{ navigate }">
          <div @click="navigate" @keypress.enter="navigate" role="link">推荐</div>
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link :to="{name: 'questionRecommendation'}" custom v-slot="{ navigate }">
          <div @click="navigate" @keypress.enter="navigate" role="link">问题广场</div>
        </router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link :to="{name: 'hotList'}" custom v-slot="{ navigate }">
          <div @click="navigate" @keypress.enter="navigate" role="link">热榜</div>
        </router-link>
      </el-menu-item>
    </el-menu>
  </el-card>

</div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted, Ref} from 'vue'
export default defineComponent({
  name: "mainListNav",
  setup(){
    const activeIndex = ref('1')
    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    return {
      activeIndex,
      handleSelect,
    }
  }
})
</script>

<style lang="less">
.main-list-nav{
  .list-nav-card{
    .el-card__body {
      padding: 0 !important;
    }
  }
}
</style>
