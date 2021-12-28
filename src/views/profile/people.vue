<template>
  <card>
    <div class="header">
      <div v-if="showModify" class="header-left">
        <img :src="imageUrl" alt="">
        <div class="text-wrap">
          <div>{{username}}</div>
          <div class="introduction">{{introduction}}</div>
        </div>
      </div>
<!--   顶替   -->
      <div v-else></div>
      <div class="header-right">
        <div v-if="showModify" class="modify" @click="changeShow">
          修改个人资料
        </div>
        <div v-else class="modify" @click="changeShow">
          返回我的主页
        </div>
      </div>
    </div>
    <split></split>
    <router-view></router-view>
  </card>
</template>

<script lang="ts">
import {defineComponent, ref, } from 'vue'
import card from "@/components/card.vue"
import split from "@/components/split.vue"
import {useRouter, useRoute} from "vue-router";
import { useStore } from 'vuex'

export default defineComponent({
  name: "people",
  components: {
    card,
    split,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const userInfo = store.getters.getUserInfo;
    const username = ref(userInfo.username);
    const introduction = ref(userInfo.introduction);
    const showModify = ref(true);
    const imageUrl = ref('')
    if(route.name == 'modify'){
      showModify.value = false;
    }
    //显示个人信息页或修改个人信息页
    const changeShow = () => {
      if(!showModify.value){
        router.replace('/lexiang/people/information');
      }else{
        router.replace('/lexiang/people/modify');
      }
      showModify.value = !showModify.value
    }
    //获取头像链接
    if (!sessionStorage.getItem('avatar')){
      imageUrl.value = '@/assets/sculpture_boy.png'
    }else{
      imageUrl.value = store.getters.getAvatarUrl
    }
    return {
      username,
      introduction,
      showModify,
      imageUrl,
      changeShow
    }
  }
})
</script>

<style scoped lang="less">
.header{
  display: flex;
  justify-content: space-between;
  .header-left{
    display: flex;
    align-items: flex-end;
    img{
      width: 80px;
      margin-top: 20px;
    }
    .text-wrap{
      margin-left: 20px;
      font-size: 26px;
      font-weight: 600;
      .introduction{
        font-size: 18px;
        font-weight: normal;
      }
    }
  }
  .header-right{
    display: flex;
    flex-direction: column-reverse;
    .modify{
      color: #06f;
      border: 1px solid #06f;
      display: inline-block;
      padding: 0 16px;
      font-size: 14px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      background: none;
      border-radius: 3px;
      &:hover{
        background-color: rgba(0,102,255,.06);
      }
    }
  }
}
</style>
