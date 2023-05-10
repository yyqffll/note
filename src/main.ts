import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'view-ui-plus/dist/styles/viewuiplus.css'
import { Button, Input, Form, FormItem, Row, Col, Message, Switch } from 'view-ui-plus'

const app = createApp(App)

app.config.globalProperties.$Message = Message

app
  .use(store)
  .use(router)
  .component('Button', Button)
  .component('Input', Input)
  .component('Form', Form)
  .component('FormItem', FormItem)
  .component('Row', Row)
  .component('Col', Col)
  .component('Message', Message)
  .component('Switch', Switch)
  .mount('#app');
