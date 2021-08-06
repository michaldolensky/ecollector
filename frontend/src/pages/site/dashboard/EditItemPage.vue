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

<script lang="ts">
import ItemForm from 'components/dashboard/forms/ItemForm.vue';
import { ItemInput, useItems } from 'src/module/useItems';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ItemDashboard',
  components: { ItemForm },
  setup() {
    const route = useRoute();
    const editItem = ref();
    const { createItem, updateItem, getItem } = useItems();

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
      // todo
      if (object.id) {
        updateItem(object);
      } else {
        createItem(object);
      }
    };

    return {
      handleSubmit,
      editItem,
    };
  },
});
</script>
