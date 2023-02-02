import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { md3 } from 'vuetify/blueprints';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { fa } from 'vuetify/iconsets/fa';
import { createVuetify } from 'vuetify';

export default createVuetify({
  blueprint: md3,
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#2196F3',
          secondary: '#03A9F4',
        },
      },
      dark: {
        colors: {
          primary: '#2196F3',
          secondary: '#03A9F4',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa
    }
  }
});
