<template>
    <div class="footer">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的关注" name="follow"><follow></follow></el-tab-pane>
        <el-tab-pane label="我的收藏" name="collect"><collect></collect></el-tab-pane>
        <el-tab-pane label="我的评论" name="comment"><comment></comment></el-tab-pane>
      </el-tabs>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import follow from "./components/follow.vue"
import comment from "./components/comment.vue"
import collect from "./components/collect.vue"

export default defineComponent({
  name: "information",
  components: {
    follow,
    comment,
    collect
  },
  setup() {
    const username = ref(sessionStorage.getItem('username'));
    const activeName = ref('follow');
    const handleClick = (tab: string, event: Event) => {
      console.log(tab, event)
    }
    return {
      username,
      activeName,
      handleClick
    }
  }
})
</script>

<style scoped lang="less">

</style>
