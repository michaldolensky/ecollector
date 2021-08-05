<template>
  <q-toolbar>
    <div
      v-if="inEditMode"
      class="text-h6 text-weight-regular"
    >
      Edit item
    </div>
    <div
      v-else
      class="text-h6 text-weight-regular"
    >
      Create item
    </div>
    <q-space />
    <q-btn
      color="secondary"
      @click="handleSave()"
    >
      Save
    </q-btn>
  </q-toolbar>

  <div class=" items-start  full-width ">
    <div class="row">
      <div class="col-12 col-md-8 q-pa-md q-gutter-md">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-weight-regular">
              Item description
            </div>
          </q-card-section>

          <q-separator />
          <q-card-section>
            <q-input
              v-model="item.name"
              :rules="[val => !!val || 'Field is required']"
              counter
              label="Item name"
              maxlength="100"
              outlined
              stack-label
            />

            <q-input
              v-model="item.shortDesc"
              :rules="[val => !!val || 'Field is required']"
              label="Short description"
              maxlength="250"
              outlined
              stack-label
              type="textarea"
            />
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-weight-regular">
              Long description
            </div>
            <Editor v-model="item.longDesc" />
          </q-card-section>
        </q-card>
        <q-card />
        <q-card>
          <q-card-section>
            <div class="text-h6 text-weight-regular">
              Item images
            </div>
          </q-card-section>
          <q-separator />

          <q-card-section>
            <q-uploader
              :factory="uploadImage"
              batch
              label="Batch upload"
              max-files="10"
              multiple
              style="max-width: 300px"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4 q-pa-md ">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-weight-regular">
              Item details
            </div>
          </q-card-section>
          <q-separator />

          <q-card-section>
            <q-input
              v-if="item.id"
              v-model="item.id"
              disable
              label="Item ID"
              outlined
            />
            <ItemCategorySelect v-model="item.category" />
            <q-input
              v-model="item.internalNumber"
              label="Internal Number"
              maxlength="50"
              outlined
              stack-label
            />
            <q-input
              v-model.number="item.numberForExchange"
              label="Available number of items for exchange"
              outlined
              stack-label
              type="number"
            />
            <q-input
              v-model.number="item.numberInCollection"
              label="Number of items in the collection"
              outlined
              stack-label
              type="number"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Editor from 'components/dashboard/forms/Editor.vue';
import ItemCategorySelect from 'components/dashboard/forms/select/ItemCategorySelect.vue';
import { Item, ItemInput } from 'src/module/useItems';
import {
  computed, defineComponent, PropType, reactive, SetupContext,
} from 'vue';

const uploadImage = () => ({
  url: 'http://localhost:3000/images?siteId=1&itemId=17',
  method: 'POST',
  fieldName: 'images',
});

export default defineComponent({
  name: 'ItemForm',
  components: { Editor, ItemCategorySelect },
  props: {
    editItem: {
      type: Object as PropType<Item>,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
  },
  emits: ['submit'],
  setup(props, ctx: SetupContext) {
    const item = reactive<ItemInput>({
      id: 0,
      name: '',
      categoryId: 0,
      shortDesc: '',
      longDesc: '',
      internalNumber: '',
      numberForExchange: 0,
      numberInCollection: 0,
      category: undefined,
    });

    const inEditMode = computed(() => (props.editItem?.id));

    if (inEditMode.value) {
      Object.assign(item, props.editItem);
    }

    // watch(item, (item) => {
    //   console.log(item);
    // });

    const handleSave = () => {
      let modifiedItem:ItemInput;

      if (inEditMode.value) {
        modifiedItem = {
          ...item,
          id: props.editItem?.id,
        };
      } else {
        delete item.id;
        modifiedItem = {
          ...item,
        };
      }
      if (!item.category?.id) {
        throw new Error('Category id not loaded');
      }
      modifiedItem.categoryId = item.category.id;
      delete modifiedItem.category;
      delete modifiedItem.updatedAt;
      delete modifiedItem.createdAt;
      ctx.emit('submit', modifiedItem);
    };

    return {
      uploadImage,
      item,
      inEditMode,
      handleSave,
    };
  },
});
</script>
