<template>
  <div class="center">
    <h1>账号注册</h1>
    <form method="post">
      <div class="txt_field">
        <input type="text" required v-model="userData.username">
        <span></span>
        <label>昵称</label>
      </div>
      <div class="txt_field">
        <input type="text" required v-model="userData.phone">
        <span></span>
        <label>手机号</label>
      </div>
      <div class="txt_field">
        <input type="password" required v-model="userData.password">
        <span></span>
        <label>密码</label>
      </div>
      <input type="submit" value="确认注册" @click="signUpClick">
      <div class="signup_link">
        <router-link :to="{name:'signin'}">返回</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue';
import {insertUser} from '@/api/login';
import {useRouter} from "vue-router";
import {checkPhone} from '@/utils/tools.ts'

import { ElMessageBox, ElMessage } from 'element-plus'

export default defineComponent({
  name: "signUp",
  components: {

  },
  setup(){
    const router = useRouter();
    const userData = reactive({
      username: '',
      phone: '',
      password: ''
    })
    const signUpClick = (e:PointerEvent) => {
      e.preventDefault();
      if (!checkPhone(userData.phone)){
        ElMessageBox.alert('输入手机号码格式不正确', 'Warning', {
          confirmButtonText: 'OK',
        })
      }else{
        insertUser(userData).then((res) => {
          ElMessageBox.alert('注册成功', 'Tips', {
            confirmButtonText: 'OK',
            callback: () => {
              router.replace('/');
            },
          })
        })
      }
    }
    return{
      userData,
      signUpClick,
    }
  }
})
</script>

<style scoped lang="less">
.center{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: white;
  border-radius: 10px;
  box-shadow: 10px 10px 15px rgba(0,0,0,0.05);
  h1{
    text-align: center;
    padding: 20px 0;
    border-bottom: 1px solid silver;
  }
  form{
    padding: 0 40px;
    box-sizing: border-box;
    .txt_field{
      position: relative;
      border-bottom: 2px solid #adadad;
      margin: 30px 0;
      input{
        width: 100%;
        padding: 0 5px;
        height: 40px;
        font-size: 16px;
        border: none;
        background: none;
        outline: none;
      }
    }
  }
}
.txt_field label{
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: .5s;
}
.txt_field span::before{
  content: '';
  position: absolute;
  top: 40px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #2691d9;
  transition: .5s;
}
.txt_field input:focus ~ label,
.txt_field input:valid ~ label{
  top: -5px;
  color: #2691d9;
}
.txt_field input:focus ~ span::before,
.txt_field input:valid ~ span::before{
  width: 100%;
}
.pass{
  margin: -5px 0 20px 5px;
  color: #a6a6a6;
  cursor: pointer;
}
.pass:hover{
  text-decoration: underline;
}
input[type="submit"]{
  width: 100%;
  height: 50px;
  border: 1px solid;
  background: #2691d9;
  border-radius: 25px;
  font-size: 18px;
  color: #e9f4fb;
  font-weight: 700;
  cursor: pointer;
  outline: none;
}
input[type="submit"]:hover{
  border-color: #2691d9;
  transition: .5s;
}
.signup_link{
  margin: 30px 0;
  text-align: center;
  font-size: 16px;
  color: #666666;
}
.signup_link a{
  color: #2691d9;
  text-decoration: none;
}
.signup_link a:hover{
  text-decoration: underline;
}
</style>
