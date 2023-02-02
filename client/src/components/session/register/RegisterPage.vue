<template>
  <div class="h-100">
    <v-img
      class="bg-image hidden-sm-and-down"
      cover
      src="https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    >
      <v-row
        class="h-100"
        align="center"
      >
        <v-col class="r-ml">
          <div class="text">
            <h3
              class="text-white"
              v-html="$t('session.register.bgTitle')"
            />
            <h4 class="text-white mt-4">
              {{ $t('session.register.bgSubtitle') }}
            </h4>
          </div>
        </v-col>
      </v-row>
    </v-img>
    <v-row
      class="h-100 ma-0"
      align="center"
      justify="end"
    >
      <v-col
        class="text-center"
        :offset="$vuetify.display.mdAndUp ? 6 : 0"
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
                  {{ $t('session.register.title') }}
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
                <RegisterForm v-model="registerForm" />
              </v-card-text>
              <div class="d-flex align-center justify-center pb-4">
                <v-btn
                  :loading="sessionFetching"
                  color="secondary"
                  type="submit"
                >
                  {{ $t('session.register.submit') }}
                </v-btn>
              </div>
              <v-card-text>
                <div
                  class="mouse-click"
                  @click="goTo('Login')"
                >
                  {{ $t('session.register.redirectLogin') }}
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
import RegisterForm from '@/components/session/register/RegisterForm';
import favicon from '@/assets/logos/FAVICON.png';
import appLogo from '@/assets/logos/svg/logo-no-background.svg';
import { mapActions, mapState } from 'pinia';
import { useSessionStore } from '@/store/session';
import { goTo } from '@/composables/router';
import form from '@/mixins/form';
import FormErrors from '@/components/form/FormErrors.vue';

export default {
  name: 'RegisterPage',
  components: { RegisterForm, FormErrors },
  mixins: [ form ],
  data: () => ({
    favicon,
    appLogo,
    registerForm: {
      name: undefined,
      surname: undefined,
      email: undefined,
      password: undefined,
    },
  }),
  computed: {
    ...mapState(useSessionStore, [ 'session', 'sessionFetching' ]),
  },
  methods: {
    goTo,
    ...mapActions(useSessionStore, [ 'register' ]),
    async submit () {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        await this.register(this.registerForm);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/styles.scss";

.r-ml {
 margin-left: 5vw;
}
.text {
 width: 25em;
}
.bg-image {
  z-index: 0;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 50%;
  & ::v-deep() img {
    filter: brightness(.6);
  }
}
.bg-image:after{
  z-index: 1;
  content:"";
  position: absolute;
  background-color: white;
  height: 130vh;
  width: 20%;
  top: -10em;
  left: 90%;
  transform: rotate(-5deg);
}
h1, h3 {
  font-size: 3em;
  line-height: .5em;
  & ::v-deep() h1 {
    font-size: 1.5em;
  }
}
</style>
