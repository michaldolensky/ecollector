<template>
  <dashboard-page>
    <dashboard-page-header
      :title="props.inEditMode?$t('dashboard.headers.editItem'):$t('dashboard.headers.createItem')"
    >
      <q-btn
        :label="$t('buttons.common.save')"
        color="secondary"
        icon="save"
        @click="form?.submit()"
      />
    </dashboard-page-header>

    <q-form
      v-if="!loading"
      ref="form"
      class="items-start full-width"
      @submit="onSubmit"
    >
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
                :rules="[required]"
                counter
                label="Item name"
                maxlength="100"
                outlined
                stack-label
              />

              <q-input
                v-model="item.shortDesc"
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
          <editItemImages
            v-model="item.images"
            :in-edit-mode="props.inEditMode"
          />
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
              <ItemCategorySelect v-model="item.categoryId" />

              <q-input
                v-if="item.id"
                v-model="item.id"
                disable
                label="Item ID"
                outlined
              />
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
    </q-form>
  </dashboard-page>
</template>

<script lang="ts" setup>
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';
import ItemCategorySelect from 'components/dashboard/forms/select/ItemCategorySelect.vue';
import EditItemImages from 'components/dashboard/forms/EditItemImages.vue';
import Editor from 'components/dashboard/forms/Editor.vue';
import DashboardPage from 'pages/site/dashboard/DashboardPage.vue';
import { QForm, useQuasar } from 'quasar';
import { UpdateItemInput, useItemQuery } from 'src/apollo/composition-functions';
import { useItems } from 'src/composables/useItems';
import { validationHelper } from 'src/validationHelper';
import { DeepNullable } from 'ts-essentials';
import {
  reactive, ref, onMounted,
} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { createItem, updateItem } = useItems();
const { required } = validationHelper;

const { notify } = useQuasar();

interface Props {
  inEditMode?: boolean,
  itemId?: number,
}
const props = defineProps<Props>();

const resetObject:DeepNullable<UpdateItemInput> = {
  id: 0,
  name: 'default name',
  categoryId: 1,
  shortDesc: 'default shortDesc',
  longDesc: 'ASdefault longDesc',
  internalNumber: '',
  numberForExchange: 0,
  numberInCollection: 0,
  images: [],
};

const item = reactive(resetObject);
const enableQuery = ref(false);
onMounted(() => {
  if (props.inEditMode) enableQuery.value = true;
});
const form = ref<QForm>();

const { onResult, restart, loading } = useItemQuery({
  id: props.itemId,
}, () => ({
  enabled: enableQuery.value,
}));

onResult((result) => {
  if (!result.loading) {
    const reqItem = result.data.item;

    item.id = reqItem.id;
    item.name = reqItem.name;
    item.categoryId = reqItem.categoryId;
    item.shortDesc = reqItem.shortDesc;
    item.longDesc = reqItem.longDesc;
    item.internalNumber = reqItem.internalNumber;
    item.numberForExchange = reqItem.numberForExchange;
    item.numberInCollection = reqItem.numberInCollection;
    item.images = reqItem.images;
  }
});
restart();

const onSubmit = () => {
  if (props.inEditMode) {
    void updateItem(item).then((result) => {
      if (result?.data) {
        notify({
          type: 'positive',
          message: 'Item updated',
        });
      }
    });
  } else {
    delete item.id;
    delete item.images;
    void createItem(item).then((result) => {
      if (result?.data) {
        notify({
          type: 'positive',
          message: 'Item created',
        });
        void router.push({
          name: 'DashBoardItemEdit',
          params: { itemId: result.data.createItem.id },
        });
      }
    });
  }
};
</script>
