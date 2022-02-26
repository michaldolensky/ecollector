<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { useRouteParams } from "src/composables/useRoute";
import ImageUpload from "src/modules/dashboard/modules/items/components/ImageUpload.vue";
import {
  UploadImageMutation,
  useRemoveImageMutation,
} from "src/modules/dashboard/modules/items/graphql/imageDashboard.operations";
import { EditItemImageFragment } from "src/modules/dashboard/modules/items/graphql/ItemDashboard.operations";

const { siteId } = useRouteParams();

const { executeMutation: removeImageMutation } = useRemoveImageMutation();

interface Props {
  inEditMode: boolean;
  modelValue: EditItemImageFragment[];
}
const props = withDefaults(defineProps<Props>(), {
  inEditMode: false,
  modelValue: () => [],
});

const emit = defineEmits(["update:modelValue"]);
const images = useVModel(props, "modelValue", emit);

const removeImage = (id: number) => {
  void removeImageMutation({
    deleteImageInput: { id },
    siteId: siteId.value,
  }).then(() => {
    images.value = images.value.filter(
      (image: EditItemImageFragment) => image.id !== id
    );
  });
};

const deleteImage = (id: number) => {
  removeImage(id);
};

const setAsMainImage = (id: number) => {
  images.value = images.value.map((value) => ({
    file: value.file,
    id: value.id,
    main: value.id === id,
  }));
};

const addImages = (data: UploadImageMutation) => {
  images.value = [...images.value, ...data.uploadImage];
};
</script>
<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-weight-regular">
        {{ $t("dashboard.items.card.title.item_images") }}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <image-upload :disabled="!props.inEditMode" @add-images="addImages" />
    </q-card-section>
    <q-card-section>
      <div class="q-pa-xs row items-start q-gutter-xs">
        <q-card v-for="image in images" :key="image.id">
          <q-img
            :src="image.file.url"
            style="width: 125px; max-height: 125px"
          />
          <q-card-actions align="center">
            <q-btn
              :color="image.main ? 'positive' : ''"
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
