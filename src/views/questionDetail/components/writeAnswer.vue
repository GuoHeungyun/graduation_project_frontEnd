<template>
<div class="write-answer" v-show="isShowWriteAnswer">
  <rich-text-editor
      placeHolder="写回答..."
      :menus="menus"
      ref="editor"
  >
  </rich-text-editor>
  <div class="footer">
    <el-button @click="isShowWriteAnswer = false">取消</el-button>
    <el-button type="primary" @click="confirmQuestion">发布回答</el-button>
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent, ref, Ref, reactive} from 'vue'
import richTextEditor from "@/components/richTextEditor.vue";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
import {answerDataType} from "@/ts/apiParamType.ts"
import { createAnswer } from '@/api/answer.ts'
import {useRoute} from "vue-router";

export default defineComponent({
  name: "writeAnswer",
  components: {
    richTextEditor,
  },
  setup(){
    const menus = [ 'head',
      'bold',
      'fontSize',
      'fontName',
      'italic',
      'underline',
      'strikeThrough',
      'indent',
      'lineHeight',
      'foreColor',
      'backColor',
      'link',
      'list',
      'todo',
      'justify',
      'quote',
      'emoticon',
      'image',
      'table',
      'code',
      'splitLine',
    ]  //富文本菜单设置
    const isShowWriteAnswer = ref(false);  //是否显示写作区域
    const editor:Ref = ref()
    const content = ref() //回答内容
    const excerpt = ref() //简略描述
    const store = useStore();
    const route = useRoute();

    function confirmQuestion(){
      content.value = editor.value.getEditorContent()   //获取全部内容
      if(content.value){
        excerpt.value = editor.value.getText().slice(0, 100); //获取简略描述
        const questionId = route.params.questionId.toString()
        let userId = store.getters.getUserInfo.userId
        let answerData = reactive({
          content: content.value,
          excerpt: excerpt.value,
          creatorId: userId,
          targetId: questionId
        })
        uploadAnswer(answerData);
        editor.value.clearAll();
        content.value = '';
      }else{
        ElMessage({
          message: '请填写回答',
          type: 'warning',
        })
      }
    }
    function uploadAnswer(answerData:answerDataType){
      createAnswer(answerData).then(res=>{
        if(res.statusText==='OK'){
          isShowWriteAnswer.value = false
          ElMessage({
            message: '回答发布成功',
            type: 'success',
          })
        }else {
          ElMessage({
            message: '回答发布失败',
            type: 'warning',
          })
        }
      })
    }
    return {
      menus,
      editor,
      isShowWriteAnswer,
      confirmQuestion,
    }
  }
})
</script>

<style scoped lang="less">
.write-answer{
  .footer{
    box-sizing: border-box;
    min-width: 0px;
    width: 100%;
    height: 52px;
    -webkit-box-align: center;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    margin: 0px auto;
    background: #FFFFFF;
    border-bottom: 1px solid rgb(235, 235, 235);
    justify-content: flex-end;
  }
}
</style>
