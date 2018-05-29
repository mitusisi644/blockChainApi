<template>
  <div class="headerNav">
    <div class="top">
      <img class="logo" src="../../assets/ico.png"><span>牛牛数字资产交易平台</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "headerNav"
    }
</script>

<style scoped>
  .headerNav {
    width: 100%;
    height: auto;
    overflow: hidden;
    background-color: cornflowerblue;
  }
  .top {
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .logo{
    height:24px;
    padding-top:13px;
    float: left;
    margin-left:10px;
  }
  .top span {
    margin-left:-45px;
  }
</style>
