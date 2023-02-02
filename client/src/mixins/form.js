import eventBus from '@/plugins/eventBus';
import { i18n } from '@/plugins/i18n';

export default {
  data () {
    return {
      valid: true,
      validation: {
        required: v => !!v || this.$t('form.validation.required'),
      },
      formErrors: [],
    };
  },
  methods: {
    formManageError (entityName) {
      eventBus.$on(`ERROR_FORM_${entityName}`, (error) => {
        const errors = error.data.data;
        this.formErrors = errors.map(error => {
          if (error.param) {
            return `${error.param} - ${error.msg}`;
          } else if (error.i18nKey) {
            return i18n.t(error.i18nKey);
          }
          return error;
        });
      });
    },
    deleteFormError (index) {
      this.formErrors = this.formErrors.slice(index + 1, 1);
    },
  },
};
