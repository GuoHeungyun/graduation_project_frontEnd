<template>
<div class="answer-item">
  <div class="author-info">
    <router-link :to="{name: 'people'}" custom v-slot="{navigate}">
      <div @click="navigate" @keypress.enter="navigate" role="link">
        <div class="userinfo">
          <img :src="avatarUrl" alt="" />
          <p class="username">{{ answer.username }}</p>
          <p class="headline">{{ answer.introduction }}</p>
        </div>
      </div>
    </router-link>
  </div>

  <div class="content-wrapper">
    <div class="excerpt" v-show="!isExpanded">
        <span v-html="answer.excerpt"></span>
        <span class="btnChange" @click="isExpanded = true">
          <el-icon color="#8590a6" class="no-inherit">
            <arrow-down />
          </el-icon>
          展开
        </span>
    </div>

    <div class="content" v-show="isExpanded">
      <div v-html="answer.content" class="set-line-height"></div>
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
import {defineComponent, ref, reactive, getCurrentInstance} from 'vue'
import {serverLocation} from "@/api/serverLocation.ts"

export default defineComponent({
  name: "answerItem",
  props: ['answer'],
  setup(prop){
    const internalInstance:any = getCurrentInstance() //获取当前vue对象实例
    const isExpanded = ref(false);  //是否展开
    let date = new Date(prop.answer.updatedAt)
    let updateTime = internalInstance.appContext.config.globalProperties.$moment(date).format("YYYY-MM-DD h:mm:ss");
    let avatarUrl = ref();
    if(!prop.answer.user_avatar){
      avatarUrl.value = 'src/assets/avatar/defaultAvatar.png'
    }else{
      avatarUrl.value = serverLocation+prop.answer.user_avatar
    }
    return {
      avatarUrl,
      isExpanded,
      updateTime,
    }
  }
})
</script>

<style scoped lang="less">
.answer-item{
  padding-bottom: 10px;
  border-bottom: 1px solid #F6F6F6;
  margin-bottom: 15px;
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

<style lang="less">
.set-line-height{
  p{
    line-height: @line-height-big;
  }
}
</style>
