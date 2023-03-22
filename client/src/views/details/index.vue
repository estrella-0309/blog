<template>
  <el-card class="blog">
    <main>
      <div class="title">111</div>
      <div class="information">123123</div>
      <div class="brief">
        <!-- <p>
          sakldjfasklfjklasfjlkjfsklfjklasdfjjfasklfjasklfasklfjsklfjklasfjklasjfklasfjklasjdflkfffkfkfkfsdfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakfkfkfkfkf
        </p> -->
        <p>
          几啊时空裂缝那是考虑到发斯蒂芬就上课了放假拉速度快放假时空裂缝加速度快蓝飞机as考虑到放进去为我of你看龙卷风纳斯达克浪费加速度快蓝飞机萨迪克蓝飞机萨迪克蓝飞机萨迪克蓝飞机萨迪克蓝飞机未复工你今晚看你的时空裂缝教师端卡莉法算法那阿萨德卡莉法阿斯拉达咖啡机阿萨德卡莉法你
        </p>
      </div>
      <div class="img">
        <p> <img style="max-width: 100%; margin: 0 auto;" src="http://localhost:3030/upload/416271206461509.png"
            alt=""></p>
      </div>
      <el-divider />
      <div class="tag">
        <el-tag>Tag 1</el-tag>
        <el-tag>Tag 1</el-tag>
        <el-tag>Tag 1</el-tag>
      </div>
      <el-divider />
      <div class="comment">
        <div class="pushfirstcomment">
          <div class="title">发布评论</div>
          <el-card shadow="never" style="width: 100%;">
            <div style="margin-bottom: 10px;display:flex;"> <el-tooltip trigger="click" class="box-item" effect="dark"
                content="输入QQ号将自动拉取昵称和头像" placement="bottom-start">
                <el-input v-model="QQnumber" style="width: 30%;" placeholder="请输入qq号" :prefix-icon="User" />
              </el-tooltip>
              <el-button style="margin-left: auto;" type="primary">发布评论</el-button>
            </div>

            <el-input v-model="firstcomment" :rows="5" type="textarea" placeholder="Please input" />
          </el-card>

        </div>
        <h3 style="margin-top: var(--mb-1);font-weight: normal;">评论 |共计10条评论</h3>
        <el-divider />
        <Comment />
      </div>
    </main>


  </el-card>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { User } from '@element-plus/icons-vue'
const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  }
})
let QQnumber = ""
let firstcomment = ""
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

  main {
    display: flex;
    flex-direction: column;

    .title {
      font-weight: 700;
      font-size: var(--h2-font-size);
    }

    .information {
      margin: var(--mb-0-5) 0;
    }

    .brief {
      width: 100%;

      p {
        text-indent: 20px;
        word-wrap: break-word;
        word-break: break-all;
      }
    }

    .img {
      max-width: 100%;
      margin-top: var(--mb-1);
      max-height: 400px;
      overflow: hidden;

      img {
        transform: translateY(-50%);
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