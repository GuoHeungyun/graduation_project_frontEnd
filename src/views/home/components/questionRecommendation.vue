<template>
<!-- 问题广场 -->
<div class="question-recommendation">
  <div class="box">
    <div class="header">
      <div class="question">问题</div>
      <div class="presenter">提问用户</div>
      <div class="operation">操作</div>
    </div>
    <div class="body">
      <div class="question-item" v-for="(item) in questionList" :key="item.id">
        <div class="question">
          <div class="title" @click="toQuestionDetail(item)">{{item.title}}</div>
          <div class="ansNum">{{item.answerNumber}} 回答</div>
        </div>
        <div class="presenter">
          <div class="info">
            <img :src="serverLocation+item.user_avatar" alt="" v-if="item.user_avatar">
            {{item.username}}
          </div>
          <div class="time">{{item.howLong}}</div>
        </div>
        <div class="operation" @click="toQuestionDetail(item)"><el-icon class="icon"><edit />去回答</el-icon></div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted, toRaw} from 'vue'
import {getQuestion} from '@/api/question.ts'
import {serverLocation} from "@/api/serverLocation.ts"
import {useRouter, useRoute} from "vue-router";
import {useStore} from "vuex";

export default defineComponent({
  name: "questionRecommendation",
  setup() {
    let questionList:any = reactive([]) //问题列表
    const router = useRouter();
    let now:any = new Date();
    const store = useStore();
    //获取问题列表s
    getQuestion().then(res => {
      console.log(res);
      res.data.forEach((row:any) => {
        let date:any = new Date(row.createdAt)
        let howLong: any = Math.floor((now - date)/ 1000 / 60 / 60)
        if(howLong>24){
          howLong = Math.floor(howLong/24)+'天前'
        }else{
          howLong = howLong + '小时前'
        }
        row.howLong = howLong //设置问题距今时间
        questionList.push(row);
      })
    })
    //前往问题详情页
    function toQuestionDetail(item:any){
      let objQuestion = toRaw(item)
      store.commit('setQuestionInfo', objQuestion);
      const {href} = router.resolve({
        name: 'questionDetail',
        params: {
          questionId: item.question_id,
        }
      })
      window.open(href, '_blank')
    }
    return {
      serverLocation,
      questionList,
      toQuestionDetail,
    }
  }
})
</script>

<style scoped lang="less">
.question-recommendation{
  .box{
    .question{
      box-sizing: border-box;
      width: 100%;
      padding-right: 50px;
    }
    .presenter{width: 150px;box-sizing: border-box;}
    .operation{width: 120px;box-sizing: border-box;}
    .header{
      display: flex;
      height: 35px;
      position: relative;
      color: #8590A6;
      &::after{
        content: "";
        width: 100%;
        height: 1px;
        background-color:#EBEBEB;
        bottom: 0;
        position: absolute;
      }
    }
    .body{
      .question-item{
        display: flex;
        height: 78px;
        position: relative;
        align-items: center;
        color: rgb(68, 68, 68);
        font-size: @normal-font-size;
        &::after{
          content: "";
          width: 100%;
          height: 1px;
          background-color:#EBEBEB;
          bottom: 0;
          position: absolute;
        }
        .question{
          .title{
            cursor: pointer;
          }
          .ansNum{
            font-size: 14px;
            color: @gray-color;
            margin-top: 8px;
          }
        }
        .presenter{
          font-size: @small-font-size;
          display: flex;
          flex-direction: column;
          .info{
            display: flex;
            align-items: center;
            font-size: @small-font-size;
            img{width:40px;height:40px;}
          }
          .time{
            color: @gray-color;
            font-size:@smaller-font-size;
            margin-top: 8px;
          }
        }
        .operation{
          font-size: @small-font-size;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .icon{
            background-color: #06f;
            width: 96px;
            height: 28px;
            border-radius: 3px;
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>
