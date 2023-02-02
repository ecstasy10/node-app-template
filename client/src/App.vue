<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.v-navigation-drawer__content::-webkit-scrollbar, body::-webkit-scrollbar {
  display: none;
}
.v-navigation-drawer__content, body {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
