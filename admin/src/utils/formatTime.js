import { dayjs } from "element-plus";
// 封装格式化日期函数
export const formatTime = (time) => dayjs(time).format("YYYY年MM月DD日");