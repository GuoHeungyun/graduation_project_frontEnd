<template>
<div class="ask-modal">
  <el-input
      type="text"
      v-model="title"
      placeholder="写下你的问题，准确地描述问题更容易得到答案"
      class="title"
  />
  <rich-text-editor
      :content="description"
      :placeHolder="placeHolder"
      ref="editor"
  >
  </rich-text-editor>
  <div class="footer">
    <el-button @click="context.emit('setAskModalVisible', false)">
      取消
    </el-button>
    <el-button type="primary" @click="confirmQuestion">确定</el-button>
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, Ref} from 'vue'
import { ElMessage } from 'element-plus'
import richTextEditor from "@/components/richTextEditor.vue";
import {useStore} from 'vuex'
import {questionDataType} from '@/ts/apiParamType.ts'
import {createQuestion} from '@/api/question.ts'

export default defineComponent({
  name: "askModal",
  props: ['oldItem'],
  emits: ['setAskModalVisible'],
  components: {
    richTextEditor,
  },
  setup(prop,context){
    const title = ref('')   //标题
    const description = ref('')   //详细描述
    const excerpt = ref('') //简略描述
    const placeHolder = ref('请输入问题背景、条件等详细信息（选填）')
    const editor = ref()
    const store = useStore();
    const userInfo = reactive(store.getters.getUserInfo);
    //点击了确认问题
    function confirmQuestion(){
      description.value = editor.value.getEditorContent()   //获取全部内容
      excerpt.value = editor.value.getText().slice(0, 100); //获取简略描述
      if (title.value){
        let questionData = reactive({
          title: title.value,
          description: description.value,
          creatorId: userInfo.userId,
          excerpt: excerpt.value,
        })
        uploadQuestion(questionData)
        editor.value.clearAll();
        title.value = ''
        description.value = ''
        context.emit('setAskModalVisible',false);
      }else {
        ElMessage({
          message: '请输入问题',
          type: 'warning',
        })
      }
    }

    //上传问题
    function uploadQuestion(questionData:questionDataType){
      createQuestion(questionData).then((res)=>{
        if(res.statusText==='OK'){
          ElMessage({
            message: '问题创建成功',
            type: 'success',
          })
        }else {
          ElMessage({
            message: '问题创建失败',
            type: 'warning',
          })
        }
      })
    }

    return {
      title,
      description,
      excerpt,
      placeHolder,
      context,
      editor,
      confirmQuestion,
    }
  }
})
</script>

<style scoped lang="less">
.ask-modal{
  .title{
    margin-bottom: 10px;
  }
  .footer{
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
