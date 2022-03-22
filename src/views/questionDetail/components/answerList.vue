<template>
<div class="answer-list">
  <el-card v-show="myAnswerList.length === 0 && otherAnswerList.length === 0">
    <div>当前没有回答</div>
  </el-card>
  <!--我的回答-->
  <el-card v-if="myAnswerList.length">
    <div class="list-header">
      <span>我的回答</span>
    </div>
    <div v-for="(item, index) in myAnswerList" :key="index">
      <answer-item :answer="item">
      </answer-item>
    </div>
  </el-card>
  <div style="height:10px;"></div>
  <!--其他回答-->
  <el-card v-if="otherAnswerList.length">
    <div class="list-header">
      <span>其他{{otherAnswerList.length}}回答</span>
    </div>
    <div v-for="(item, index) in otherAnswerList" :key="index">
      <answer-item :answer="item">
      </answer-item>
    </div>
  </el-card>
</div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive} from 'vue'
import { getAnswer } from "@/api/answer";
import {useStore} from "vuex";
import answerItem from "@/views/questionDetail/components/answerItem.vue";

export default defineComponent({
  name: "answerList",
  components: {
    answerItem
  },
  props: ['questionId'],
  setup(prop) {
    const store = useStore();
    let questionId = ref(prop.questionId);  //问题id
    let myAnswerList:any = reactive([]);    //我的回答列表
    let otherAnswerList:any = reactive([]); //其他回答列表
    const myId = ref(store.getters.getUserInfo.userId)  //当前用户登录的id
    getAnswer({id: questionId.value}).then(res => {
      res.data.forEach((row:any)=>{
        if(row.user_id === myId.value){
          myAnswerList.push(row)
        }else{
          otherAnswerList.push(row)
        }
      })
    })
    return {
      myAnswerList,
      otherAnswerList,
    }
  }
})
</script>

<style scoped lang="less">
.answer-list{
  .list-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 10px 0;
    border-bottom: 1px solid #F6F6F6;
    box-sizing: border-box;
    font-weight: 600;
    color: #646464;
  }
}
</style>
