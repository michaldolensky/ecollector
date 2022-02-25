<script lang="ts" setup>
import { QInput } from "quasar";
import { useAuthStore } from "src/stores/auth";
import { validationHelper } from "src/validationHelper";
import { reactive, ref } from "vue";
import { SignUpInterface } from "src/types/auth.interface";

const authStore = useAuthStore();
authStore.authError = "";

const signupData = reactive<SignUpInterface>({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  verifyPassword: "",
});

const onSubmit = () => {
  void authStore.signup(signupData);
};

// Validation
const { required, minLength, passportMismatch } = validationHelper;
const passportInput = ref<QInput>();
const verifyPassportInput = ref<QInput>();
</script>

<template>
  <q-page padding>
    <q-form class="flex flex-center" @submit="onSubmit">
      <q-card class="login-card" square>
        <q-card-section class="text-center text-h2">
          {{ $t("pages.auth.signup.title") }}
        </q-card-section>
        <q-card-section>
          <q-input
            v-model.trim="signupData.firstName"
            :label="$t('forms.auth.first_name')"
            :rules="[required]"
            autofocus
            lazy-rules
            outlined
            required
            square
          />
          <q-input
            v-model.trim="signupData.lastName"
            :label="$t('forms.auth.last_name')"
            :rules="[required]"
            lazy-rules
            outlined
            required
            square
          />
          <q-input
            v-model.trim="signupData.email"
            :label="$t('forms.auth.email')"
            :rules="[required]"
            lazy-rules
            outlined
            required
            square
            type="email"
          />
          <q-input
            ref="passportInput"
            v-model="signupData.password"
            :label="$t('forms.auth.password')"
            :rules="[
              required,
              passportMismatch(signupData.verifyPassword),
              minLength(8),
            ]"
            lazy-rules
            outlined
            required
            square
            type="password"
            @change="verifyPassportInput.validate()"
          />
          <q-input
            ref="verifyPassportInput"
            v-model="signupData.verifyPassword"
            :label="$t('forms.auth.confirm_password')"
            :rules="[
              required,
              passportMismatch(signupData.password),
              minLength(8),
            ]"
            lazy-rules
            outlined
            required
            square
            type="password"
            @change="passportInput.validate()"
          />
          <p v-if="authStore.hasError" class="text-negative">
            {{ authStore.getErrorMessage }}
          </p>
        </q-card-section>
        <q-card-actions align="around">
          <q-btn
            :label="$t('buttons.auth.login')"
            :to="{ name: 'login' }"
            color="primary"
            flat
          />
          <q-btn
            :label="$t('buttons.auth.signup')"
            class="q-px-xl q-py-xs"
            color="primary"
            type="submit"
          />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<style lang="sass" scoped>
.login-card
  width: 100%
  max-width: 400px
  padding: 25px
</style>
