<template>
  <div class="content">
    <el-dropdown trigger="click">
      <div class="avatar-wrap">
        <img :src="imageUrl" alt="">
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <router-link :to="{name:'people',query:{userId:userId}}" custom v-slot="{navigate}">
              <div @click="navigate" @keypress.enter="navigate" role="link">我的主页</div>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item @click="logout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: "index",
  setup(){
    const store = useStore()
    const {imageUrl} = getAvatar();
    const { logout } = logoutFn();
    let userId = ref(store.getters.getUserInfo.userId);
    return {
      imageUrl,
      userId,
      logout,
    }
  }
})

//退出登录
const logoutFn = () => {
  const router = useRouter();
  const logout = () => {
    router.replace('/')
    sessionStorage.clear()
  }
  return {logout}
}

//获取头像
function getAvatar() {
  const store = useStore()
  let imageUrl = ref('')
  if (!sessionStorage.getItem('avatar')){
    imageUrl.value = '@/assets/sculpture_boy.png'
  }else{
    imageUrl.value = store.getters.getAvatarUrl
  }
  return {imageUrl};
}

</script>

<style scoped lang="less">
.content {
  .avatar-wrap{
    background-color: #666666;
    width: 40px;
    height: 40px;
    cursor: pointer;
    img{
      width: 40px;
    }
  }
}
</style>
