import { defineStore } from 'pinia';
import RestService from '@/service';
import router from '@/router';
import { toast } from '@/composables/sweetalert';
import { i18n } from '@/plugins/i18n';
import ls from '@/composables/localStorage';
import asymmetricEncrypt from '@/composables/encrypt';

const service = new RestService({ namespace: '/session' });

export const useSessionStore = defineStore('session', {
  state () {
    return {
      sessionFetching: false,
      session: undefined,
      me: undefined,
      activeOrganizationId: undefined,
    };
  },
  actions: {
    async login ({ email, password }, isAdmin) {
      try {
        this.sessionFetching = true;
        const { data } = await service.request({
          url: '/login',
          method: 'post',
          data: {
            email,
            password: asymmetricEncrypt(password),
          }
        });
        ls.set('authenticated', data.authenticated);
        await router.push({ name: 'Home' });
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.sessionFetching = false;
      }
    },
    async logout () {
      try {
        await service.request({
          url: '/logout',
          method: 'post',
        });
        ls.set('authenticated', false);
        await router.push({ name: 'Login' });
      } catch (err) {
        await service.manageError(err);
      }
    },
    async register (newUser) {
      try {
        this.sessionFetching = true;
        await service.request({
          url: '/register',
          method: 'post',
          data: {
            ...newUser,
            password: asymmetricEncrypt(newUser.password),
          },
        });
        toast.fire({
          title: i18n.t('session.user.registered'),
          icon: 'success',
        });
        await router.push({ name: 'Login' });
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.sessionFetching = false;
      }
    },
    async getMe () {
      try {
        this.sessionFetching = true;
        const { data } = await service.request({
          url: '/me',
          method: 'GET',
        });
        this.me = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.sessionFetching = false;
      }
    },
    async getFullMe () {
      try {
        this.sessionFetching = true;
        const { data } = await service.request({
          url: '/me',
          method: 'GET',
          params: {
            full: true,
          }
        });
        this.me = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.sessionFetching = false;
      }
    },
  }
});
