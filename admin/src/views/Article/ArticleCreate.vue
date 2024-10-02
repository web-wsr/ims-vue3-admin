<script setup>
import { ref } from 'vue';
import { useRouter} from 'vue-router';
import { ElMessage } from 'element-plus';
import ImageUploader from 'quill-image-uploader';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import ContainerLayout from '@/components/Layout/ContainerLayout.vue';
import ChannelSelect from '@/components/Article/channelSelect.vue';
import ArticleService from '@/models/article';
import QiuniuService  from '@/models/qiniu';
import { useArticleStore } from '@/stores/index';
// import ClassifyService from '@/models/classify';
// 富本编辑器图片上传
const modules = ref({
        name: 'imageUploader',
        module: ImageUploader,
        options:{
            upload:async (file) =>{
            try{
                const {domain, token} = await QiuniuService.uploadToken();
                const formData = new FormData();
                formData.append('file',file);
                formData.append('token',token);
                const res = await QiuniuService.uploadImage(formData);
                let image_url = domain + '/' + res.hash;
                console.log(image_url);
                
                return image_url;
            }catch(error){
                console.error('Error:', error)
                throw new Error('Upload failed')
            }
            
        }
        }
})
defineExpose({modules:modules})

const articleStore = useArticleStore();
const router = useRouter();
// 准备数据
const articleCreateForm = {
    title:'',
    state:'',
    content:'',
    classify_id:null
}
const createFormModel = ref({...articleCreateForm});

// 发布提交
async function handleEditPublish(state) {
    // 将已发布还是草稿状态，存入 state
    createFormModel.value.state = state;
    console.log(createFormModel.value);
    
    // 转换 formData 数据
    // const fd = new FormData();
    // for (let key in createFormModel.value) {
    //     fd.append(key, createFormModel.value[key]);
    // }
    //  // 遍历 FormData 对象
    //  for (let [key, value] of fd.entries()) {
    //     console.log(`${key}: ${value}`);
    // }
    const res = await ArticleService.addArticle({...createFormModel.value});
    res.code === 200 && ElMessage.success('文章发布成功');
    // 添加文章展示倒序的事件通知，用pinia进行存储传递
    articleStore.setArticleCreated(); // 不带参数
    router.push({name:'Article'})
}



</script>

<template>
    <ContainerLayout title="发布文章">
        <template #extra>
            <el-button type="primary" @click="router.push({name:'Article'})" link>返回文章列表</el-button>
        </template>
            <!-- 发表文章表单 -->
        <el-form :model="createFormModel" ref="formRef" label-width="100px">
        <el-form-item label="文章标题" prop="title">
            <el-input v-model="createFormModel.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="classify_id">
            <channel-select
            v-model="createFormModel.classify_id"
            ></channel-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
            <div class="editor">
                <QuillEditor theme="snow" toolbar="full" :modules="modules" v-model:content="createFormModel.content" content-type="html" />
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleEditPublish('已发布')">发布</el-button>
            <el-button type="info" @click="handleEditPublish('草稿')">草稿</el-button>
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