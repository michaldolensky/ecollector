<script lang="ts" setup>
import { QFile } from 'quasar';
import { useRouteParams } from 'src/composables/useRoute';
import { useUploadImageMutation } from 'src/modules/dashboard/modules/items/graphql/imageDashboard.operations';
import { ref } from 'vue';

const { itemId, siteId } = useRouteParams();

interface Props{
  disabled: boolean;
}
const props = defineProps<Props>();
const files = ref<File[]>([]);

const { mutate: uploadImage } = useUploadImageMutation({});

const upload = () => {
  if (files.value.length > 0) {
    void uploadImage({
      files: files.value,
      siteId: siteId.value,
      itemId: itemId.value,

    }).finally(() => {
      files.value = [];
    });
  }
};
const getImageSrc = (file:File) => URL.createObjectURL(file);

</script>

<template>
  <q-file
    v-model="files"
    :disabled="props.disabled"
    accept="image/*"
    counter
    hint="test"
    multiple
    outlined
    style="width: 100%;"
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
