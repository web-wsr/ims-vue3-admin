<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { Phone, Lock } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import AccountService from '@/models/Account';

const router = useRouter();
const form = ref(null);
// 表单验证规则
const smsRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
};

const formData = ref({
  password: null,
  phone: null,
});

const handleSubmit = async() => {
    await form.value.validate();
    const res = await AccountService.login({...formData.value});
    console.log(res);
    if(res.code === 200){
      ElMessage({
        message: res.message,
        type: 'success',
    })
    Cookies.set('web_token',res.token)
    router.push('/');
    }else{
      ElMessage({
        message: res.message,
        type: 'error',
    })
    }
};
</script>

<template>
    <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form ref="form" :model="formData" :rules="smsRules"  size="large" autocomplete="off" >
        <el-form-item >
          <h1 style="margin: 0 auto;">信息管理系统</h1>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input 
          :prefix-icon="Phone" 
          v-model="formData.phone" 
          type="number" 
          placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            :prefix-icon="Lock"
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="handleSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: url('@/assets/images/login-back.jpg') repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>