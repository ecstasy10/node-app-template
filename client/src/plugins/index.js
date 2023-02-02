import { loadFonts } from './webfontloader';
import i18n from './i18n';
import vuetify from './vuetify';
import pinia from '../store';
import router from '../router';

export function registerPlugins (app) {
  loadFonts();
  app
    .use(i18n)
    .use(vuetify)
    .use(router)
    .use(pinia);
}
