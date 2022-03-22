<template>
  <div class="question-detail">
    <navigation></navigation>
    <describe @setShowWriteAnswer="setShowWriteAnswer"></describe>
    <div class="main">
      <write-answer ref="writeAnswer"></write-answer>
      <answer-list :questionId="questionId"></answer-list>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, Ref} from 'vue'
import navigation from "@/components/navigation.vue"
import describe from "@/views/questionDetail/components/describe.vue"
import writeAnswer from "@/views/questionDetail/components/writeAnswer.vue";
import answerList from "@/views/questionDetail/components/answerList.vue";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "questionDetail",
  components: {
    navigation,
    describe,
    writeAnswer,
    answerList,
  },
  setup(){
    const route = useRoute();
    const questionId = route.params.questionId
    const writeAnswer:Ref = ref()

    function setShowWriteAnswer(flag:boolean){
      writeAnswer.value.isShowWriteAnswer = flag
    }
    return {
      questionId,
      writeAnswer,
      setShowWriteAnswer,
    }
  }
})
</script>

<style scoped lang="less">
.question-detail{
  .main {
    max-width: @max-width;
    min-width: @min-width;
    margin: 0 auto;
  }
}
</style>
