<template>
<div class="hot-list">
  热榜
  <comment></comment>
</div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted, Ref} from 'vue'
import comment from '@/components/comment.vue'

export default defineComponent({
  name: "hotList",
  components:{
    comment
  },
  setup() {
    return {

    }
  }
})
</script>

<style scoped lang="less">
.hot-list{

}
</style>
