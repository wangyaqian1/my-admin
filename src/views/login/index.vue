<template>
  <div id="login-container">
    <div class="container-box">
      <div class="title">Login Form</div>
      <el-form ref="userForm" :model="userForm" :rules="userRules">
        <el-form-item prop="userName">
          <div class="user-container">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input placeholder="用户名" v-model="userForm.userName" />
          </div>
        </el-form-item>
        <el-form-item prop="passWord">
          <div class="user-container">
            <span class="svg-container">
              <i class="el-icon-s-goods"></i>
            </span>
            <el-input
              placeholder="密码"
              v-model="userForm.passWord"
              @blur="judgeType($event.target.value)"
              show-password
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data() {
    return {
      userForm: {
        userName: '',
        passWord: '',
      },
      userRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 7, message: '长度最少7个字符', trigger: 'blur' },
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // {
          //   pattern://正则校验
          //     /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
          //   message: '请输入正确额格式,可保留两位小数',
          // },
        ],
      },
    }
  },
  methods: {
    submitForm(userForm) {
      this.$refs[userForm].validate(async (valid) => {
        if (valid) {
          //prop各项校验成功
          this.$store
            .dispatch('user/login', this.userForm)
            .then((res) => {
              this.$message.success('登录成功')
              //跳转到详情页
            })
            .catch((err) => {
              this.$refs[userForm].resetFields()
              this.$message.success('登录失败')
            })
        } else {
          return false
        }
      })
    },
    judgeType(val) {
      const testResult = new RegExp(
        '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
      ).test(val)
      if (!testResult)
        this.userRules.passWord[0].message =
          '最少八个字符，至少一个大写字母，一个小写字母和一个数字'
    },
  },
}
</script>

<style lang="scss">
#login-container {
  width: 100vm;
  height: 100vh;
  background-color: #2d3a4b;
  position: relative;
  text-align: center;
  .container-box {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 35%;
    .title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 30px;
      color: aliceblue;
    }
    .user-container {
      display: flex;
      .svg-container {
        padding: 6px 5px 6px 15px;
        color: pink;
        height: 20px;
        vertical-align: middle;
        width: 50px;
        display: inline-block;
      }
    }
  }
}
</style>
