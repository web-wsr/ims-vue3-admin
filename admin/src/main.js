import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/Common/SvgIcon.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'



// const globalOptions = {
//   debug: 'info',
//   modules: {
//     toolbar: ['bold', 'italic', 'underline', 'link', 'image']
//   },
//   placeholder: 'Compose an epic...',
//   readOnly: false,
//   theme: 'snow'
// }
// // set default globalOptions prop
// QuillEditor.props.globalOptions.default = () => globalOptions
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.component('SvgIcon', SvgIcon)
app.component('QuillEditor', QuillEditor)
app.mount('#app')
