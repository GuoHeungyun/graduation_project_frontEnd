<!--
修改信息页面右边表格
-->
<template>
<div class="content">
  <div class="field">
    <h3 class="field-label">昵称</h3>
    <div class="field-content">
      <span class="field-text">{{userInfo.username}}</span>
      <div class="modify-wrap">
        <div v-if="!showInput.username.show" class="btn-modify" @click="modifyClick(showInput.username)">修改</div>
        <div v-else>
          <el-input class="input-field" v-model="inputField"/>
          <el-button type="primary" @click="confirm('username')">确认</el-button>
          <el-button @click="cancel(showInput.username)">取消</el-button>
        </div>
      </div>
    </div>
  </div>
  <div class="field">
    <h3 class="field-label">个人简介</h3>
    <div class="field-content">
      <span class="field-text">{{userInfo.introduction}}</span>
      <div class="modify-wrap">
        <div v-if="!showInput.introduction.show" class="btn-modify" @click="modifyClick(showInput.introduction)">修改</div>
        <div v-else>
          <el-input class="input-field" v-model="inputField"/>
          <el-button type="primary" @click="confirm('introduction')">确认</el-button>
          <el-button @click="cancel(showInput.introduction)">取消</el-button>
        </div>
      </div>
    </div>
  </div>
  <div class="field">
    <h3 class="field-label">手机号</h3>
    <div class="field-content">
      <span class="field-text">{{userInfo.phone}}</span>
      <div class="modify-wrap">
        <div v-if="!showInput.phone.show" class="btn-modify" @click="modifyClick(showInput.phone)">修改</div>
        <div v-else>
          <el-input class="input-field" v-model="inputField"/>
          <el-button type="primary" @click="confirm('phone')">确认</el-button>
          <el-button @click="cancel(showInput.phone)">取消</el-button>
        </div>
      </div>
    </div>
  </div>
  <div class="field">
    <h3 class="field-label">密码</h3>
    <div class="field-content">
      <span class="field-text">{{userInfo.password}}</span>
      <div class="modify-wrap">
        <div v-if="!showInput.password.show" class="btn-modify" @click="modifyClick(showInput.password)">修改</div>
        <div v-else>
          <el-input class="input-field" v-model="inputField"/>
          <el-button type="primary" @click="confirm('password')">确认</el-button>
          <el-button @click="cancel(showInput.password)">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue'
import {useStore} from 'vuex'

import {updateUsername, updatePhone, updatePassword, updateIntroduction} from "@/api/login";
import {checkPhone} from '@/utils/tools.ts'
import { ElMessageBox, ElMessage } from 'element-plus'

export default defineComponent({
  name: "modifyRight",
  setup(){
    const store = useStore();
    const userInfo = reactive(store.getters.getUserInfo);
    let inputField = ref('');   //输入栏内容
    const showInput = reactive({     //控制每个栏的修改按钮切换
      username: {show:false},
      introduction: {show:false},
      phone: {show:false},
      password: {show:false}
    })
    const modifyClick = (type:any) => {   //根据输入，切换该栏的修改按钮
      type.show = !type.show;
    }
    //根据确认的栏名修改用户信息
    const confirm = (property:string) => {
      if (property == 'username'){
        userInfo.username = inputField.value;
        showInput.username.show = false;
        store.commit('setUsername', userInfo.username);
        updateUsername({username:userInfo.username, phone: userInfo.phone});
        inputField.value = '';
      }else if (property == 'password'){
        userInfo.password = inputField.value;
        showInput.password.show = false;
        store.commit('setPassword', userInfo.password);
        updatePassword({phone: userInfo.phone, password: userInfo.password});
        inputField.value = '';
      }else if (property == 'phone'){
        let temp = ref(userInfo.phone);
        if(checkPhone(inputField.value)){
          userInfo.phone = inputField.value;
          showInput.phone.show = false;
          store.commit('setPhone', userInfo.phone);
          updatePhone({oldPhone:temp.value, newPhone:userInfo.phone});
          inputField.value = '';
        }else{
          ElMessageBox.alert('输入手机号码格式不正确', 'Warning', {
            confirmButtonText: 'OK',
          })
        }
      }else if (property == 'introduction'){
        userInfo.introduction = inputField.value;
        showInput.introduction.show = false;
        store.commit('setIntroduction', userInfo.introduction);
        updateIntroduction({phone:userInfo.phone, introduction:userInfo.introduction});
        inputField.value = '';
      }
    }
    const cancel = (type:any) => {
      type.show = !type.show;
    }
    return {
      userInfo,
      showInput,
      inputField,
      modifyClick,
      confirm,
      cancel
    }
  }
})
</script>

<style scoped lang="less">
.content {
 .field {
   padding: 30px 0;
   border-bottom: 1px solid #ebebeb;
   display: flex;
   .field-label {
     line-height: 36px;
     color: #444;
     width: 140px;
   }
   .field-content {
     font-size: 15px;
     color: #121212;
     padding: 0 64px 0 0;
     line-height: 36px;
     display: flex;
     align-items: center;
     .field-text{
       font-size: 15px;
     }
     .modify-wrap{
       padding: 0 18px;
       .btn-modify{
         color: #175199;
         cursor: pointer;
       }
       .input-field{
         margin-bottom:10px;
       }
     }
   }
 }
}
</style>
