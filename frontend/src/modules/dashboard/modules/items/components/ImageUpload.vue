<script lang="ts" setup>
import { QFile } from "quasar";
import { useRouteParams } from "src/composables/useRoute";
import {
  UploadImageMutation,
  useUploadImageMutation,
} from "src/modules/dashboard/modules/items/graphql/imageDashboard.operations";
import { ref } from "vue";

const { itemId, siteId } = useRouteParams();

interface Props {
  disabled: boolean;
}
const props = defineProps<Props>();

const emit =
  defineEmits<{ (e: "addImages", images: UploadImageMutation): void }>();

const files = ref<File[]>([]);

const { executeMutation: uploadImage } = useUploadImageMutation();

const upload = async () => {
  if (files.value.length > 0) {
    uploadImage({
      files: files.value,
      siteId: siteId.value,
      itemId: itemId.value,
    }).then((result) => {
      if (result.data?.uploadImage) {
        emit("addImages", result.data);
      }
      files.value = [];
    });
  }
};
const getImageSrc = (file: File) => URL.createObjectURL(file);
</script>

<template>
  <q-file
    v-model="files"
    :disabled="props.disabled"
    accept="image/*"
    counter
    hint="Click or drag and drop image here"
    multiple
    outlined
    style="width: 100%"
    @update:model-value="upload"
  >
    <template #file="{ file }">
      <div>
        <q-img
          :src="getImageSrc(file)"
          fit="contain"
          height="100px"
          width="100px"
        />
        <div class="text-caption">
          {{ file.name }}
        </div>
      </div>
    </template>
  </q-file>
</template>
