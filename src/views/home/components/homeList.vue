<template>
<div class="home-list">
  <question-card></question-card>
</div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted, Ref} from 'vue'
import questionCard from '@/views/home/components/questionCard.vue'

export default defineComponent({
  name: "homeList",
  components:{
    questionCard,
  },
  setup() {
    return {

    }
  }
})
</script>

<style scoped lang="less">
.home-list{

}
</style>
