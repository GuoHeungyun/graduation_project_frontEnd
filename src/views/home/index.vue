<template>
  <div class="content">
    <div class="left-box">
<!--      <home-list></home-list>-->
      <main-list-wrapper></main-list-wrapper>
    </div>
    <div class="right-box">
      右边
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import questionCard from './components/questionCard.vue'
import homeList from "@/views/home/components/homeList.vue";
import mainListWrapper from "@/views/home/components/mainListWrapper.vue";

export default defineComponent({
  name: "index",
  components: {
    // questionCard,
    // homeList,
    mainListWrapper,
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
  display: flex;
  .left-box{
    width: 100%;
  }
  .right-box{
    margin-left: 10px;
    width: 300px;
    height: 800px;
    border: 1px solid red;
  }
}
</style>
