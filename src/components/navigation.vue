<template>
  <div class="navigation">
    <!--  提问模态框  -->
    <el-dialog
        title="新的问题"
        v-model="isShowAskModal"
    >
      <ask-modal @setAskModalVisible="setAskModalVisible"/>
    </el-dialog>
    <div class="inner">
      <div class="left">
        <div class="header-logo">
<!--          <img src="https://static.zhihu.com/static/revved/img/sticky_header/new_logo@2x.9187366b.png" alt="">-->
          <img src="@/assets/lexiang.png" alt="">
        </div>
        <ul>
          <li>
<!--            :to="{name: 'home'}"-->
            <router-link to="/lexiang/home" custom v-slot="{navigate, isActive}">
              <div @click="navigate" @keypress.enter="navigate" role="link" :class="{'active':isActive}">首页</div>
            </router-link>
          </li>
          <li>
            <router-link to="/lexiang/moment" custom v-slot="{navigate, isActive}">
              <div @click="navigate" @keypress.enter="navigate" role="link" :class="{'active':isActive}">动态</div>
            </router-link>
          </li>
          <li>
            <router-link to="/lexiang/discovery" custom v-slot="{navigate, isActive}">
              <div @click="navigate" @keypress.enter="navigate" role="link" :class="{'active':isActive}">发现</div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="middle">
        <el-input
            placeholder="请输入内容"
            style="width: 300px;"
        >
          <template #append>
            <el-button><el-icon><search /></el-icon></el-button>
          </template>
        </el-input>
        <el-button type="primary" class="btn-ask" @click="setAskModalVisible(true)">
          提问
        </el-button>
      </div>
      <div class="right">
        <!--    头像框    -->
        <profile></profile>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import profile from "@/views/profile/index.vue"
import askModal from "@/components/askModal.vue";

import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: "navigation",
  components: {
    profile,
    askModal,
  },
  setup() {
    const isShowAskModal = ref(false)
    const centerDialogVisible = ref(false)
    function setAskModalVisible(flag:boolean) {
      isShowAskModal.value = flag;
    }
    return {
      isShowAskModal,
      centerDialogVisible,
      setAskModalVisible,
    }
  }
})
</script>

<style scoped lang="less">
.navigation {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(18, 18, 18, .1);
  margin-bottom: 6px;
  .inner {
    display: flex;
    margin: 0 auto;
    height: 52px;
    min-width: @min-width;
    max-width: @max-width;
    align-items: center;
    justify-content: space-between;
    .middle {
      display: flex;
      .btn-ask{
        margin-left: 20px;
      }
    }
    .left {
      display: flex;
      align-items: center;
      .header-logo {
        margin-right: 30px;
        img {
          width: 61px;
          background: #5082ff;
        }
      }
      ul {
        text-decoration: none;
        list-style: none;
        display: flex;

        li {
          color: #8590a6;
          margin-right: 30px;
          cursor: pointer;

          div {
            //height: 52px;
            line-height: 52px;
          }

          .active {
            color: #121212;
            font-weight: 600;
            position: relative;

            &::after {
              position: absolute;
              right: 0;
              bottom: -1px;
              left: 0;
              height: 3px;
              background: #06f;
              content: "";
            }
          }
        }
      }
    }

  }
}
</style>
