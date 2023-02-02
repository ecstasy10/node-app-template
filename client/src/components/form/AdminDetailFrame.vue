<template>
  <div>
    <div class="mb-3 d-flex flex-wrap align-center">
      <v-btn
        icon
        color="secondary"
        variant="flat"
        size="small"
        @click="goBack"
      >
        <v-icon large>
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <h3
        class="mb-1 ml-3"
      >
        {{ $t(`${title}`) }}
      </h3>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
import { goBack } from '@/composables/router';

export default {
  name: 'AdminDetailFrame',
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
    title: {
      type: String,
      default: () => undefined,
    },
  },
  methods: {
    goBack,
  },
};
</script>

<style scoped>

</style>
