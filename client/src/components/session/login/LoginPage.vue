<template>
  <div class="h-100">
    <v-row
      class="h-100 ma-0"
      align="center"
      justify="end"
    >
      <v-col
        class="text-center"
      >
        <v-row class="ma-0 justify-center">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="submit"
          >
            <div class="d-flex flex-column align-center mb-10">
              <div>
                <v-img
                  width="10em"
                  :src="appLogo"
                />
              </div>
            </div>
            <v-card
              min-width="320"
              class="text-primary pa-2"
              :color="$vuetify.display.smAndDown ? 'transparent' : ''"
              :flat="$vuetify.display.smAndDown"
            >
              <v-card-title class="d-flex justify-space-between">
                <div>
                  {{ $t('session.login.title') }}
                </div>
                <v-avatar>
                  <v-img :src="favicon" />
                </v-avatar>
              </v-card-title>
              <div class="d-flex justify-center">
                <FormErrors
                  :width="280"
                  entity="session"
                />
              </div>
              <v-card-text>
                <LoginForm v-model="loginForm" />
              </v-card-text>
              <div class="d-flex align-center justify-center pb-4">
                <v-btn
                  :loading="sessionFetching"
                  color="secondary"
                  type="submit"
                >
                  {{ $t('session.login.submit') }}
                </v-btn>
              </div>
              <v-card-text>
                <div
                  class="mouse-click"
                  @click="goTo('Register')"
                >
                  {{ $t('session.login.redirectRegister') }}
                </div>
              </v-card-text>
            </v-card>
          </v-form>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LoginForm from '@/components/session/login/LoginForm.vue';
import favicon from '@/assets/logos/FAVICON.png';
import appLogo from '@/assets/logos/svg/logo-no-background.svg';
import FormErrors from '@/components/form/FormErrors.vue';
import { goTo } from '@/composables/router';
import form from '@/mixins/form';
import { useSessionStore } from '@/store/session.js';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'LoginPage',
  components: { FormErrors, LoginForm },
  mixins: [ form ],
  data () {
    return {
      favicon,
      appLogo,
      loginForm: {
        email: undefined,
        password: undefined,
      }
    };
  },
  computed: {
    ...mapState(useSessionStore, [ 'sessionFetching' ]),
  },
  methods: {
    goTo,
    ...mapActions(useSessionStore, [ 'login' ]),
    async submit () {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        await this.login(this.loginForm, true);
      }
    },
  }
};
</script>

<style scoped>

</style>
