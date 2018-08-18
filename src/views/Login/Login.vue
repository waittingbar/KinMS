<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <!--<img src="../../assets/images/logo.png" height="100" alt="">-->
        <p>{{ $Config.siteName }}</p>
      </div>
      <el-form :model="formQuery" :rules="rules" ref="ruleForm">
        <el-form-item prop="userName">
          <el-input
              placeholder="请输入用户名"
              suffix-icon="fa fa-user"
              v-model="formQuery.userName"
              clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              placeholder="请输入密码"
              suffix-icon="fa fa-keyboard-o"
              v-model="formQuery.password"
              auto-complete="off"
              type="password"
              clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
              placeholder="请输入验证码"
              v-model="formQuery.code"
              auto-complete="off"
              @keyup.native.enter="submitForm('ruleForm')"
              clearable
          >
            <template slot="append"><img :src="codeImg" @click="getCodeImg" alt="验证码"></template>
          </el-input>
        </el-form-item>

        <el-button
            type="primary" :loading="loginLoading"
            style="width: 100%;margin-bottom: 18px"
            @click="submitForm('ruleForm')"
        >登录
        </el-button>
      </el-form>
      <div>
        <el-checkbox v-model="Remenber"> 记住密码</el-checkbox>
        <!--<a href="javascript:;" style="float: right;color: #3C8DBC;font-size: 14px">Register</a>-->
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formQuery: {
          userName: '',
          password: '',
          code: '',
        },
        codeImg: '',
        Remenber: true,
        loginLoading: false,
        rules: {
            password: [
                { required: true, message: '请填写密码', trigger: 'blur' }
            ],
            userName: [
                { required: true, message: '请填写用户名', trigger: 'blur' }
            ],
            code: [
                { required: true, message: '请填写验证码', trigger: 'blur' },
                { len: 4, message: '验证码长度有误', trigger: 'blur' }
            ]
        }
      }
    },
    created() {
        this.getCodeImg();
    },
    methods: {
        submitForm(form) {

//         let APP = this;
//         APP.loginLoading = true;
//         setTimeout(() => {
//           sessionStorage.setItem(APP.$Config.tokenKey, '123456789');
//           APP.$notify({
//             title: '登录成功',
//             message: '欢迎登录哦。',
//             type: 'success'
//           });
//           APP.loginLoading = false;
//           APP.$router.push({path: '/'});
//         }, 1000);

            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.$Api.login(this.formQuery, r => {
                        console.log(r)
                        if(r.success){
                            sessionStorage.setItem(this.$Config.tokenKey, r.data.token);
                            sessionStorage.setItem(this.$Config.userName, r.data.userName);
                            this.$notify({
                                title: '登录成功',
                                message: '欢迎登录哦。',
                                type: 'success',
                                duration: 3500
                            });
                            this.loginLoading = false;
                            this.$router.push({path: '/'});
                        }else {
                            this.$message.error(r.message);
                            this.getCodeImg();
                        }
                    });
                }
            })

        },
        getCodeImg() {
            this.codeImg = this.$Config.apiUrl+'/auth/image?t='+Math.random();
        }
    }
  }
</script>

<style lang="less">
  @import "Login.less";
</style>
