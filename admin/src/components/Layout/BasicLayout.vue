<script setup>
// import avatar from '@/assets/default.png'
import { ref, computed,watch} from 'vue';
import { useRoute } from 'vue-router';
import {
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie';
import routesAll from '@/router/routes';
import formatNavRoutes from '@/utils/formatNavRoutes';
import { useStore } from '@/stores/index'
import AccountService from '@/models/Account';

const route = useRoute();
const currentRoute = useRoute();
console.log(currentRoute);

// const router = useRouter();
const store = useStore();
const navRoutes = ref(formatNavRoutes(routesAll));
const activeIndex = ref(route.name);
// 初始化 activeIndex
watch(currentRoute, (newRoute) => {
    // console.log(newRoute);
  const currentName = newRoute.name;
  if (currentName) {
    activeIndex.value = currentName;
  }
  if(newRoute.path === '/admin/article/create') {
    activeIndex.value = 'ArticleCreate';
  }
}, { immediate: true });

const userInfo = computed(() => store.userInfo);

async function handleLogout() {
  const results = await AccountService.logout();
  if (results.code == 200) {
    ElMessage({
      message: results.message,
      type: 'success'
    });
    Cookies.remove('web_token');
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px" style="background-color: #fff;">
      <div class="el-aside__logo">
      </div>
      <el-menu :default-active="activeIndex" :router="true">
        <template v-for="route in navRoutes">
          <el-sub-menu v-if="route.children" :index="route.name" :key="route.path">
            <template #title>
              <svg-icon v-if="route.meta.nav?.icon" :name="route.meta.nav.icon" width="24px" height="18px"
                style="margin-right: 5px"></svg-icon>
              <span>{{ route.meta.nav.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="data in route.children" :key="data.name" :index="data.name"
                :route="{ name: data.name }">
                <span>{{ data.meta.nav.title }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item v-else :key="route.name" :index="route.name" :route="{ name: route.name }">
            <svg-icon v-if="route.meta.nav?.icon" :name="route.meta.nav.icon" width="24px" height="18px"
              style="margin-right: 5px" />
            <span>{{ route.meta.nav.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span calss="userInfo-name">昵称: {{ userInfo.name }}</span>
        <el-dropdown placement="bottom-end">
          <span class="el-dropdown__box">
            <el-avatar :src="avatar" />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout" @click="handleLogout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main style="background-color: #f0f2f5;">
        <router-view></router-view>
      </el-main>
      <el-footer> ©2024 Created by iTWsr</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 60px;
      background: url('@/assets/images/logo.svg') no-repeat center / 60px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f2f5;
    font-size: 14px;
    color: #666;
  }
}
</style>
