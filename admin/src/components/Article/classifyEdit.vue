<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus'
import classifyService from '@/models/classify';
const showDialog = ref(false);
const classifyFormRef = ref();
// 弹窗组件对外暴露一个方法，区别是创建或编辑
const open = (row) => {
    showDialog.value = true
    classifyform.value = { ...row }
}
const classifyform = ref({
    classify_name: '',
    classify_slug: ''
})

const smsRules = {
    classify_name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
        {
            pattern: /^\S{1,10}$/,
            message: '分类名称必须是 1-10 个非空字符',
            trigger: 'blur'
        }
    ],
    classify_slug: [
        { required: true, message: '请输入分类别名', trigger: 'blur' },
        {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: '分类别名必须是 1-15 个字母或数字',
            trigger: 'blur'
        }
    ]
}

const emit = defineEmits(['updateList'])
async function hanleConfirm() {
    await classifyFormRef.value.validate()
    const isEdit = !!classifyform.value.id
    if (isEdit) {
        const id = classifyform.value.id
        const res = await classifyService.editClassify(id, { ...classifyform.value })
        res.code === 200 && ElMessage({ message: res.message, type: 'success' })
    } else {
        const res = await classifyService.addClassify({ ...classifyform.value })
        res.code === 200 && ElMessage({ message: res.message, type: 'success' })
    }
    showDialog.value = false
    emit('updateList')

}
function handleQuit() {
    classifyFormRef.value.resetFields()
    showDialog.value = false
}
// 向外暴露方法
defineExpose({
    open
})
</script>

<template>
    <!-- 放置弹窗 -->
    <el-dialog v-model="showDialog" :title="classifyform.id ? '编辑分类' : '添加分类'" width="500px" @close="handleQuit">
        <!-- 表单内容 -->
        <el-form ref="classifyFormRef" :model="classifyform" :rules="smsRules" label-width="120px">
            <el-form-item prop="classify_name" label="分类名称">
                <el-input type="text" style="width: 300px" size="small" v-model="classifyform.classify_name" />
            </el-form-item>
            <el-form-item prop="classify_slug" label="分类别名">
                <el-input type="text" style="width: 300px" size="small" v-model="classifyform.classify_slug" />
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