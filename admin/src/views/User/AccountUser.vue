<script setup>
import { ref } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import ContainerLayout from '@/components/Layout/ContainerLayout.vue';
import userService from '@/models/user';
import UserEdit from '@/components/User/userEdit.vue';
import { useFetch }  from '@/composables/fetch';

const userList = ref();
const pageParams = ref({
    page: 1,
    pageSize: 5,
    totalItems: 0,
});
const dialog = ref();


// 获取用户列表
async function getUserList() {
    const page = pageParams.value.page;
    const pageSize = pageParams.value.pageSize;
    const { data, total } = await userService.getUserList({
        page,
        pageSize,
    });
    userList.value = data;
    pageParams.value.totalItems = total[0].sum;
}
getUserList();

// 状态栏加载中
const { loading } = useFetch(getUserList);
// 分页事件处理
function handleCurrentChange(newPage) {
    pageParams.value.page = newPage;
    getUserList();
}
// 创建用户
function handleCreateUser() {
    dialog.value.open({})
}
// 编辑用户
function handleEditUser(row) {
    console.log(row);
    dialog.value.open(row)
}
// 更新列表
function handleUpdateList() {
    getUserList();
}
// 删除用户
async function delUserConfirm(id) {
    const res = await userService.deleteUser(id);
    res.code === 200 && ElMessage({ message: res.message, type: 'success' });
    if (userList.value.length === 1) pageParams.value.page--;
    getUserList();

}

</script>

<template>
    <ContainerLayout title="用户列表">
        <template #extra>
            <el-button type="primary" @click="handleCreateUser">创建用户</el-button>
        </template>
        <el-table :data="userList" stripe style="width: 100%" v-loading="loading">
            <el-table-column align="center" prop="id" label="id" width="100"></el-table-column>
            <el-table-column align="center" prop="name" label="用户昵称"></el-table-column>
            <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
            <el-table-column align="center" prop="password" label="密码"></el-table-column>
            <el-table-column align="center" label="操作" width="200">
                <!-- 放置操作按钮 -->
                <template v-slot="{ row }">
                    <el-button type="success" link :icon="Edit" @click="handleEditUser(row)">编辑</el-button>
                    <!-- <el-button type="danger" link @click="handleDeleteManager(row)">删除</el-button> -->
                    <el-popconfirm width="200" title="确定删除这条内容吗？" @confirm="delUserConfirm(row.id)">
                        <template #reference>
                            <el-button type="danger" :icon="Delete" link>删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
            <el-pagination background v-model:current-page="pageParams.page" :page-size="pageParams.pageSize"
                layout="total,prev, pager, next" :total="pageParams.totalItems" @current-change="handleCurrentChange" />
        </el-row>
        <userEdit ref="dialog" @updateList="handleUpdateList" />
    </ContainerLayout>
</template>

<style lang="less" scoped></style>