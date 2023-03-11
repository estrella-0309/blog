<template>
  <header class="header scroll-header" id="header">
    <nav class="nav container">
      <div style="display:flex;">
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
        <div class="search">
          <n-input round placeholder="搜索">
            <template #suffix>
              <i class="iconfont icon-sousuo"></i>
            </template>
          </n-input>
        </div>
      </div>

    </nav>
  </header>
</template>

<script setup lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
let theme = ref('lighting')
const changetheme = () => {
  if (theme.value === 'lighting') theme.value = 'dark'
  else theme.value = 'lighting'
}

let dropDown = ref(false)
const ShowMenu = () => {
  dropDown.value = true
}
const closedropDown = () => {
  dropDown.value = false;
};
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
    margin-left: var(--mb-5);
  }

  .nav__btns {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 1.25rem;

    .change-theme {
      color: var(--title-color);
      margin-right: var(--mb-1);
      cursor: pointer;

      &:hover {
        color: var(--first-color);
      }
    }

    .nav__toggle {
      cursor: pointer;
      margin-right: var(--mb-1);
      font-weight: var(--font-medium);

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

@media screen and (max-width:767px) {
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

  .nav__logo {
    display: none;
  }

  .nav__btns {
    justify-content: flex-end;

    .search {
      order: -1;
    }
  }
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

.nav__close {
  position: absolute;
  right: 1.3rem;
  bottom: .5rem;
  font-size: 1rem;
  cursor: pointer;
}

.show-menu {
  top: var(--header-height);
}

@media screen and (max-width: 350px) {
  .nav__menu {
    padding: 2rem .25rem 4rem;
  }

  .nav__list {
    column-gap: 0;
  }
}

@media screen and (min-width: 568px) {
  .nav {
    background-color: red;

    .nav__logo {
      font-size: var(--h3-font-size);
    }

    .nav__link {
      p {
        margin-left: var(--mb-0-25);
      }
    }
  }

  @media screen and (min-width: 768px) {
    .nav {
      background-color: pink;

      .nav__logo {
        font-size: var(--h1-font-size);
      }


    }

    .body {
      margin: 0;
    }

    .nav {
      display: flex;
      justify-content: space-between;

    }


    .header {
      padding: 0 1rem;

      .nav {
        height: calc(var(--header-height) + 1.5rem);
        column-gap: 1rem;

        .nav__close,
        .nav__toggle {
          display: none;
        }

        .nav__list {
          display: flex;
          column-gap: 2rem;

          .nav__link {
            flex-direction: row;

          }
        }
      }
    }


  }
}
</style>