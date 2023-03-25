<template>
  <div class="commentList" v-for="i in 3" :key="i">
    <div class="first">
      <el-avatar :src="`http://q2.qlogo.cn/headimg_dl?dst_uin=${QQnumber}&spec=1`" />
      <div class="information" style="padding-left: 5px;">

        <div class="content"><span>estrella</span>:内容</div>
        <div class="createtime" style="">2023-03-09 18:04</div>
      </div>
      <div class="box" style="margin-left: auto;margin-right: var(--mb-1);">
        <el-icon  style="transform: translateY(3px);">
          <ChatLineSquare />
        </el-icon>
        <i class="iconfont icon-icon" style="margin-left: var(--mb-0-5);font-size: 18px;"></i>
      </div>
    </div>
    <div class="second">
      <div v-for="i in 3" :key="i">
        <el-card shadow="never" style="width: 80%; margin: var(--mb-1);">
          <div style=" display: flex;align-items: flex-end;">
            <el-avatar :src="`http://q2.qlogo.cn/headimg_dl?dst_uin=${QQnumber}&spec=1`" />
            <div class="information" style="padding-left: 5px;">
              <div class="content"><span>estrella</span>:内容</div>
              <div class="createtime">2023-03-09 18:04</div>
            </div>
            <div class="box" style="margin-left: auto;margin-right: var(--mb-1);">
              <el-icon style="transform: translateY(3px);" >
                <ChatLineSquare />
              </el-icon>
              <i class="iconfont icon-icon" style="margin-left: var(--mb-0-5);font-size: 18px;"></i>
            </div>
          </div>

        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { ChatLineSquare } from '@element-plus/icons-vue'
const QQnumber = 444186682

</script>

<style lang="scss" scoped>
.commentList {
  padding: 7px 0;
  // background-color: pink;
  padding-left: 14px;

  .first {
    display: flex;
    align-items: flex-end;
  }

  .content {
    span {
      font-weight: 600;
    }
  }
  .createtime{
    font-size: 12px;
    color: #939393;
  }
  .second {
    margin: 6px 15px 2px 44px;
    position: relative;

    // background-color: red;
    &::before {
      content: "";
      position: absolute;
      top: 4px;
      bottom: 4px;
      left: 0;
      border-left: 2px solid var(--w-card-border-color);
    }
  }
}</style>