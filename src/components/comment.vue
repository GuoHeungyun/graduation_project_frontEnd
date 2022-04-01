<template>
<div class="comment" >
  <div class="comment-body">
    <div class="author-title" v-for="(item,i) in comments" :key="i">
      <div class="comment-box">
        <div class="left-box">
          <el-avatar class="header-img" :size="40" :src="item.headImg"></el-avatar>
        </div>
        <div class="right-box">
          <div class="author-info">
            <span class="author-name">{{item.name}}</span>
            <span class="author-time">{{item.time}}</span>
          </div>
          <div class="talk-box">
            <p>
              <span class="reply">{{item.comment}}</span>
            </p>
          </div>
          <div class="icon-btn">
            点赞{{item.like}}
            <span>评论{{item.reply.length}}</span>
          </div>
          <div v-for="(reply,j) in item.reply" :key="j" class="author-title">
            <div class="reply-box">
              <div class="left-box">
                <el-avatar class="header-img" :size="40" :src="reply.fromHeadImg"></el-avatar>
              </div>
              <div class="right-box">
                <div class="author-info">
                  <span class="author-name">{{reply.from}}</span>
                  <span class="author-time">{{reply.time}}</span>
                </div>

                <div class="talk-box">
                  <p>
                    <span style="color: rgb(133, 144, 166);">回复</span> {{reply.to}}:
                    <span class="reply">{{reply.comment}}</span>
                  </p>
                </div>
                <div class="icon-btn">
                  点赞{{reply.like}}
                </div>
              </div>
            </div>
          </div>
          <div class="my-reply" v-show="item.inputShow">
            <div class="img-wrap">
              <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
            </div>
            <el-input
                placeholder="请输入内容..."
                style="width: 100%;margin-right: 16px;"
            >
            </el-input>
            <el-button type="primary" class="btn-ask">
              发布
            </el-button>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div class="comment-footer">
    <div class="footer-wrap">
      <el-input
          placeholder="请输入内容..."
          style="width: 100%;margin-right: 16px;"
          v-model="commentText"
      >
      </el-input>
      <el-button type="primary" class="btn-ask" @click="confirmComment">
        发布
      </el-button>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent, ref, Ref, reactive} from 'vue'
import {useStore} from "vuex";
import {createComment} from '@/api/comment.ts'
import { textType } from '@/ts/enumType.ts'

export default defineComponent({
  name: "comment",
  props: ['targetType','targetId'],
  setup(prop){
    const store = useStore()
    const userId = ref(store.getters.getUserInfo.userId)
    const commentParam = reactive({
      creatorId: userId.value,
      targetId: '',
      content: '',
      type: textType.comment,
      targetType: '',
    })
    const commentText = ref('')
    let btnShow =  ref(false)
    let index = ref('0')
    let replyComment = ref('')
    let myName = ref('Lana Del Rey')
    let myHeader = ref('https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg')
    let myId = ref(19870621)
    let to = ref('')
    let toId = ref(-1)
    let comments = [
      {
        name:'Lana Del Rey',
        id:19870621,
        headImg:'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
        comment:'我发布一张新专辑Norman Fucking Rockwell,大家快来听啊',
        time:'2019年9月16日 16:43',
        like:15,
        reply:[
          {
            from:'Taylor Swift',
            fromId:19891221,
            fromHeadImg:'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
            to:'Lana Del Rey',
            toId:19870621,
            comment:'我很喜欢你的新专辑！！',
            time:'2019年9月16日 17:43',
            commentNum:1,
            like:15,
          },
          {
            from:'Ariana Grande',
            fromId:1123,
            fromHeadImg:'https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg',
            to:'Lana Del Rey',
            toId:19870621,
            comment:'别忘记宣传我们的合作单曲啊',
            time:'2019年9月16日 18:43',
            commentNum:0,
            like:5,
          },
        ]
      },
      {
        name:'Taylor Swift',
        id:19891221,
        headImg:'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
        comment:'我发行了我的新专辑Lover',
        time:'2019年9月16日 19:43',
        like:5,
        reply:[
          {
            from:'Lana Del Rey',
            fromId:19870621,
            fromHeadImg:'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
            to:'Taylor Swift',
            toId:19891221,
            comment:'新专辑和speak now 一样棒！',
            time:'2019年9月16日 20:43',
            commentNum:25,
            like:5,
          }
        ]
      },
      {
        name:'Norman Fucking Rockwell',
        id:20190830,
        headImg:'https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg',
        comment:'Plz buy Norman Fucking Rockwell on everywhere',
        time:'2019年9月16日 18:43',
        like:5,
        reply:[]
      },
    ]
    function confirmComment(){
      commentParam.targetId = prop.targetId
      commentParam.targetType = prop.targetType
      commentParam.content = commentText.value
      createComment(commentParam).then(res => {
        console.log(res);
      })
    }
    return{
      btnShow,
      index,
      replyComment,
      myName,
      myHeader,
      myId,
      to,
      toId,
      comments,
      commentText,
      confirmComment,
    }
  },
})
</script>

<style scoped lang="less">
.comment{
  padding: 24px;
  box-shadow: rgba(18, 18, 18, 0.1) 0px 1px 3px 0px;
  border: 1px solid rgb(235, 235, 235);
  .comment-body{
    height: 600px;
    overflow: auto;
  }
  .comment-footer{
    margin-top: 24px;
    padding: 10px 16px;
    border-top: 1px solid rgb(235, 235, 235);
    width: 100%;
    .footer-wrap{
      display: flex;
    }
  }
}

.comment-box{
  .left-box{
    width: 60px;
    display: flex;
    justify-content: center;
  }
  .right-box{
    width: 100%;
    .my-reply{
      display: flex;
      align-items: center;
      .img-wrap{
        width: 60px;
      }
    }
  }
}

.reply-box{
  //border-bottom: 1px solid rgba(178,186,194,0.3);
}

.comment-box, .reply-box{
  font-size: @normal-font-size;
  color:rgb(18, 18, 18);
  display: flex;
  .author-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    .author-name{
      font-weight: 500;
    }
    .author-time{
      color: rgb(133, 144, 166);
      font-size: @small-font-size;
    }
  }
  .right-box{
    .icon-btn{
      padding: 12px 0;
      color: rgb(118, 131, 155);
      font-size: @small-font-size;
      border-bottom: 1px solid rgba(178,186,194,0.3);
      margin-bottom: 8px;
      cursor: pointer;
    }
  }
}
</style>
