<template>
<div class="describe">
  <div class="question-header">
    <div class="question-header-content">
      <div class="question-header-main">
        <h1 class="question-header-title">
          {{questionInfo.title}}
        </h1>
        <!--    收起来时的样式    -->
        <div
            class="question-header-details"
            v-if="questionInfo.excerpt"
            v-show="!isExpanded"
        >
          <span>{{questionInfo.excerpt}}</span>
          <span class="btnChange" @click="isExpanded = true">
            <el-icon color="#8590a6" class="no-inherit">
              <arrow-down />
            </el-icon>
            展开
          </span>
        </div>
        <!--   展开时的样式     -->
        <div
            class="question-header-details"
            v-if="questionInfo.excerpt"
            v-show="isExpanded"
        >
          <div v-html="questionInfo.description"></div>
        </div>
      </div>

      <div class="question-header-side">
        <div class="question-header-side-item">
          <p class="name">被浏览</p>
          <p class="num">232</p>
        </div>
        <div class="question-header-side-item">
          <p class="name">关注者</p>
          <p class="num">12343</p>
        </div>
      </div>
    </div>
    <div class="question-header-footer">
      <div class="question-header-footer-inner">
        <div class="question-header-footer-main">
          <div class="question-header-btnGroup">
<!--            <el-button type="primary">关注问题</el-button>-->
            <el-button type="primary" plain @click="showAnswerPart">
              写回答
            </el-button>
            <div class="btnChange" @click="isExpanded = false" v-show="isExpanded">
              <el-icon color="#8590a6" class="no-inherit">
                <arrow-up />
              </el-icon>
              收起
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive} from 'vue'
import {getQuestion} from '@/api/question.ts'
import {useRoute} from "vue-router";

export default defineComponent({
  name: "describe",
  setup(prop,context){
    const route = useRoute();
    const questionId = route.params.questionId.toString()
    const isExpanded = ref(false);  //是否展开
    let questionInfo = reactive({
      answerNumber: '',
      createdAt: "",
      description: "",
      excerpt: "",
      question_id: '',
      title: "",
      updatedAt: "",
      user_avatar: '',
      user_id: '',
      username:''
    })
    function showAnswerPart(){
      context.emit('setShowWriteAnswer', true);
    }
    getQuestion(questionId).then(res=>{
      questionInfo.answerNumber = res.data[0].answerNumber
      questionInfo.createdAt = res.data[0].createdAt
      questionInfo.description = res.data[0].description
      questionInfo.excerpt = res.data[0].excerpt
      questionInfo.question_id = res.data[0].question_id
      questionInfo.title = res.data[0].title
      questionInfo.updatedAt = res.data[0].updatedAt
      questionInfo.user_avatar = res.data[0].user_avatar
      questionInfo.user_id = res.data[0].user_id
      questionInfo.username = res.data[0].username
    })
    return{
      questionInfo,
      isExpanded,
      showAnswerPart,
    }
  }
})
</script>

<style scoped lang="less">
.describe{
  margin-bottom: 10px;
  .question-header{
    position: relative;
    min-width: @min-width;
    padding: 16px 0;
    background: #FFFFFF;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    .question-header-content{
      display: flex;
      justify-content: space-between;
      width: @min-width;
      height: 100%;
      //padding: 0 16px;
      margin: 0 auto;
      .question-header-main {
        width: 100%;
        padding-left: 20px;
        box-sizing: border-box;
        text-align: left;
        .question-header-topic {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          margin-right: -5px;
          padding: 1px 0;
          span {
            margin: 0 5px;
          }
        }
        .question-header-title {
          margin-top: 12px;
          margin-bottom: 4px;
          font-size: 22px;
          font-weight: 600;
          font-synthesis: style;
          line-height: 32px;
          color: #1A1A1A;
        }
        .question-header-details {
          font-size: 15px;
          line-height: 25px;
          .btnChange{
            color: #8590a6;
            cursor: pointer;
          }
        }
      }
      .question-header-side {
        width: 300px;
        padding-right: 20px;
        text-align: right;
        margin: 20px 10px 0 0;
        .question-header-side-item {
          text-align: center;
          float: right;
          padding: 0 10px;
          .name {
            font-size: 14px;
            color: #8590A6;
            margin: 0;
            font-weight: 600;
          }
          .num {
            display: inline-block;
            font-size: 18px;
            color: #1A1A1A;
            font-weight: 600;
            margin: 10px 0 0 0;
          }
        }
        .question-header-side-item:nth-child(2) {
          border-right: 1px solid #EBEBEB;
        }
      }
    }
    .question-header-footer {
      padding: 12px 0px;
      margin-top: 4px;
      margin-bottom: -12px;
      background: #FFFFFF;
      position: sticky;
      bottom: 0;
      border-top: 1px solid rgb(235, 235, 235);
      .question-header-footer-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 950px;
        height: 100%;
        padding: 0 16px;
        margin: 0 auto;
        .question-header-footer-main {
          display: flex;
          align-items: center;
          margin-top: 4px;
          min-width: 694px;
          width: auto;
          .question-header-btnGroup {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin: 0 -8px;
            .btnChange{
              color: #8590a6;
              cursor: pointer;
              margin-left: 16px;
              display: flex;
              align-items: center;
              justify-content:center;
            }
          }
        }
      }
    }
  }
}
</style>
