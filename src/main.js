import './assets/main.css'
import 'treeflex/dist/css/treeflex.css'

import { createApp } from 'vue'
import App from './App.vue'
import { vuetify } from '@/plugins/vuetify.js'

createApp(App).use(vuetify).mount('#app')

/*
import VueKonva from 'vue-konva';

const app = createApp(App);
app.use(VueKonva).mount('#app');
*/

