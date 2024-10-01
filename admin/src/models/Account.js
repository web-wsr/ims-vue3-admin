import request from "./request";
import API from "@/consts/api";

const AccountService = {
    login(data) {
        return request.post(API.login, data);
    },
    logout() {
        return request.get(API.logout);
    },

};

export default AccountService;
