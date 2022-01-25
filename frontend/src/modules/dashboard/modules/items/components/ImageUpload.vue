<script lang="ts" setup>
import { QFile } from 'quasar';
import { useUploadFileMutation } from 'src/modules/dashboard/modules/items/graphql/imageDashboard.operations';
import { computed, ref } from 'vue';

const files = ref<File[]>([]);
const uploading = ref(null);

const isUploading = computed(() => uploading.value !== null);
const canUpload = computed(() => files.value !== null);

const { mutate: uploadFile } = useUploadFileMutation({});

const upload = () => {
  if (files.value.length > 0) {
    void uploadFile({

      files: files.value,

    }).then((value) => console.log(value));
  }
};

</script>

<template>
  <div class="q-pa-md column items-start q-gutter-y-md">
    {{ files }}
    {{ files?.modelValue }}
    <q-file
      v-model="files"
      :clearable="!isUploading"
      label="Pick files"
      multiple
      outlined
      style="max-width: 400px"
    />
    <q-btn
      :disable="!canUpload"
      :loading="isUploading"
      color="primary"
      dense
      icon="cloud_upload"
      round
      @click="upload"
    />
  </div>
</template>
