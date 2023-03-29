<template>
  <header class="header scroll-header" id="header">
    <nav class="nav container">
      <div class="nav__left">
        <a href="#" class="nav__logo">Estrella's Blog</a>

        <div class="nav__menu" id="nav-menu" :class="dropDown ? 'show-menu' : ' '">
          <ul class="nav__list grid">
            <li class="nav__item">
              <router-link class="nav__link" to="/home" @click="closedropDown">
                <i class="iconfont icon-home"></i>
                <p>主页</p>
              </router-link>
            </li>
            <el-dropdown trigger="click" class="category" style="height:100%;">
              <li class="nav__item">
                <div class="nav__link" @click="closedropDown">
                  <i class="iconfont icon-fenlei"></i>
                  <span class="el-dropdown-link">
                    <p>分类</p>
                  </span>
                </div>
              </li>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="cate in catelist"
                    style="width: 100px;display:flex; justify-content: center; align-items: center;"
                    :key="cate.category_id" @click="Todetail(cate)">{{ cate.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>

            </el-dropdown>

            <li class="nav__item">
              <router-link class="nav__link" to="/pigeonhole" @click="closedropDown">
                <i class="iconfont icon-shijianxian"></i>
                <p>归档</p>
              </router-link>
            </li>
            <li class="nav__item">
              <router-link class="nav__link" to="/about" @click="closedropDown">
                <i class="iconfont icon-guanyuwomen1"></i>
                <p>关于我</p>
              </router-link>
            </li>
          </ul>

          <div class="nav__close" @click="closedropDown()"><i class="iconfont icon-cuowu "></i> </div>
        </div>
      </div>

      <div class="nav__btns">
        <el-switch v-model="theme" :active-icon="Moon" :inactive-icon="Sunny" inline-prompt @click="ToggleTheme()"
          style="margin: 0 var(--mb-0-5);" />
        <!-- <i class="iconfont change-theme" :class="theme === 'light' ? ' icon-dark' : 'icon-light'" id="nav-close"
          "></i> -->

        <div class="nav__toggle" id="nav-toggle" @click="ShowMenu()">
          <i class="iconfont icon-jiugongge"></i>
        </div>
        <el-avatar :size="30" :src="circleUrl" />
        <div class="search" style="width:50%">
          <el-icon class="iconfont icon-sousuo" v-if="taggleSearchAndIcon" @click="ChangeIconToSearch()"></el-icon>
          <el-autocomplete v-model="searchText" :fetch-suggestions="querySearchAsync" @select="handleSelect"
            placeholder="搜索" ref="searchInput" @blur="ChangeSeachToIcon()" v-else>
            <template #suffix>
              <i class="iconfont icon-sousuo"></i>
            </template>
          </el-autocomplete>
        </div>
      </div>

    </nav>
  </header>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted, nextTick } from 'vue'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import { getCategoryList } from "@/api/modules/category";
import { getSearchBlogList } from "@/api/modules/blog";

import { blog, CateGory } from "@/api/interface/index";
import { useRoute, useRouter } from 'vue-router'

let circleUrl = "http://localhost:3030/upload/416271206461509.png"

//主题

let theme = ref(localStorage.getItem("UserThemeKEY") == 'dark' ? true : false)
const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: 'UserThemeKEY',
  // 暗黑class名字
  valueDark: 'dark',
  // 高亮class名字
  valueLight: 'light',
})
const ToggleTheme = useToggle(isDark);
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
let searchresult = ref<blog.searchlist[]>([]);
let searchInput = ref()
const ChangeSeachToIcon = () => {
  taggleSearchAndIcon.value = true
}
const ChangeIconToSearch = () => {
  taggleSearchAndIcon.value = false
  nextTick(() => {
    searchInput.value.focus();
  })
}
let timer: NodeJS.Timeout
const querySearchAsync = (queryString: string, callback: (arg: any) => void) => {
  if (queryString == null
    || queryString.trim() === ''
    || queryString.indexOf('%') !== -1
    || queryString.indexOf('_') !== -1
    || queryString.indexOf('[') !== -1
    || queryString.indexOf('#') !== -1
    || queryString.indexOf('*') !== -1
    || queryString.trim().length > 20) {
    return
  }
  timer && clearTimeout(timer)
  timer = setTimeout(async () => {
    let result = await getSearchBlogList({ searchstr: queryString })
    searchresult.value = result.data
    console.log(searchresult.value);
    callback(searchresult.value)
  }, 1000);

}
const handleSelect = (item: any) => {
  if (item?.blog_id) {
    router.push({
      path: '/details',
      query: {
        id: item.blog_id
      }
    })
  }
}

//分类模块
let catelist = reactive<CateGory.ResCateGoryList[]>([])
const getData = async () => {
  let result = await getCategoryList({ page: 1, size: 100 })
  catelist.push(...result.data.list)
}

onMounted(() => {
  getData()
})
const router = useRouter()
const Todetail = (item: CateGory.ResCateGoryList) => {
  console.log(item);
  router.push({
    path: '/category',
    query: { id: item.category_id }
  })
}

</script>

<style lang="scss" scoped>
::v-deep .el-input__wrapper {
  border-radius: 20px;
}

.header {
  height: var(--header-height);
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: var(--small-font-size);
    font-weight: var(--font-medium);
    color: var(--title-color);
    cursor: pointer;

    &:hover {
      color: var(--first-color);
      background-color: #ecf5ff;
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
      z-index: 999;
    }

    .nav__btns {
      flex: 2;
      justify-content: flex-end;
      margin-right: var(--mb-0-5);

      .avator {
        display: none;
      }
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

      .category {
        width: 100%;
      }

      .nav__list {
        height: 100%;
        gap: 0;
        column-gap: 0 !important;
        grid-template-columns: 0;
        display: flex;

        .nav__item {
          height: 100%;
          width: 100%;
          margin: auto 0;

        }

        .nav__link {
          height: 100%;
          display: flex;
          justify-content: center;
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

@media screen and (min-width: 1300px) {
  .nav {
    .nav__left {
      margin-left: var(--mb-10);

      .nav__logo {
        font-size: var(--h1-font-size);
      }
    }

    .nav__menu {
      width: 600px;

      .category {
        width: 100px;
      }

      .nav__item {
        width: 110px !important;

        .nav__link {
          padding: 0 var(--mb-1);
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
        width: 50% !important;
        border-radius: 30px;
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