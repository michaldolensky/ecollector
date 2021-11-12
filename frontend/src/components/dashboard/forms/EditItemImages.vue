<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-weight-regular">
        Item images
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-uploader
        ref="uploader"
        :disable="!props.inEditMode"
        :factory="uploadImage"
        accept="image/*"
        auto-upload
        batch
        label="Upload"
        max-files="10"
        multiple
        style="width: 100%"
        @uploaded="imagesUploaded"
      >
        <template #list="scope">
          <div class="row">
            <q-item
              v-for="file in scope.files"
              :key="file.name"
              class="q-pa-xs"
            >
              <img
                :src="file.__img.src"
                style="width: 125px"
              >
            </q-item>
          </div>
        </template>
      </q-uploader>
    </q-card-section>
    <q-card-section>
      <div class="q-pa-xs row items-start q-gutter-xs">
        <q-card
          v-for="image in images"
          :key="image.id"
        >
          <q-img
            :src="SERVER_URL+image.path"
            style="width: 125px;max-height: 125px"
          />
          <q-card-actions align="center">
            <q-btn
              :color="image.main?'positive':''"
              flat
              icon="star"
              round
              @click="setAsMainImage(image.id)"
            />
            <q-btn
              color="negative"
              flat
              icon="delete"
              round
              @click="deleteImage(image.id)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </q-card-section>
  </q-card>
  {{ props.modelValue }}
</template>
<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { QUploader } from 'quasar';
import { Image, useImages } from 'src/composables/useImages';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { SERVER_URL } from 'src/composables/useEnv';

const { removeImage } = useImages();

interface Props {
  inEditMode: boolean;
  modelValue: Image[];
}
const props = withDefaults(defineProps<Props>(), {
  inEditMode: false,
  modelValue: () => [],
});

const emit = defineEmits(['update:modelValue']);
const images = useVModel(props, 'modelValue', emit);

const uploader = ref<QUploader>();
const route = useRoute();
const { siteId, item } = route.params;

const uploadImage = () => {
  uploader.value?.reset();
  return {
    url: `${process.env.SERVER_URL}uploads?siteId=${<string>siteId}&itemId=${<string>item}`,
    method: 'POST',
    fieldName: 'images',
  };
};

const imagesUploaded = (info: { files: [], xhr: XMLHttpRequest }) => {
  const responseImages:Image[] = JSON.parse(info.xhr.response) as Image[];

  images.value = [...responseImages.map((value) => ({
    main: value.main,
    path: value.path,
    id: value.id,
  })), ...props.modelValue];
};

const deleteImage = (id: number) => {
  removeImage(id);
  images.value = images.value.filter((value) => value.id !== id);
};

const setAsMainImage = (id: number) => {
  images.value = images.value.map((value) => ({
    path: value.path,
    id: value.id,
    main: value.id === id,
  }));
};

</script>
