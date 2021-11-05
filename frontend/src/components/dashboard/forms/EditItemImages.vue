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
        :disable="!inEditMode"
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
            :src="serverUrl+image.path"
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
</template>
<script lang="ts">
import { Image, useImages } from 'src/module/useImages';
import { defineComponent, PropType, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'EditItemImages',
  props: {

    inEditMode: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Array as PropType<Image[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { removeImage } = useImages();

    const route = useRoute();
    const { siteId, itemId } = route.params;

    const serverUrl = process.env.SERVER_URL;

    const uploadImage = () => ({
      url: `${process.env.SERVER_URL}/uploads?siteId=${<string>siteId}siteId&itemId=${<string>itemId}`,
      method: 'POST',
      fieldName: 'images',
    });
    const images = ref(props.modelValue);
    const updateImages = () => emit('update:modelValue', images);

    const imagesUploaded = (info: { files: [], xhr: XMLHttpRequest }) => {
      const responseImages:Image[] = JSON.parse(info.xhr.response) as Image[];

      responseImages.forEach((value) => {
        const img:Image = {
          main: value.main,
          path: value.path,
          id: value.id,
        };
        images.value = [...images.value, img];
      });
      updateImages();
    };

    const deleteImage = (id: number) => {
      removeImage(id);
      images.value = images.value.filter((value) => value.id !== id);
      updateImages();
    };

    const setAsMainImage = (id: number) => {
      images.value = images.value.map((value) => ({
        path: value.path,
        id: value.id,
        main: value.id === id,
      }));
      updateImages();
    };

    return {
      serverUrl,
      imagesUploaded,
      images,
      uploadImage,
      deleteImage,
      setAsMainImage,
    };
  },
});
</script>
