import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import moment from 'moment'; //时间插件
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn');

const app = createApp(App)
for (const name in ElIcons){
    app.component(name,(ElIcons as any)[name])
}
app.config.globalProperties.$moment=moment;
app.use(store).use(router).use(ElementPlus).mount('#app')
