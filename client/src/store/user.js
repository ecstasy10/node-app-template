import { defineStore } from 'pinia';
import RestService from '@/service';
import { toast } from '@/composables/sweetalert';
import { i18n } from '@/plugins/i18n';

const service = new RestService({ namespace: '/users' });

export const useUserStore = defineStore('user', {
  state () {
    return {
      userFetching: false,
      userDetail: undefined,
      users: [],
    };
  },
  actions: {
    async getUsers () {
      try {
        this.userFetching = true;
        const { data } = await service.request({
          method: 'get',
        });
        this.users = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.userFetching = false;
      }
    },
    async getUserById (userId, isFull) {
      try {
        this.userFetching = true;
        const { data } = await service.request({
          url: `/${userId}`,
          method: 'get',
          params: {
            full: isFull,
          }
        });
        this.userDetail = data;
        return data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.userFetching = false;
      }
    },
    async upsertUser (user) {
      try {
        this.userFetching = true;
        const method = user._id ? 'put' : 'post';
        const { data } = await service.request({
          url: user._id ?? `/${user._id}`,
          method,
          data: user,
        });
        toast.fire({
          title: method === 'put' ? i18n.t('user.updated') : i18n.t('user.created'),
          icon: 'success',
        });
        this.userDetail = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.userFetching = false;
      }
    },
    async deleteUserById (userId) {
      try {
        this.userFetching = true;
        await service.request({
          url: `/${userId}`,
          method: 'delete',
        });
        toast.fire({
          title: i18n.t('user.deleted'),
          icon: 'success',
        });
        this.users = this.users.filter(user => user._id !== userId);
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.userFetching = false;
      }
    },
  }
});
