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
                {{ $t('dashboard.items.card.title.item_description') }}
              </div>
            </q-card-section>

            <q-separator />
            <q-card-section>
              <q-input
                v-model="item.name"
                :label="$t('dashboard.items.input.label.item_name')"
                :rules="[required]"
                counter
                maxlength="100"
                outlined
                stack-label
              />

              <q-input
                v-model="item.shortDesc"
                :label="$t('dashboard.items.input.label.short_description')"
                maxlength="250"
                outlined
                stack-label
                type="textarea"
              />
            </q-card-section>
            <q-card-section>
              <div class="text-h6 text-weight-regular">
                {{ $t('dashboard.items.input.label.long_description') }}
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
                {{ $t('dashboard.items.card.title.item_details') }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <ItemCategorySelect v-model="item.categoryId" />
              <q-input
                v-if="item.id"
                v-model="item.id"
                :label="$t('dashboard.items.input.label.item_id')"
                disable
                outlined
              />
              <q-input
                v-model="item.internalNumber"
                :label="$t('dashboard.items.input.label.internal_number')"
                maxlength="50"
                outlined
                stack-label
              />
              <q-input
                v-model.number="item.numberForExchange"
                :label="$t('dashboard.items.input.label.items_for_exchange')"
                outlined
                stack-label
                type="number"
              />
              <q-input
                v-model.number="item.numberInCollection"
                :label="$t('dashboard.items.input.label.items_in_collection')"
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
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { createItem, updateItem } = useItems();
const { required } = validationHelper;

const { notify } = useQuasar();

const { t } = useI18n();

interface Props {
  inEditMode?: boolean,
  itemId?: number,
}
const props = defineProps<Props>();

const resetObject:DeepNullable<UpdateItemInput> = {
  id: 0,
  name: '',
  categoryId: null,
  shortDesc: '',
  longDesc: '',
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
          message: t('dashboard.items.notification.message.item_updated'),
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
          message: t('dashboard.items.notification.message.item_created'),
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
