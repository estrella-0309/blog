<template>
  <div class="introduce">
    <div class="img"> <img src="http://localhost:3030/upload/416281087725637.jpg" alt=""></div>
    <div class="text">
      <div class="name">{{ person.name }}</div>
      <div class="memo" v-html="person.memo"></div>
      <div class="introduce-icon">
        <ul>
          <li>
            <a href="https://github.com/estrella-0309" target="_blank" class="github" style="padding-left:5px"> <i
                class="iconfont icon-github" style="font-size: 19px;"></i></a>
          </li>
          <li>
            <a href="https://gitee.com/strlla" target="_blank" class="gitee" style="padding-left:7px"> <i class="iconfont icon-gitee"></i></a>
          </li>
          <li>
            <!-- <a href="https://space.bilibili.com/178661728?spm_id_from=333.1007.0.0"  target="_blank"> <i class="iconfont icon-bzhan"></i></a> -->
            <a href="https://space.bilibili.com/178661728?spm_id_from=333.1007.0.0" class="bzhan"> <i
                class="iconfont icon-bzhan"></i></a>

          </li>
          <li>
            <a href="https://music.163.com/#/user/home?id=304067998" target="_blank" class="cloud"> <i
                class="iconfont icon-wangyiyun1"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
let person = {
  name: 'estrella',
  memo: '种一棵树最好的时间是十年前<br /><p style="text-align:center">其次是现在</p>'
}
</script>

<style lang="scss" scoped>
.introduce {
  width: 250px;
  // height: 610px;
  // background-color: red;
  border-radius: 30px;
  background-color: var(--nav-color);
  padding-bottom: 10px;

  // background-color: pink;
  .img {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    width: 100%;
    max-height: 270px;
    overflow: hidden;

    img {
      transform: translateY(-30%);
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .memo {
      font-size: var(--smaller-font-size);
    }

    .introduce-icon {
      ul {
        display: flex;
        color: #000;
        li {
          width: 30px;
          height: 30px;
          margin: 0 5px;
          background-color: #e0e1e2;
          border-radius: 100%;

          a {
            line-height: 30px;
            text-align: center;
            padding-left: 6px;

            i {
              font-size: 16px;

            }
          }

          .github {
            a {
              padding-left: 4px;

            }

            &:hover {
              color: #242a30;
            }
          }

          .gitee {
            a {
              padding-left: 7px;
            }

            &:hover {
              color: #da0315;
            }
          }

          .bzhan {

            &:hover {
              color: #00b3ef !important;
            }
          }

          .cloud {

            &:hover {
              color: #da0315;
            }
          }
        }
      }
    }
  }
}
</style>