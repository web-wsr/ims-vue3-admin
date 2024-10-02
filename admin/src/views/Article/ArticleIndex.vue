<script setup>
import { ref,watchEffect } from 'vue';
import { useRouter } from 'vue-router'; 
import { Edit, Delete } from '@element-plus/icons-vue';
import ContainerLayout from '@/components/Layout/ContainerLayout.vue';
import ChannelSelect from '@/components/Article/channelSelect.vue';
import ArticleService from '@/models/article';
import { formatTime } from '@/utils/formatTime';
import { useFetch }  from '@/composables/fetch';
import { ElMessage } from 'element-plus';
import { useArticleStore } from '@/stores/index';

const articleStore = useArticleStore();
const router = useRouter()
const articleList = ref()
const totalItems = ref()
// 定义文章请求参数
const articleParams = ref({
    page: 1,
    pageSize: 20,
    classify_id: null,
    state:''
})
console.log('articleParams', articleParams.value);

// 监听这个状态的变化，并在状态变化时重新获取文章列表并跳转到最后一页。
watchEffect(() => {
  if (articleStore.articleCreated) {
    // 需要跳转渲染最后一页
    const lastPage = Math.ceil((totalItems.value + 1) / articleParams.value.pageSize)
    articleParams.value.page = lastPage
    articleStore.setArticleCreated(false); // 清除状态
  }
});
async function getArticleList() {
    const {data, total} = await ArticleService.getArticleList({ ...articleParams.value })
    articleList.value = data
    totalItems.value = total
}
getArticleList()


async function performSearch(){
    const { articleListAll } = await ArticleService.getArticleList({ ...articleParams.value })
    console.log('data', articleListAll);
    articleList.value = articleListAll.filter(item => {
        return (
            (!articleParams.value.classify_id || articleParams.value.classify_id.some(id => item.articleClassiyIds.includes(id)))&&
            (!articleParams.value.state || item.state.includes(articleParams.value.state))
        )
    })
    console.log('articleList', articleList.value);    
    totalItems.value = articleList.value.length
    
}

function handleSearch() {
    articleParams.value.page = 1;
    performSearch();
}

function handleReset() {
    articleParams.value.page = 1;
    articleParams.value.classify_id= null;
    articleParams.value.state=''
    getArticleList()
}
const { loading }  = useFetch(getArticleList)
// 分页事件处理
function handleSizeChange(newSize) {
    articleParams.value.page = 1;
    articleParams.value.pageSize = newSize;
    getArticleList();
}

function handleCurrentChange(newPage) {
    articleParams.value.page = newPage;
    getArticleList();
}
function handleEditArticle(row) {
    router.push({ name: 'ArticleEdit', params: { id: row.id } })
}

async function delArticleConfirm(id) {
    const res = await ArticleService.deleteArticle(id);
    res.code === 200 && ElMessage.success('删除成功');
    if (articleList.value.length === 1) articleParams.value.page--;
    getArticleList();
}

</script>

<template>
    <ContainerLayout title="文章列表">
        <template #extra>
            <el-button type="primary" @click="router.push({name:'ArticleCreate'})">发布文章</el-button>
        </template>
        <el-form inline>
            <el-form-item label="文章分类：" style="width: 400px;">
                <!-- Vue3 v-model   :modelValue 和 @update:modelValue的简写 -->
                <ChannelSelect v-model="articleParams.classify_id" />
            </el-form-item>
            <el-form-item label="发布状态：" style="width: 240px;">
                <el-select v-model="articleParams.state">
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="articleList" style="width: 100%" v-loading="loading">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column label="文章标题" width="400">
                <template #default="{ row }">
                    <el-link type="primary" :underline="false">{{ row.title }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="分类" >
                <template #default="{ row }" >
                    <div  style="display: inline-block"  v-for="(classify, index) in row.classify_name" :key="index">
                        <el-tag color="#E5FFFB" >{{ classify }}</el-tag>
                    </div> 
                </template>
            </el-table-column>
            <el-table-column label="发表时间" prop="created_at">
                <template #default="{ row }">
                    {{ formatTime(row.created_at) }}
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="state">
                    <template #default="{ row }">
                        <el-tag :type="row.state === '已发布' ? 'success' : 'info'">{{ row.state }}</el-tag>
                    </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200">
                <!-- 放置操作按钮 -->
                <template #default="{ row }">
                    <el-button type="success" link :icon="Edit" @click="handleEditArticle(row)">编辑</el-button>
                    <!-- <el-button type="danger" link @click="handleDeleteManager(row)">删除</el-button> -->
                    <el-popconfirm width="200" title="确定删除这条内容吗？" @confirm="delArticleConfirm(row.id)">
                        <template #reference>
                            <el-button type="danger" :icon="Delete" link>删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
            <el-pagination 
            background
            v-model:current-page="articleParams.page"
            v-model:page-size="articleParams.pageSize"
            :page-sizes="[1,2,3,5,10,20]"
            layout="total,sizes,prev, pager, next,jumper" 
            :total="totalItems"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </el-row>
    </ContainerLayout>
</template>

<style lang="less" scoped></style>