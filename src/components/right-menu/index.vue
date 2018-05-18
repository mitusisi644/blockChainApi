<template>
  <div class="menu-warp">
    <h2 class="el-icon-share menu-title"> 枚举</h2>
    <ul>
      <li>
        <router-link id="indexHome"
                     to="/">
          机构管理
        </router-link>
      </li>
      <li>
        <router-link id="assetManage"
                     to="/assetManage">
          资产
        </router-link>
      </li>
      <!--<li>
        <router-link id="demoForm"
                     to="/demoForm">
          DemoForm
        </router-link>
      </li>
      <li>
        <router-link id="transferParameters"
                     to="/transferParameters">
          TransferParameters
        </router-link>
      </li>-->
    </ul>
  </div>
</template>

<script>
    export default {
        name: "rightMenu"
    }
</script>

<style scoped>
  .menu-title {
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: left;
    color: #0c91e5;
    font-size:20px;
    font-weight: 600;
    padding:0px 10px;
  }
ul {
  width: 100%;
  height: auto;
  overflow: hidden;
}
  li {
    display: block;
    width: 100%;
    height: auto;
    overflow: hidden;
    text-align: left;
    padding:10px 15px;
  }
  li a {
    color: #363636;
    font-family: 14px;
  }
  .router-link-exact-active.router-link-active {
    font-weight: 600;
    color: #0c91e5;
  }
</style>
