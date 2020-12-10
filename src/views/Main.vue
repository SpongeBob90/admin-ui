<template>
  <div class="home-cointer"  id="main">
    <el-container>
      <el-aside width="200px">
        <div class="logo-container">
          <span class="logoName">Admin</span>
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
          <el-col :span="24" class="breadcrumb-container nav-title">
            <el-breadcrumb separator=">" class="breadcrumb-inner">
              <el-breadcrumb-item
                  v-for="item in navMenu"
                  :key="item.path"
                  :class="item.colClass"
                >
                <span>{{item.name}}</span>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
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
import { resetPassword, loginLogout,appId } from "../api/api.js";
import md5 from "js-md5"
export default {
  name: "home",
  components: {
    navLeft
  },
  data() {
    return {
      showOneMenu: false,
      navMenu: [],
      isClear: false,
      passwordDialog: false,
      options: [],
      name: "王小雨",
      passwordForm: {
        userId: null,
        oldPassword: null,
        newPassword: null,
        surePassword: null
      },
      appDetail:{
        clientId:null,
        clientName:null
      },
      pwdRules:{
        oldPassword:[
            { required:true,message:"请输入密码",trigger:'blur'},
            { pattern:/^[a-zA-Z][a-zA-Z0-9]{5,11}$/, message:"请输入以字母开头，由字母数字组成的6-12位有效密码", trigger:'blur'}
        ],
        newPassword:[
            { required: true, message:'请输入新密码', trigger: 'blur' },
            { validator: validatePass,  trigger: 'blur'}
        ],
        surePassword:[
            { required: true, message:'请输入确认密码',  trigger: 'blur' },
            { validator: validatePass2,  trigger: 'blur'}
        ]
      },
      listIon: false
    };
  },
  mounted() {
    this.handlerBread(this.$route.matched);
    if (localStorage.userName) {
      this.name = localStorage.userName;
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        let self = this;
        if(val.name == "资源详情"){
          self.appDetail.clientId = JSON.parse(self.$route.params.param).clientId;
        }
        this.handlerBread(val.matched);
        let wrapper = document.getElementById("content-wrapper"); // 让滚动条置顶
        wrapper.scrollTop = 0;
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    userSettings(value) {
      /**
       * @description 页面右上角 用户信息管理：修改密码、退出登录
       */
      if (value == "changePassword") {
        this.passwordDialog = true;
      } else if (value == "logOut") {
        /**
         * @description 退出登录
         * @param {String} appId 应用ID
         * @param {String} token 令牌
         */
        let sso_token = window.localStorage.getItem("sso_token");
        let obj = { appId: appId, token: sso_token };
        loginLogout(obj).then(res => {
          if(res.err_CODE==0){
            this.$message.success(res.err_MESSAGE);
            window.localStorage.removeItem("sso_token");
            this.$router.push({path:'/'});
          }else if(res.err_CODE==4099){ //无效的token
            this.$message.error(res.err_MESSAGE)
          }else{
            this.$message.error(res.err_MESSAGE);
          }
        });
      }
    },
    vChange(value) {
      this.listIon = value;
    },
    cancelChange() {
      /**
       * @description 修改密码 弹出框取消
       */
      this.passwordDialog = false;
      this.$refs["passwordForm"].resetFields();
      // this.$set(this.passwordForm, "oldPassword", null);
      // this.$set(this.passwordForm, "newPassword", null);
      // this.$set(this.passwordForm, "surePassword", null);
      // this.passwordForm.oldPasswordError = this.passwordForm.newPasswordError = this.passwordForm.surePasswordError = null;
    },
    sureChange(formName) {
      /**
       * @description 修改密码
       * @param {Number} userId
       * @param {String} appId 应用ID
       * @param {String} oldPassword 原密码
       * @param {String} newPassword 新密码
       * @param {String} rePassword 确认密码
       * @param {Number} flag
       */
      let self = this;

      this.$refs[formName].validate(valid =>{
        if(valid){
          let params = {
            userId: window.localStorage.getItem("userId"),
            appId:appId,
            oldPassword: md5(self.passwordForm.oldPassword),
            newPassword: md5(self.passwordForm.newPassword),
            rePassword:  md5(self.passwordForm.surePassword),
            flag:1
          };
          resetPassword(params).then(res => {
            if (res.err_CODE == 0) {
              this.$message({ message: res.err_MESSAGE, type: "success" });
              this.cancelChange();
              window.location.reload();
            }else{
              this.$message.error(res.err_MESSAGE);
            }
          });
        }else{
          return false;
        }
      })

    },
    handlerBread(val) {
      /**
       * @description 登录用户信息展示
       */
      let navArr = [];
      val.forEach(i => {
        navArr.push({ path: i.path, name: i.name, colClass: "" });
      });
      navArr.shift();
      navArr.forEach((item, idx) => {
        if (navArr.length == 1) {
          item.colClass = "default-col";
        } else if (idx == 0) {
          item.colClass = "parent-col";
        } else if (idx != 0) {
          item.colClass = "default-col";
        }
      });
      this.navMenu = navArr;
    }
  }
};
</script>
<style>

</style>
<style lang="scss" scoped>
@import "../styles/main.scss";
</style>
