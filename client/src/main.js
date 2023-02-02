import { createApp } from 'vue';
import App from './App.vue';

/** Custom CSS **/
import './styles/styles.scss';
import 'bootstrap/scss/bootstrap.scss';

/** Plugins **/
import { registerPlugins } from '@/plugins';

const app = createApp(App);
registerPlugins(app);
app.mount('#app');
