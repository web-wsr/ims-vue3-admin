import request from "./request";
import API from '@/consts/api.js';

const QiuniuService = {
    uploadToken() {
        return request.get(API.uploadToken);
    },
    uploadImage(data) {
        return request.post(API.uploadImage, data);
    }
};

export default QiuniuService;