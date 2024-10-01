
// 接口 API ，用于放置后端提供的 API ，因为环境不同需要在 env 获取 请求 hosts
const PREFIX = `${import.meta.env.VITE_APP_HOST}`;
const WEB_PREFIX = `${PREFIX}/api/web`;
const ADMIN_PREFIX = `${PREFIX}/api/admin`;

export default {
  // 获取用户信息
  userInfo: `${WEB_PREFIX}/users/user-info`,
  ossToken: `${PREFIX}/api/file/alioss-token`,
  ossStore: `${PREFIX}/api/file/alioss-store`,
  // 登录/登出相关路由
  login: `${ADMIN_PREFIX}/login`,
  logout: `${ADMIN_PREFIX}/logout`,
  // 文章分类相关路由
  // 获取列表和新增
  classifyList: `${ADMIN_PREFIX}/classify`,
  // 删除和修改
  ClassifyEdit: `${ADMIN_PREFIX}/classify`,

  // 用户相关的增删改查的路由
  user: `${ADMIN_PREFIX}/user`,
  // 文章相关的路由
  article: `${ADMIN_PREFIX}/article`,
};
