<template>
<div class="home-list-item">
  <div class="answer-title">{{answer.questionTitle}}</div>
  <div class="author-info">
    <router-link :to="{name: 'people'}" custom v-slot="{navigate}">
      <div @click="navigate" @keypress.enter="navigate" role="link">
        <div class="userinfo">
          <img :src="avatarUrl" alt="" />
          <p class="username">{{ answer.authorName }}</p>,
          <p class="headline">{{ answer.authorIntroduction }}</p>
        </div>
      </div>
    </router-link>
  </div>

  <div class="content-wrapper">
    <div class="excerpt" v-show="!isExpanded">
      <span v-html="answer.answerExcerpt"></span>
      <span class="btnChange" @click="isExpanded = true">
          <el-icon color="#8590a6" class="no-inherit">
            <arrow-down />
          </el-icon>
          展开
        </span>
    </div>

    <div class="content" v-show="isExpanded">
      <div v-html="answer.answerContent" class="set-line-height"></div>
      <div class="content-footer">
        <div class="update-time">
          编辑于 {{updateTime}}
        </div>
      </div>
    </div>
  </div>

  <div class="question-header-footer">
    <div class="question-header-footer-inner">
      <div class="question-header-footer-main">
        <div class="question-header-btnGroup">
          <!--            <el-button type="primary">关注问题</el-button>-->
          <el-button type="primary" plain @click="isShowComment = !isShowComment">
            评论
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
  <div v-if="isShowComment">
  <!--  占位div  -->
    <div style="height:12px;"></div>
    <comment :targetType="textType.answer" :targetId="answer.answerId"></comment>
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted, Ref, getCurrentInstance} from 'vue'
import {serverLocation} from "@/api/serverLocation.ts"
import comment from '@/components/comment.vue'
import { textType } from '@/ts/enumType.ts'
import { getImgUrl } from '@/utils/tools.ts'

export default defineComponent({
  name: "homeListItem",
  props:['answer'],
  components: {
    comment
  },
  setup(prop){
    const internalInstance:any = getCurrentInstance() //获取当前vue对象实例
    const isExpanded = ref(false);  //是否展开
    let date = new Date(prop.answer.answerUpdate)
    let updateTime = internalInstance.appContext.config.globalProperties.$moment(date).format("YYYY-MM-DD h:mm:ss");
    let avatarUrl = ref();
    const isShowComment = ref(false)
    if(!prop.answer.authorAvatar){
      avatarUrl.value = 'src/assets/avatar/defaultAvatar.png'
    }else{
      avatarUrl.value = serverLocation+prop.answer.authorAvatar
    }
    return {
      isExpanded,
      updateTime,
      avatarUrl,
      isShowComment,
      textType,
    }
  }
})
</script>

<style scoped lang="less">
.home-list-item{
  padding-bottom: 10px;
  border-bottom: 1px solid #F6F6F6;
  margin-bottom: 15px;
  border-bottom: 1px solid rgb(240, 242, 247);
  position: relative;
  height: 100%;
  .answer-title{
    color: rgb(18, 18, 18);
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
  }
  .author-info {
    font-size: 15px;
    color: #646464;
    margin: 15px 0 10px;
    cursor: pointer;
    .userinfo{
      display: flex;
      align-items: center;
      img {
        width: 38px;
        height: 38px;
        float: left;
        margin-right: 6px;
      }
      .username{
        color: rgb(68, 68, 68);
        font-size: @normal-font-size;
        font-weight: 600;
      }
      .headline{
        color: rgb(100, 100, 100);
        font-size: @small-font-size;
      }
    }
  }
  .content-wrapper {
    .btnChange{
      color: #8590a6;
      cursor: pointer;
      margin-left: 16px;
    }
    .content {
      .content-footer{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        font-size: @small-font-size;
        color: @gray-color;
        .update-time{

        }
      }
    }
  }
  .question-header-footer {
    padding: 6px 0px 0 0;
    margin-top: 4px;
    background: #FFFFFF;
    position: sticky;
    bottom: 0;
    //border-top: 1px solid rgb(235, 235, 235);
    .question-header-footer-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
