<template>
  <el-card class="blog">
    <div class="istop"></div>
    <main>
      <div class="title">{{ data.title }}</div>
      <div class="information" style="font-size: 14px;">
        <div style="color:#49a7de;margin-right: 20px;"> <el-icon>
            <Calendar />
          </el-icon>
          {{ timestampToTime(data.createtime) }}</div>
        <div style="color:#6d6a7c ;">
          <el-icon style="transform: translateY(2px);">
            <View />
          </el-icon>

          {{ data.view }}
        </div>
        <div> <el-icon style="transform: translateY(2px);margin-left: 20px;">
            <Folder />
          </el-icon>
          {{ data.category_id }}
        </div>
      </div>
      <div class="brief">
        <p v-html="data.content" style="padding: 0 15px;">

        </p>
      </div>
      <div class="line"></div>
      <div class="tag">
        <el-tag effect="dark" style="border: 0 !important;" :color="tag.color" v-for="tag in data.tag"
          :key="tag.tag_id">{{ tag.name }}</el-tag>
      </div>
      <div class="line"></div>
      <div class="comment">
        <div class="pushfirstcomment">
          <div class="title">发布评论</div>
          <el-card shadow="never" style="width: 100%;">
            <div style="margin-bottom: 10px;display:flex;"> <el-tooltip trigger="click" class="box-item" effect="dark"
                content="输入QQ号将自动拉取头像" placement="bottom-start">
                <el-input v-model="QQnumber" style="width: 30%;" placeholder="请输入qq号" :prefix-icon="User" />
              </el-tooltip>
              <el-input v-model="nickname" style="width: 30%;margin-left: 30px;" placeholder="请输入昵称"
                :prefix-icon="ChatLineRound" />
              <el-button style="margin-left: auto;" type="primary" @click="SendFirstComment()">发布评论</el-button>
            </div>

            <el-input v-model="firstcomment" :rows="5" type="textarea" placeholder="Please input" />
          </el-card>
        </div>
        <Comment :data="commentdata" @updatecomment="getCommetData" />
         <el-pagination style="margin-top: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
    			:current-page="queryInfo.page" :page-sizes="[10, 20, 30, 50]" :page-size="queryInfo.size" :total="total"
    			layout="total, sizes, prev, pager, next, jumper" background>
    		</el-pagination>
      </div>
    </main>
  </el-card>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue'
import { timestampToTime } from "@/utils/time"
import { useRoute } from "vue-router";
import { User, ChatLineRound } from '@element-plus/icons-vue'
import { getBlogByid } from "@/api/modules/blog";
import { getCommentbyId } from "@/api/modules/comment";
import { commenttype } from "@/api/interface/index";
import { FrstCommentCreate } from "@/api/modules/comment";

const route = useRoute()
let data = ref<any>({})
let total=ref(0)
let queryInfo = reactive({ page: 1, size: 5, blog_id: route.query.id as string });
let commentdata = ref<any>({})
const getData = async () => {
  let result = await getBlogByid({ id: route.query.id as string })
  data.value = result.data
  getCommetData()
}
const getCommetData = async () => {
  let commentresult = await getCommentbyId(queryInfo)
  commentdata.value = commentresult.data
  total.value= Number(commentdata.value.total)
}
const handleSizeChange = (newSize: number) => {
  queryInfo.size = newSize
  getData()
};
const handleCurrentChange = (newPage: number) => {
  queryInfo.page = newPage
  getData()
};

onMounted(() => {
  getData()

})
let QQnumber = ref("")
let firstcomment = ref("")
let nickname = ref("")
const SendFirstComment = async () => {
  if (QQnumber.value == "") {
    ElMessage.error("请填写qq号");
    return
  }
  else if (firstcomment.value == '') {
    ElMessage.error("请填写内容!")
    return
  }
  else if (nickname.value == '') {
    ElMessage.error("请填写昵称!")
    return
  }
  let data = {
    user_id: Number(QQnumber.value),
    content: firstcomment.value,
    nickname: nickname.value,
    blog_id: route.query.id as string
  }
  let result = await FrstCommentCreate(data)
  if (result.status == 200) {
    ElMessage.success(result.message)
    QQnumber.value = "";
    firstcomment.value = "";
    nickname.value = "";
  }

}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont';
  /* Project id 3946355 */
  src: url('//at.alicdn.com/t/c/font_3946355_ipsczeeiglq.woff2?t=1678718713551') format('woff2'),
    url('//at.alicdn.com/t/c/font_3946355_ipsczeeiglq.woff?t=1678718713551') format('woff'),
    url('//at.alicdn.com/t/c/font_3946355_ipsczeeiglq.ttf?t=1678718713551') format('truetype');
}

.blog {
  width: 100%;
  margin-bottom: 30px;
  position: relative;

  .istop {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    border: 23px solid transparent;
    border-top-color: #ff0000;
    border-right-color: #ff0000;
    font-family: iconfont;

    &::before {
      content: '\e632';
      position: absolute;
      top: -16px;
      left: 0;
      color: #fff;
    }

  }

  main {
    display: flex;
    flex-direction: column;

    .title {
      font-weight: 700;
      font-size: var(--h2-font-size);
    }

    .information {
      margin: var(--mb-0-5) 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .brief {
      width: 100%;

      p {
        word-wrap: break-word;
        word-break: break-all;
        text-align: justify;
      }
    }

    .img {
      max-width: 100%;
      margin-top: var(--mb-1);
      max-height: 400px;
      overflow: hidden;

      img {
        margin: 50% auto;
      }
    }

    .line {
      margin: var(--mb-2) 0 var(--mb-1);
      height: 1px;
      width: 100%;
      background-color: rgba($color: #000, $alpha: 0.1);
      // background-color: #fbfbfe;
    }

    .tag {
      margin-right: auto;
      color: #fff;

      .el-tag {
        margin: 0 var(--mb-0-25);
      }
    }

    .comment {
      width: 100%;

      .pushfirstcomment {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;

        .title {
          font-size: var(--h4-font-size);
          font-weight: normal;
          margin: 5px 0;
        }
      }
    }
  }

}
</style>