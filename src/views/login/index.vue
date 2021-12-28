<template>
  <div class="login">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import service from "@/utils/request";
export default {
  name: "index",
  setup(){
    //测试接口
    // service({
    //   url:'/api/find',
    //   method: 'get'
    // }).then(res => {
    //   console.log(res);
    // })
    return{

    }
  }
}
</script>

<style scoped lang="less">
.login{
  width: 100%;
  height: 100vh;
  background: url("~@/assets/login_background.jpg");
  background-size: cover;
  overflow: hidden;
}

</style>
