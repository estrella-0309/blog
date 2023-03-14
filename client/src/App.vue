<template>
  <Header></Header>
  <Main></Main>
</template>

<script setup lang="ts">

</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  align-items: center;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #fbfbfe;
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  background-color: var(--body-color);
  color: var(--text-color);
}

h1,
h2,
h3,
h4 {
  color: var(--title-color);
  font-weight: var(--font-semi-bold);
}

img {
  max-width: 100%;
  height: auto;
}
</style>
