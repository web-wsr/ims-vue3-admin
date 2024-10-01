import request from "./request";
import API from "@/consts/api";

const ClassifyService = {
    getClassifyList(params) {
        return request.get(API.classifyList, params);
    },
    addClassify(data) {
        return request.post(API.classifyList, data);
    },
    editClassify(id, data) {
        const url = `${API.ClassifyEdit}/${id}`
        return request.put(url, data);
    },
    deleteClassify(id) {
        const url = `${API.ClassifyEdit}/${id}`
        return request.delete(url);
    }
};

export default ClassifyService;