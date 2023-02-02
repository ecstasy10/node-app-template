<template>
  <v-app-bar
    border
    height="50"
  >
    <v-app-bar-nav-icon
      v-if="$vuetify.display.mobile"
      @click="switchDrawerVisibility"
    />
    <v-toolbar-title class="pa-0">
      <div>
        <v-img
          width="5em"
          :src="appLogo"
          class="mouse-click"
          @click="goTo('AdminHome')"
        />
      </div>
    </v-toolbar-title>
    <v-toolbar-items class="pt-1 pr-2">
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            color="primary"
            variant="tonal"
            height="40"
            v-bind="props"
          >
            <v-icon
              color="primary"
              class="mr-2"
            >
              {{ 'mdi-account' }}
            </v-icon>
            <span class="text--normal">
              {{ activeUser?.name }}
            </span>
            <v-icon color="primary">
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list
            density="compact"
            nav
            active-color="primary"
          >
            <v-list-item
              v-for="menuItem in menu"
              :key="menuItem.label"
              :disabled="menuItem.disabled"
              link
              @click="menuItem.action"
            >
              <template #prepend>
                <v-icon>
                  {{ menuItem.icon }}
                </v-icon>
              </template>
              <v-list-item-title>
                {{ $t(menuItem.label) }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import appLogo from '@/assets/logos/svg/logo-no-background.svg';
import { goTo } from '@/composables/router';
import { useSessionStore } from '@/store/session';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'AdminAppBar',
  emits: [ 'switch-drawer' ],
  data () {
    return {
      appLogo,
    };
  },
  computed: {
    ...mapState(useSessionStore, [ 'me' ] ),
    activeUser () {
      return this.me;
    },
    menu () {
      return [
        {
          label: 'settings.title',
          icon: 'mdi-cog',
          action: () => goTo('AdminSettingsPage'),
          disabled: true,
        },
        {
          label: 'session.logout',
          icon: 'mdi-exit-to-app',
          action: () => this.logout(),
        },
      ];
    },
  },
  methods: {
    ...mapActions(useSessionStore, [ 'logout' ]),
    goTo,
    switchDrawerVisibility () {
      this.$emit('switch-drawer');
    },
  }
};
</script>

<style scoped>

</style>
