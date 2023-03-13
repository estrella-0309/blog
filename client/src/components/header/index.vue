<template>
  <header class="header scroll-header" id="header">
    <nav class="nav container">
      <div class="nav__left">
        <a href="#" class="nav__logo">Estrella's Blog</a>

        <div class="nav__menu" id="nav-menu" :class="dropDown ? 'show-menu' : ' '">
          <ul class="nav__list grid">
            <li class="nav__item">
              <a class="nav__link">
                <i class="iconfont icon-home"></i>
                <p>主页</p>
              </a>
            </li>

            <li class="nav__item">
              <a class="nav__link">
                <i class="iconfont icon-fenlei"></i>
                <p>分类</p>
              </a>
            </li>
            <li class="nav__item">
              <a class="nav__link">
                <i class="iconfont icon-shijianxian"></i>
                <p>归档</p>
              </a>
            </li>
            <li class="nav__item">
              <a class="nav__link">
                <i class="iconfont icon-guanyuwomen1"></i>
                <p>关于我</p>
              </a>
            </li>
          </ul>

          <div class="nav__close" @click="closedropDown()"><i class="iconfont icon-cuowu "></i> </div>
        </div>
      </div>

      <div class="nav__btns">
        <i class="iconfont change-theme" :class="theme === 'lighting' ? ' icon-dark' : 'icon-light'" id="nav-close"
          @click="changetheme()"></i>

        <div class="nav__toggle" id="nav-toggle" @click="ShowMenu()">
          <i class="iconfont icon-jiugongge"></i>

        </div>
        <div class="search" style="width:50%">

          <i class="iconfont icon-sousuo" v-show="taggleSearchAndIcon" @click="ChangeIconToSearch()"></i>
          <n-input round placeholder="搜索" id="searchInput" v-model="searchText" @blur="ChangeSeachToIcon()"
            v-show="!taggleSearchAndIcon">
            <template #suffix>
              <i class="iconfont icon-sousuo"></i>
            </template>
          </n-input>
          <!-- <input type="text" placeholder="搜索" id="searchInput" v-model="searchText" @blur="ChangeSeachToIcon()"
            v-show="!taggleSearchAndIcon"> -->
        </div>
      </div>

    </nav>
  </header>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted, nextTick } from 'vue'

//主题
let theme = ref('lighting')
const changetheme = () => {
  if (theme.value === 'lighting') {
    theme.value = 'dark'
    document.getElementsByTagName("body")[0].className = "dark-theme";
  }
  else {
    theme.value = 'lighting'
    document.getElementsByTagName("body")[0].className = "";
  }
}

//下拉菜单
let dropDown = ref(false)
const ShowMenu = () => {
  dropDown.value = true
}
const closedropDown = () => {
  dropDown.value = false;
};

//搜索模块
const searchText = ref("");
const taggleSearchAndIcon = ref(true)
const searchInput = ref(null)
const ChangeSeachToIcon = () => {
  taggleSearchAndIcon.value = true

}

const ChangeIconToSearch = () => {
  taggleSearchAndIcon.value = false
  let inputbox = document.getElementById("searchInput")
  nextTick(() => {
    let input = inputbox?.querySelector("input") as HTMLElement

    input.focus()
  })
}




</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-fixed);
  background-color: var(--body-color);
}



.nav {
  width: 100%;
  height: var(--header-height);
  background-color: var(--nav-color);

  .nav__logo {
    color: var(--first-color);
    font-size: var(--big-font-size);
    // margin-left: var(--mb-5);
  }

  .nav__btns {
    margin-right: var(--mb-0-5);
    height: 100%;
    display: flex;
    align-items: center;
    // font-size: 1.25rem;

    .change-theme {
      color: var(--title-color);
      margin-right: var(--mb-1);
      cursor: pointer;
    }

    .search {
      order: -1;
      display: flex;
      justify-content: flex-end;
      color: var(--title-color);

      &>i {
        margin-right: var(--mb-1);
      }
    }

    .nav__toggle {
      cursor: pointer;
      margin-right: var(--mb-1);
      font-weight: var(--font-medium);
      color: var(--title-color);

      &:hover {
        color: var(--first-color);
      }
    }
  }
}

.grid {
  display: grid;
  gap: 1.5rem;
}

.nav__close {
  position: absolute;
  right: 1.3rem;
  bottom: .5rem;
  font-size: 1rem;
  cursor: pointer;
}



.nav__list {
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  .nav__item {
    align-items: center;
  }

  .nav__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: var(--small-font-size);
    font-weight: var(--font-medium);
    color: var(--title-color);
    cursor: pointer;

    &:hover {
      color: var(--first-color);
    }

    .iconfont {
      font-size: 1.2rem;

    }
  }


}

@media screen and (max-width:499px) {
  .nav {
    display: flex;
    justify-content: space-between;

    .nav__logo {
      font-size: var(--h2-font-size);
      margin-left: var(--mb-1);
    }

    .nav__menu {
      position: fixed;
      top: -100%;
      left: 0;
      width: 100%;
      background-color: var(--body-color);
      padding: 2rem 1.5rem 2rem;
      box-shadow: 0 -1px 4px rgba(0, 0, 0, .15);
      border-radius: 1.5rem 1.5rem 0 0;
      transition: .5s;
    }

    .nav__btns {
      flex: 2;
      justify-content: flex-end;
      margin-right: var(--mb-0-5);
    }
  }
}



@media screen and (min-width: 500px) {
  .nav {
    height: calc(var(--header-height));
    display: flex;
    justify-content: space-between;

    .nav__left {
      display: flex;
      justify-content: start;
      height: 100%;

      .nav__logo {
        font-size: var(--h2-font-size);
      }
    }

    .nav__menu {
      height: 100%;
      width: 200px;

      .nav__list {
        height: 100%;
        gap: 0;
        column-gap: 0 !important;
        grid-template-columns: 0;
        display: flex;

        .nav__item {
          height: 100%;
          width: 100px;
          border: 1px solid var(--body-color);
          margin: auto 0;

        }

        .nav__link {
          display: flex;
        }
      }

      .nav__close {
        display: none;
      }
    }

    .nav__btns {
      flex: 1;
      justify-content: flex-end;

      .nav__toggle {
        display: none;
      }
    }

  }
}

@media screen and (min-width: 1140px) {
  .nav {
    .nav__left {
      margin-left: var(--mb-10);

      .nav__logo {
        font-size: var(--h1-font-size);
      }
    }

    .nav__menu {
      width: 500px;

      .nav__item {
        .nav__link {
          margin-left: var(--mb-1);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row !important;
          font-size: var(--normal-font-size);

          p {
            margin-left: var(--mb-0-5);
          }
        }
      }
    }

    .nav__btns {
      margin-right: var(--mb-10);

      .search {
        width: 30% !important;
      }

      .iconfont {
        font-size: var(--h3-font-size);
      }

    }
  }
}

@media screen and (max-width: 400px) {
  .nav {

    .nav__logo {
      font-size: var(--h3-font-size);
    }

    .nav__menu {
      padding: 2rem .25rem 4rem;

      .nav__list {
        column-gap: 0;
      }
    }

    .nav__btns {
      margin-right: 0 !important;

      .iconfont {
        font-size: var(--normal-font-size);
      }
    }
  }

}

@media screen and (max-width: 310px) {
  .nav {
    .nav__logo {
      font-size: var(--small-font-size);
    }

    .nav__btns {
      margin-right: 0 !important;

      .iconfont {
        font-size: var(--small-font-size);
      }
    }
  }
}

.show-menu {
  top: 0 !important;
}
</style>