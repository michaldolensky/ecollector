<template>
  <q-page
    class="bg-grey-2"
    padding
    q-pa-md
  >
    <CategoryForm
      v-if="editCategory"
      :edit-item="editCategory"
      @submit="handleSubmit"
    />
  </q-page>
</template>

<script lang="ts">
import CategoryForm from 'components/dashboard/forms/CategoryForm.vue';
import { useQuasar } from 'quasar';
import { GET_CATEGORY } from 'src/apollo/dashboard/categoryQueries';
import {
  CategoryDataSingle, CategoryInput, IGetCategory, useCategories,
} from 'src/module/useCategories';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';

export default defineComponent({
  name: 'EditCategoryPage',
  components: { CategoryForm },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const editCategory = ref();
    const { updateCategory, addCategory } = useCategories();
    const $q = useQuasar();

    const categoryId = parseInt(<string>route.params.categoryId, 10);

    onMounted(() => {
      if (route.name === 'DashBoardCategoryCreate') {
        editCategory.value = {};
      } else {
        const { onResult } = useQuery<CategoryDataSingle, IGetCategory>(GET_CATEGORY, {
          id: categoryId,
        });

        onResult((result) => {
          editCategory.value = result.data.category;
        });
      }
    });
    const handleSubmit = (object:CategoryInput) => {
      if (object.id) {
        void updateCategory(object).then((result) => {
          if (result?.data) {
            $q.notify({
              type: 'positive',
              message: 'Category updated',
            });
            editCategory.value = result.data.updateCategory;
          }
        });
      } else {
        void addCategory(object).then((data) => {
          if (data?.data) {
            $q.notify({
              type: 'positive',
              message: 'Category created',
            });
            void router.push({ name: 'DashBoardItemEdit', params: { categoryId: data.data.createCategory.id } });
          }
        });
      }
    };

    return {
      handleSubmit,
      editCategory,
    };
  },
});
</script>
