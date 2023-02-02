<template>
  <v-text-field
    v-model="modelValue.email"
    :label="$t('form.email')"
    :rules="[ validation.required ]"
    required
  />
  <v-text-field
    v-model="modelValue.password"
    :label="$t('form.password')"
    :rules="[ validation.required ]"
    outlined
    type="password"
  />
</template>

<script>
import form from '@/mixins/form';

export default {
  name: 'LoginForm',
  mixins: [ form ],
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        email: undefined,
        password: undefined,
      }),
    }
  }
};
</script>

<style scoped>

</style>
