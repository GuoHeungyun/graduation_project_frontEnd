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
        <div class="btnChange" @click="isExpanded = false">
          <el-icon color="#8590a6" class="no-inherit">
            <arrow-up />
          </el-icon>
          收起
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted, Ref, getCurrentInstance} from 'vue'
import {serverLocation} from "@/api/serverLocation.ts"
import { getImgUrl } from '@/utils/tools.ts'

export default defineComponent({
  name: "homeListItem",
  props:['answer'],
  setup(prop){
    const internalInstance:any = getCurrentInstance() //获取当前vue对象实例
    const isExpanded = ref(false);  //是否展开
    let date = new Date(prop.answer.answerUpdate)
    let updateTime = internalInstance.appContext.config.globalProperties.$moment(date).format("YYYY-MM-DD h:mm:ss");
    let avatarUrl = ref();
    if(!prop.answer.authorAvatar){
      avatarUrl.value = 'src/assets/avatar/defaultAvatar.png'
    }else{
      avatarUrl.value = serverLocation+prop.answer.authorAvatar
    }
    console.log(prop.answer.answerId,getImgUrl(prop.answer.answerContent));
    console.log(prop.answer);
    return {
      isExpanded,
      updateTime,
      avatarUrl,
    }
  }
})
</script>

<style scoped lang="less">
.home-list-item{
  padding-bottom: 10px;
  border-bottom: 1px solid #F6F6F6;
  margin-bottom: 15px;
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
}
</style>
