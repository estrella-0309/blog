<template>
  <el-card class="blog">
    <div class="istop" v-if="data.istop"></div>
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

      </div>
      <div class="brief">
        <p v-html="data.introduce">

        </p>
      </div>
      <div class="img">
        <p> <img style="max-width: 100%; margin: 0 auto;" :src="data.first_pic" alt="">
        </p>
      </div>
      <div class="line"></div>
      <div class="tag">
        <el-tag>Tag 1</el-tag>
        <el-tag>Tag 1</el-tag>
        <el-tag>Tag 1</el-tag>

      </div>



    </main>
  </el-card>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { timestampToTime } from "@/utils/time"
const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  }
})
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
  }

}
</style>