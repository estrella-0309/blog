<template>
  <div class="main">
    <div class="introduce">
      <Introduce></Introduce>
    </div>
    <div class="list">
      <router-view></router-view>
    </div>
    <div class="recommed">
      <Recommend></Recommend>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'

</script>

<style lang="scss" scoped>
.main {
  display: flex;
  margin: calc(var(--header-height) + 20px) auto 0;
  width: 90%;
  justify-content: space-between;
  align-items: start;
  .list {
    flex: 2;
    background-color: aliceblue;
    margin: 0 var(--mb-2);
  }

}
</style>