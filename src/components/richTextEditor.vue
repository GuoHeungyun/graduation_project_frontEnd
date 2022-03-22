<template>
<div class="rich-text-editor">

</div>
</template>

<script lang="ts">
import {defineComponent,onMounted,ref, PropType} from 'vue';
import E from "wangeditor"

interface propsType{
  content:string,
  placeHolder: string,
  menus: Array<any>,
}

export default defineComponent({
  name: "richTextEditor",
  props: {
    content: {
      type: String,
      default: "",
    },
    placeHolder:{
      type: String,
      default: ""
    },
    menus: {
      type: Array as PropType<Array<any>>,
      default: ()=> ['list', 'justify', 'quote', 'image', 'splitLine',]
    },
  },
  setup(prop:propsType,context){
    let editor:any
    onMounted(()=>{
      editor = new E(".rich-text-editor")
      editor.config.height = 300
      editor.config.placeholder = prop.placeHolder
      //配置显示菜单
      if (prop.menus){
        editor.config.menus = prop.menus
      }else{
        editor.config.menus = [
          'list',
          'justify',
          'quote',
          'image',
          'splitLine',
        ]
      }
      //限制上传图片的数量
      editor.config.uploadImgMaxLength = 1;
      // 配置 server 接口地址
      editor.config.uploadImgServer = '/api/upload_img'
      //关闭通过链接上传图片
      editor.config.showLinkImg = false;
      //是否显示全屏按钮
      editor.config.showFullScreen = false
      //如果填写过，但是没提交，那就放进去
      editor.txt.append(prop.content) //这句话会报警告，不知道为啥
      editor.create()
    })
    //获取编辑器里面的html内容
    function getEditorContent(){
      return editor.txt.html();
    }
    //清空所有内容
    function clearAll(){
      editor.txt.clear()
    }
    //获取文本内容
    function getText(){
      return editor.txt.text()
    }
    return {
      getEditorContent,
      clearAll,
      getText,
    }
  }
})
</script>

<style scoped lang="less">
.rich-text-editor{

}
</style>
