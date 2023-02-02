<template>
  <v-text-field
    v-model="modelValue.name"
    :label="$t('session.form.name')"
    :rules="[ validation.required ]"
    required
  />
  <v-text-field
    v-model="modelValue.surname"
    :label="$t('session.form.surname')"
    :rules="[ validation.required ]"
    required
  />
  <v-text-field
    v-model="modelValue.email"
    :label="$t('session.form.email')"
    :rules="[ validation.required ]"
    required
  />
  <v-text-field
    v-model="modelValue.password"
    :label="$t('session.form.password')"
    :rules="[ validation.required ]"
    outlined
    type="password"
  />
</template>

<script>
import form from '@/mixins/form';

export default {
  name: 'RegisterForm',
  mixins: [ form ],
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        name: undefined,
        surname: undefined,
        email: undefined,
        password: undefined,
      }),
    }
  }
};
</script>

