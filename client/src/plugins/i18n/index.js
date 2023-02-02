import { createI18n } from 'vue-i18n';

import enUS from './en-US';
import es from './es';

const messages = {
  'en-US': enUS,
  'es': es,
};

const instance = createI18n({
  locale: 'es',
  globalInjection: true,
  messages
});

export default instance;
export const i18n = instance.global;
