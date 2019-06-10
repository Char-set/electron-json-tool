<template>
  <div id="app">
    <transition name="el-fade-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'Json'
  }
</script>

<style>
  /* CSS */
  @import "./styles/common.css";
  @import "./styles/font_1230930_a2kh0vujorp";
</style>
