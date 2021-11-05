<template>
  <q-page
    class="bg-grey-2"
    padding
    q-pa-md
  >
    <ItemForm
      v-if="editItem"
      :edit-item="editItem"
      @submit="handleSubmit"
    />
  </q-page>
</template>

<script lang="ts" setup>
import ItemForm from 'components/dashboard/forms/ItemForm.vue';
import { useQuasar } from 'quasar';
import { ItemInput, useItems } from 'src/module/useItems';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const editItem = ref();
const { createItem, updateItem, getItem } = useItems();
const $q = useQuasar();

const itemId = parseInt(<string>route.params.itemId, 10);

onMounted(() => {
  if (route.name === 'DashBoardItemCreate') {
    editItem.value = {};
  } else {
    const { onResult } = getItem(itemId);
    onResult((result) => {
      editItem.value = result.data.item;
    });
  }
});
const handleSubmit = (object:ItemInput) => {
  if (object.id) {
    void updateItem(object).then((result) => {
      if (result?.data) {
        $q.notify({
          type: 'positive',
          message: 'Item updated',
        });
        editItem.value = result.data.updateItem;
      }
    });
  } else {
    void createItem(object).then((data) => {
      if (data?.data) {
        $q.notify({
          type: 'positive',
          message: 'Item created',
        });
        void router.push({ name: 'DashBoardItemEdit', params: { itemId: data.data.createItem.id } });
      }
    });
  }
};
</script>
