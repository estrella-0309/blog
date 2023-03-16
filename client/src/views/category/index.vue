<template>
   <div v-for="i in 10 " :key="i">
      <Blog :data="list">

      </Blog>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
let list = {
  name: "list",
}
</script>

<style lang="scss" scoped></style>