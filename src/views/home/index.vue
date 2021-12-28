<template>
  <div class="content">
    <question-card></question-card>
  </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import questionCard from './components/questionCard.vue'

export default defineComponent({
  name: "index",
  components: {
    questionCard
  },
  setup(){
    return {

    }
  }
})
</script>

<style scoped lang="less">
.content {
  max-width: @max-width;
  min-width: @min-width;
  margin: 0 auto;
}
</style>
