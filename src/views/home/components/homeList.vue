<template>
<div class="home-list">
  <div v-for="(item, index) in answerList" :key="index">
    <home-list-item :answer="item">
    </home-list-item>
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted, Ref, toRaw} from 'vue'
import { getAnswer } from "@/api/answer";
import homeListItem from "@/views/home/components/homeListItem.vue";

export default defineComponent({
  name: "homeList",
  components:{
    homeListItem
  },
  setup() {
    let answerList:any = reactive([]);
    let questionInfo = ref()
    getAnswer().then(res=>{
      console.log(res);
      res.data.forEach((row:any)=>{
        let objAnswer:any = reactive({
          answerId: '',
          authorName: '',
          authorId:'',
          authorIntroduction: '',
          authorAvatar: '',
          answerContent: '',
          answerExcerpt: '',
          questionTitle: '',
          questionId: '',
          answerUpdate: '',
        });
        objAnswer.answerId = row.answer_id
        objAnswer.authorName = row.username
        objAnswer.authorId = row.answerAuthorId
        objAnswer.authorIntroduction = row.introduction
        objAnswer.authorAvatar = row.user_avatar
        objAnswer.answerContent = row.answerContent
        objAnswer.answerExcerpt = row.answerExcerpt
        objAnswer.questionTitle = row.questionTitle
        objAnswer.questionId = row.question_id
        objAnswer.answerUpdate = row.answerUpdate
        answerList.push(toRaw(objAnswer))
      })
    })
    return {
      answerList,
    }
  }
})
</script>

<style scoped lang="less">
.home-list{

}
</style>
