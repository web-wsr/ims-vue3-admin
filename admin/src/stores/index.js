import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
    state: () => {
        return {
            userInfo: null,
        };
    },
    actions: {
        setUserInfo(userInfo) {
            this.userInfo = userInfo;
        },
    }
});

export const useArticleStore = defineStore('article', {
    state: () => ({
        articleCreated: false
    }),
    actions: {
        setArticleCreated() {
            this.articleCreated = true;
        }
    }
});


export default { useStore, useArticleStore }