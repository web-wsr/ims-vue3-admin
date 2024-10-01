import request from "./request";
import API from '@/consts/api';

const userService = {
    getUserInfo() {
        return request.get(API.userInfo);
    },
    getUserList(params) {
        return request.get(API.user, params);
    },
    addUser(data) {
        return request.post(API.user, data);
    },
    editUser(id, data) {
        const url = `${API.user}/${id}`
        return request.put(url, data);
    },
    deleteUser(id) {
        const url = `${API.user}/${id}`
        return request.delete(url);
    }
};

export default userService;