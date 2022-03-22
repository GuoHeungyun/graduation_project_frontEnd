<template>
  <div class="card-content">
    <h2 class="title">我是标题</h2>
    <div class="content-wrap">
      <div class="answer">
        <div class="read-more" ref="text">
          所有心理疾病的源头，都是恐惧。超长预警！超长预警！超长预警！（全文两万字看完大概需要半个小时，建议收藏慢慢看，另外：你们所有人的点赞评论我都会看，我的私信是开放的，有疑问可以提出）因为害怕，就试图使用过分的思虑、多余的念头、焦虑的情绪来对抗那未知的恐惧。这是你的补偿心理在作怪。虽然理性让你知道想这么多、情绪这么紧张于事无补，甚至还有负作用。但你却偏偏不肯放过自己。写的那么大的「问题」二字摆在那里，怎么可能无动于衷？怎么可以什么都不做？不紧张才怪！你看，是你自己【说服】自己想太多的。你太害怕，所以你不得不用思虑和焦躁填补谜底揭开前的那份未知和那段空白。这样在最坏的结果出现时，至少为之烦恼过、为之焦虑过，自己心里面大概会好过一点，坦然一点。但这种精神补偿的症结还是惧怕。如果一开始无论什么结果、什么境遇都可以接受，又何需精神补偿？但是说起来容易，做起来难啊。因为“惧怕”这个东西可以说是整个世界合谋联手打造、贩卖得最好的产品。你可以想想，市场上可以买到的绝大多数东西，哪一样背后驱动你购买的不是“惧怕”？整个世界的经济命脉掌握在营造惧怕上。我们从小也被灌输了惧怕的思维方式。“再不好好吃饭就不给你看电视” “再迟到就不要去了” “再考0分就打断你的腿”……从小到大，哪一样推动我们向前走的动力不是来源于惧怕？几乎没有。
        </div>
      </div>
      <div class="operation">
        <div>点赞 <span>5</span></div>
        <div class="comment">评论</div>
        <div class="collect">收藏</div>
        <div v-show="isOverflow">展开</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted, Ref} from 'vue'

export default defineComponent({
  name: "questionCard",
  setup(){
    const title = ref('')
    let isOverflow = ref(false)
    const text = ref()
    onMounted(()=>{
      judge(text.value, isOverflow);
    })
    return {
      title,
      text,
      isOverflow
    }
  }
})

//判断文本内容是否溢出，textNode:dom元素
function judge(textNode:any,isOverflow:Ref) {
  let parentHeight = textNode.parentNode.offsetHeight;
  let contentHeight = textNode.offsetHeight;
  if(contentHeight > parentHeight){
    isOverflow.value = true
  }
}
</script>

<style scoped lang="less">
.card-content{
  padding: 20px;
  background-color: #fff;
  .title{
    font-size: 18px;
    font-weight: 600;
  }
  .content-wrap{
    .answer{
      padding-top: 10px;
      height: 105px;
      overflow: hidden;
      .read-more{
        //overflow: hidden;
      }
    }
    .operation{
      display: flex;
      height: 40px;
      align-items: flex-end;
      div{
        color: #8590a6;
        cursor: pointer;
      }
      .comment, .collect{
        margin-left: 15px;
      }
    }
  }
}
</style>
