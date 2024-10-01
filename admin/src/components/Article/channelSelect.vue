<script setup>
import { ref } from 'vue';
import classifyService from '@/models/classify';

defineProps({
    modelValue: {
        type: [Number,String,Array],
    }
})
const emit = defineEmits(['update:modelValue']);
const channelList = ref([]);
async function getChannelList() {
    const { channelClassify } = await classifyService.getClassifyList();
    channelList.value = channelClassify;
}
getChannelList();
</script>

<template>
    <el-select :modelValue="modelValue" multiple placeholder="请选择分类" @update:modelValue="emit('update:modelValue', $event)">
        <el-option 
        v-for="channel in channelList" 
        :key="channel.id"
        :label="channel.classify_name" 
        :value="channel.id"></el-option>
    </el-select>
</template>

<style lang="less" scoped></style>