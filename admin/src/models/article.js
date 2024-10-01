import request from "./request";
import API from "@/consts/api";

const ArticleService = {
    getArticleList(params) {
        return request.get(API.article, params);
    },
    getArticleDetail(id) {
        const url = `${API.article}/${id}`
        return request.get(url);
    },
    addArticle(data) {
        return request.post(API.article, data);
    },
    editArticle(id, data) {
        const url = `${API.article}/${id}`
        return request.put(url, data);
    },
    deleteArticle(id) {
        const url = `${API.article}/${id}`
        return request.delete(url);
    },
};

export default ArticleService;