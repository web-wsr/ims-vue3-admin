<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import userServive from '@/models/user';
const showDialog = ref(false);
const userFormRef = ref()
const userform = ref({
    name: '',
    phone: '',
    password: ''
});

// 弹窗组件对外暴露一个方法，区别是创建或编辑
const open = (row) => {
    showDialog.value = true
    userform.value = { ...row }
}

// 表单验证规则
const smsRules = {
    name: [
        { required: true, message: '请输入用户昵称', trigger: 'blur' },
        {
            pattern: /^\S{1,10}$/,
            message: '分类名称必须是 1-10 个非空字符',
            trigger: 'blur'
        }
    ],
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
const emit = defineEmits(['updateList'])
async function hanleConfirm() {
    await userFormRef.value.validate()
    const isEdit = !!userform.value.id
    if (isEdit) {
        const id = userform.value.id
        const res = await userServive.editUser(id, { ...userform.value })
        res.code === 200 && ElMessage({ message: res.message, type: 'success' })
    } else {
        const res = await userServive.addUser({ ...userform.value })
        res.code === 200 && ElMessage({ message: res.message, type: 'success' })
    }
    showDialog.value = false
    emit('updateList')

}


function handleQuit() {
    userFormRef.value.resetFields()
    showDialog.value = false
}
defineExpose({
    open
})
</script>

<template>
    <!-- 放置弹窗 -->
    <el-dialog v-model="showDialog" :title="userform.id ? '编辑用户' : '添加用户'" width="500px" @close="handleQuit">
        <!-- 表单内容 -->
        <el-form ref="userFormRef" :model="userform" :rules="smsRules" label-width="120px">
            <el-form-item prop="name" label="用户昵称">
                <el-input type="text" style="width: 300px" size="small" v-model="userform.name" />
            </el-form-item>
            <el-form-item prop="phone" label="手机号">
                <el-input type="text" style="width: 300px" size="small" v-model="userform.phone" />
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input type="text" style="width: 300px" size="small" v-model="userform.password" />
            </el-form-item>
            <el-form-item>
                <el-row type="flex" justify="center">
                    <el-col class="button-group">
                        <el-button type="primary" size="small" @click="hanleConfirm">确定</el-button>
                        <el-button size="small" @click="handleQuit">取消</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<style lang="less" scoped></style>