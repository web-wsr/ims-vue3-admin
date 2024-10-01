<script setup>
import { ref } from 'vue';
import { useRoute,useRouter} from 'vue-router';
import ContainerLayout from '@/components/Layout/ContainerLayout.vue';
import ChannelSelect from '@/components/Article/channelSelect.vue';
import ArticleService from '@/models/article';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const formRef = ref();
const articleEditForm = {
    title:'',
    state:'',
    content:'',
    classify_id:null
}
const editFromModel = ref({...articleEditForm})

async function getArticleDetail() {
    const { data, classifyIds } = await ArticleService.getArticleDetail(route.params.id);
    editFromModel.value.title = data.title;
    editFromModel.value.state = data.state;
    editFromModel.value.content = data.content;
    editFromModel.value.classify_id = classifyIds;
}
getArticleDetail();

// 发布提交
async function handelPublish(state) {
    // 将已发布还是草稿状态，存入 state
    editFromModel.value.state = state;
    
    // 转换 formData 数据
    // const fd = new FormData();
    // for (let key in createFormModel.value) {
    //     fd.append(key, createFormModel.value[key]);
    // }
    //  // 遍历 FormData 对象
    //  for (let [key, value] of fd.entries()) {
    //     console.log(`${key}: ${value}`);
    // }
    const res = await ArticleService.editArticle(route.params.id,{...editFromModel.value});
    res.code === 200 && ElMessage.success('修改文章成功');
    router.push({name:'Article'})
}


</script>

<template>
    <ContainerLayout title="编辑文章">
        <template #extra>
            <el-button type="primary" @click="router.push({name:'Article'})" link>返回文章列表</el-button>
        </template>
            <!-- 发表文章表单 -->
        <el-form :model="editFromModel" ref="formRef" label-width="100px">
        <el-form-item label="文章标题" prop="title">
            <el-input v-model="editFromModel.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="classify_id">
            <channel-select
            v-model="editFromModel.classify_id"
            ></channel-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
            <div class="editor">
                <QuillEditor theme="snow" v-model:content="editFromModel.content" content-type="html" />
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handelPublish('已发布')">发布</el-button>
            <el-button type="info" @click="handelPublish('草稿')">草稿</el-button>
        </el-form-item>
        </el-form>
    </ContainerLayout>
</template>

<style lang="less" scoped>
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}


</style>