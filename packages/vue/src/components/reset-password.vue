<script setup lang="ts">
import { computed, useAttrs, toRefs } from 'vue';
import {
  authenticatorTextUtil,
  getFormDataFromEvent,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '../composables/useAuth';
import { UseAuthenticator } from '../types';
import BaseFormFields from './primitives/base-form-fields.vue';

const attrs = useAttrs();
/** @deprecated Component events are deprecated and not maintained. */
const emit = defineEmits(['resetPasswordSubmit', 'backToSignInClicked']);

// `facade` is manually typed to `UseAuthenticator` for temporary type safety.
const facade: UseAuthenticator = useAuthenticator();
const { submitForm, toSignIn, updateForm } = facade;
const { error, isPending } = toRefs(facade);

// Text Util
const { getBackToSignInText, getResetYourPasswordText, getSendCodeText } =
  authenticatorTextUtil;

// Computed Properties
const backSignInText = computed(() => getBackToSignInText());
const resetPasswordHeading = computed(() => getResetYourPasswordText());
const sendCodeText = computed(() => getSendCodeText());

// Methods
const onResetPasswordSubmit = (e: Event): void => {
  // TODO(BREAKING): remove unused emit
  // istanbul ignore next
  if (attrs?.onResetPasswordSubmit) {
    emit('resetPasswordSubmit', e);
  } else {
    submitForm(getFormDataFromEvent(e));
  }
};

const onInput = (e: Event): void => {
  const { name, value } = e.target as HTMLInputElement;
  updateForm({ name, value });
};

const onBackToSignInClicked = (): void => {
  // TODO(BREAKING): remove unused emit
  // istanbul ignore next
  if (attrs?.onBackToSignInClicked) {
    emit('backToSignInClicked');
  } else {
    toSignIn();
  }
};
</script>

<template>
  <slot v-bind="$attrs" name="resetPasswordSlotI">
    <base-form
      v-bind="$attrs"
      data-amplify-authenticator-resetpassword
      @input="onInput"
      @submit.prevent="onResetPasswordSubmit"
    >
      <base-wrapper class="amplify-flex amplify-authenticator__column">
        <slot name="header">
          <base-heading class="amplify-heading" :level="3">
            {{ resetPasswordHeading }}
          </base-heading>
        </slot>
        <base-field-set
          class="amplify-flex amplify-authenticator__column"
          :disabled="isPending"
        >
          <base-form-fields route="resetPassword"></base-form-fields>
        </base-field-set>

        <base-footer class="amplify-flex amplify-authenticator__column">
          <base-alert v-if="error">
            {{ translate(error) }}
          </base-alert>
          <amplify-button
            class="amplify-field-group__control amplify-authenticator__font"
            :fullwidth="false"
            :variation="'primary'"
            type="submit"
            :disabled="isPending"
          >
            {{ sendCodeText }}
          </amplify-button>
          <amplify-button
            class="amplify-field-group__control amplify-authenticator__font"
            :fullwidth="false"
            :size="'small'"
            :variation="'link'"
            style="font-weight: normal"
            type="button"
            @click.prevent="onBackToSignInClicked"
          >
            {{ backSignInText }}
          </amplify-button>
          <slot
            name="footer"
            :onBackToSignInClicked="onBackToSignInClicked"
            :onResetPasswordSubmit="onResetPasswordSubmit"
          >
          </slot>
        </base-footer>
      </base-wrapper>
    </base-form>
  </slot>
</template>
