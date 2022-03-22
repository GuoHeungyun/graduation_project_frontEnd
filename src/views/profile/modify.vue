<template>
  <div class="modify-content">
    <div class="left">
      <el-upload
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          action="http://localhost:8088/api/people/upload"
          :data="userdata"
      >
        <div class="avatar-wrap">
          <img :src="imageUrl" alt="">
          <div class="text">修改我的头像</div>
        </div>
      </el-upload>
    </div>
    <div class="right">
      <modify-right></modify-right>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive} from 'vue'
import { ElMessage } from 'element-plus'
import {useStore} from 'vuex'
import {serverLocation} from "@/api/serverLocation.ts"

import modifyRight from './components/modifyRight.vue'

import type {
  UploadFile,
  ElUploadProgressEvent,
  ElFile,
} from 'element-plus/es/components/upload/src/upload.type'

export default defineComponent({
  name: "modify",
  components: {
    modifyRight
  },
  setup() {
    const store = useStore();
    const imageUrl = ref(store.getters.getAvatarUrl);
    //手机号，旧头像作为修改头像的其中参数
    const userdata = ref({
      phone:sessionStorage.getItem('phone'),
      avatar:store.getters.getAvatarPath
    });

    if (!sessionStorage.getItem('avatar')){
      imageUrl.value = '@/assets/sculpture_boy.png'
    }else{
      imageUrl.value = store.getters.getAvatarUrl
    }

    //修改头像的两个钩子函数
    const handleAvatarSuccess = (res: ElUploadProgressEvent, file: UploadFile) => {
      // imageUrl.value = URL.createObjectURL(file.raw)
      imageUrl.value = serverLocation +res;
      store.commit('setAvatarUrl',res)
      //换头像后刷新页面
      location.reload();
    }
    const beforeAvatarUpload = (file: ElFile) => {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        ElMessage.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    }

    return {
      imageUrl,
      userdata,
      handleAvatarSuccess,
      beforeAvatarUpload
    }
  }
})
</script>

<style scoped lang="less">
.modify-content{
  display: flex;

  .left{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar-wrap{
      width: 168px;
      height: 168px;
      background-color: #a6a6a6;
      position: relative;
      img{
        width: 168px;
      }
      .text{
        position: absolute;
        color: #666666;
        font-size: 15px;
        width:100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-weight: bold;
        -webkit-text-stroke: 0.1px #fff;
      }
    }
  }
  .right{
    flex: 3;
    padding: 20px;
  }
}
</style>
