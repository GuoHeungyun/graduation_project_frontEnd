<template>
<div class="question-recommendation">
  <div class="box">
    <div class="header">
      <div class="question">问题</div>
      <div class="presenter">提问用户</div>
      <div class="operation">操作</div>
    </div>
    <div class="body">
      <div class="question-item" v-for="(item) in questionList" :key="item.id">
        <div class="question">{{item.title}}</div>
        <div class="presenter">{{item.username}}</div>
        <div class="operation">去回答</div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted, Ref} from 'vue'
import {getQuestion} from '@/api/question.ts'
export default defineComponent({
  name: "questionRecommendation",
  setup() {
    let questionList = reactive([])
    getQuestion().then(res => {
      console.log(res);
      res.data.forEach((row:never) => {
        questionList.push(row);
      })
    })
    return {
      questionList
    }
  }
})
</script>

<style scoped lang="less">
.question-recommendation{
  .box{
    .question{
      width: 100%;
      padding-right: 50px;
    }
    .presenter{width: 300px;}
    .operation{width: 120px;}
    .header{
      display: flex;
      height: 35px;
      position: relative;
      &::after{
        content: "";
        width: 100%;
        height: 1px;
        background-color:#EBEBEB;
        bottom: 0;
        position: absolute;
      }
      margin-bottom: 10px;
    }
    .body{
      .question-item{
        display: flex;
        height: 78px;
        position: relative;
        &::after{
          content: "";
          width: 100%;
          height: 1px;
          background-color:#EBEBEB;
          bottom: 0;
          position: absolute;
        }
      }
    }
  }
}
</style>
