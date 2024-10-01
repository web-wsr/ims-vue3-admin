<script setup>
import { ref } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import ContainerLayout from '@/components/Layout/ContainerLayout.vue';
import classifyEdit from '@/components/Article/classifyEdit.vue';
import classifyService from '@/models/classify';
import { useFetch }  from '@/composables/fetch';

const classifyList = ref();
const pageParams = ref({
    page: 1,
    pageSize: 5,
    totalItems: 0,
});
const dialog = ref();
// 获取分类列表
async function getClassifyList() {
    const page = pageParams.value.page;
    const pageSize = pageParams.value.pageSize;
    const { data, total } = await classifyService.getClassifyList({
        page,
        pageSize,
    });
    classifyList.value = data;
    pageParams.value.totalItems = total[0].sum;
}
getClassifyList();
const { loading }  = useFetch(getClassifyList)

// 分页事件处理
function handleCurrentChange(newPage) {
    pageParams.value.page = newPage;
    getClassifyList();
}

// 创建分类
function handleCreateClassify() {
    dialog.value.open({})
}

// 编辑分类
function handleEditClassify(row) {
    dialog.value.open(row)
}
// 更新列表
function handleUpdateList() {
    getClassifyList();
}

// 删除分类
async function delClassifyConfirm(id) {
    const res = await classifyService.deleteClassify(id);
    res.code === 200 && ElMessage({ message: res.message, type: 'success' });
    if (classifyList.value.length === 1) pageParams.value.page--;
    getClassifyList();
}
</script>

<template>
    <ContainerLayout title="文章分类">
        <template #extra>
            <el-button type="primary" @click="handleCreateClassify">添加分类</el-button>
        </template>
        <el-table :data="classifyList" stripe style="width: 100%" v-loading="loading">
            <el-table-column align="center" prop="id" label="id" width="100"></el-table-column>
            <el-table-column align="center" prop="classify_name" label="分类名称"></el-table-column>
            <el-table-column align="center" prop="classify_slug" label="分类别名"></el-table-column>
            <el-table-column align="center" label="操作" width="200">
                <!-- 放置操作按钮 -->
                <template v-slot="{ row }">
                    <el-button type="success" link :icon="Edit" @click="handleEditClassify(row)">编辑</el-button>
                    <!-- <el-button type="danger" link @click="handleDeleteManager(row)">删除</el-button> -->
                    <el-popconfirm width="200" title="确定删除这条内容吗？" @confirm="delClassifyConfirm(row.id)">
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
        <!-- 弹窗组件 -->
        <classifyEdit ref="dialog" @updateList="handleUpdateList" />
    </ContainerLayout>
</template>

<style lang="less" scoped></style>