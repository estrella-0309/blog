<template>
  <el-card class="blog">

    <div class="istop"></div>
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
        <p> <img style="max-width: 100%; margin: 0 auto;" src="http://8.130.96.111:3030/upload/413175067664453.jpg"
            alt=""></p>
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
      .el-tag{
        margin:0 var(--mb-0-25);
      }
    }
  }

}
</style>