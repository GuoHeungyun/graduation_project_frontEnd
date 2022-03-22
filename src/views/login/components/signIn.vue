<template>
  <div class="center">
    <h1>乐 享</h1>
    <form method="post">
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
      <router-link :to="{name: 'findback'}" custom v-slot="{navigate}">
        <div class="pass" @click="navigate" @keypress.enter="navigate" role="link">忘记密码?</div>
      </router-link>
      <input type="submit" value="登录" @click="signInClick">
      <div class="signup_link">
        还没账号?
        <router-link :to="{name:'signup'}">点击注册</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue';
// import * as all from "@/api/login";
import {findUser} from "@/api/login";
import {ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";
import { useStore } from 'vuex'

export default defineComponent({
  name: "signIn",
  setup(){
    const router = useRouter();
    const store = useStore()
    const userData = reactive({
      userId: '',
      username: '',
      phone: '',
      password: '',
      avatar: '',
      introduction: ''
    })
    //点击了登录按钮，正确的话保存用户信息到vuex
    const signInClick = (event:PointerEvent) =>{
      event.preventDefault();
      findUser(userData).then(res =>{
        if (res.data.user[0][0].user_id){
          sessionStorage.setItem('username', res.data.user[0][0].username)
          sessionStorage.setItem('phone', res.data.user[0][0].phone)
          sessionStorage.setItem('password', res.data.user[0][0].password)
          sessionStorage.setItem('avatar', res.data.user[0][0].user_avatar)
          userData.username = res.data.user[0][0].username;
          userData.phone = res.data.user[0][0].phone;
          userData.password = res.data.user[0][0].password;
          userData.avatar = res.data.user[0][0].user_avatar;
          userData.introduction = res.data.user[0][0].introduction;
          userData.userId = res.data.user[0][0].user_id;
          store.commit('setUserInfo',userData);
          router.replace('/lexiang');
        }else {
          throw new Error;
        }
      }).catch(()=>{
        ElMessageBox.alert('输入信息有误!', 'Warning', {
          confirmButtonText: 'OK',
        })
      })
    }
    return{
      userData,
      signInClick
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
