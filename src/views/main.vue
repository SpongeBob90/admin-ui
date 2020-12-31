<template>
  <div class="home-cointer"  id="main">
    <el-container>
      <el-aside width="200px">
        <div class="logo-container">
          <span class="logoName">权限管理平台</span>
        </div>
        <nav-left></nav-left>
      </el-aside>
      <el-container>
        <el-header>
          <div class="fr com-height">
            <el-dropdown trigger="click" @command="userSettings" @visible-change="vChange">
              <span style="cursor: pointer;">
                <i class="iconfont icon-icon" style="color:#BCCEDA;"></i>
                <span>{{name}}</span>
                <i v-if="!listIon" class="el-icon-arrow-down"></i>
                <i v-if="listIon" class="el-icon-arrow-up"></i>
              </span>
              <el-dropdown-menu class="setting" slot="dropdown">
                <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main style="height:100%;">
          <el-col :span="24" id="content-wrapper" class="content-wrapper" style="display:block;">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import navLeft from "../components/nav-left.vue";

export default {
  name: "home",
  components: {
    navLeft
  },
  data() {
    return {
      name: "",
      listIon: false
    };
  },
  methods: {
    userSettings(value) {

    },
    vChange(value) {
      this.listIon = value;
    }
  }
};
</script>
<style>

</style>
<style lang="scss" scoped>
@import "../styles/main.scss";
</style>
