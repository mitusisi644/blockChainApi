<template>
  <div id="app">
    <HeaderNav></HeaderNav>
    <div class="sysm-warp">
      <RightMenu class="left-warp"></RightMenu>
      <router-view class="right-warp"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app .dialog-form-warp {
  text-align: left;
}
body {
  width: 100%;
  min-height: 100%;
  font-size:12px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
  * { margin: 0 auto; padding:0px;}
  ul,li {list-style: none}
  a,a:hover {text-decoration: none;}
  .sysm-warp {
    width:100%;
    height: auto;min-height:400px;
    overflow: hidden;
    position: relative;
    padding:10px 0px 0px;
  }
  .left-warp {
    width:200px; heiht:auto;
    overflow: hidden;
    position: absolute;
    left: 0px;
    top: 10px;
    z-index: 5;
  }
  .right-warp {
    width: 100%;
    height: auto;
    overflow: hidden;
    box-sizing: border-box;
    padding:0px 10px 0px 200px;
  }
</style>
