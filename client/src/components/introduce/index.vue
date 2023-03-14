<template>
  <div class="introduce">
    <div class="img"> <img src="http://8.130.96.111:3030/upload/413175067664453.jpg" alt=""></div>
    <div class="text">
      <div class="name">{{ person.name }}</div>
      <div class="memo" v-html="person.memo"></div>
      <div class="introduce-icon">
        <ul>
          <li>
            <a> <i class="iconfont icon-github"></i></a>

          </li>
          <li>
            <a> <i class="iconfont icon-gitee"></i></a>


          </li>
          <li>
            <a> <i class="iconfont icon-bzhan"></i></a>


          </li>
          <li>
            <a> <i class="iconfont icon-wangyiyun1"></i></a>


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

          &:nth-child(1) {
            a {
              padding-left: 5px;

              i {
                font-size: 20px;
              }
            }

            &:hover {
              color: #242a30;
            }
          }

          &:nth-child(2) {
            a {
              padding-left: 7px;
            }

            &:hover {
              color: #da0315;
            }
          }

          &:nth-child(3) {

            &:hover {
              color: #00b3ef;
            }
          }
          &:nth-child(4) {

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