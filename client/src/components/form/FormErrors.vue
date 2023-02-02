<template>
  <v-scroll-y-transition group>
    <template
      v-for="(error, i) in formErrors"
      :key="`form-error-${i}`"
    >
      <v-alert
        type="error"
        density="compact"
        border="start"
        variant="tonal"
        :width="width"
      >
        {{ error }}
      </v-alert>
    </template>
  </v-scroll-y-transition>
</template>

<script>
import form from '@/mixins/form';

export default {
  name: 'FormErrors',
  mixins: [ form ],
  props: {
    entity: {
      type: String,
      default: () => undefined,
    },
    width: {
      type: Number,
      default: () => undefined,
    },
  },
  created () {
    const entityFormatted = this.entity?.replace(/([A-Z])/g, '_$1').toUpperCase();
    this.formManageError(entityFormatted);
  },
};
</script>

<style scoped>

</style>
