<script lang="ts" setup>
import DashboardPageHeader from 'src/modules/dashboard/components/DashboardPageHeader.vue';
import EditItemImages from 'src/modules/dashboard/modules/items/components/EditItemImages.vue';
import Editor from 'src/modules/dashboard/modules/items/components/Editor.vue';
import ItemCategorySelect from 'components/dashboard/ItemCategorySelect.vue';
import DashboardPage from 'src/modules/dashboard/DashboardModule.vue';
import { useItemQuery } from 'src/modules/dashboard/modules/items/graphql/ItemDashboard.operations';
import Parameters from 'src/modules/dashboard/modules/parameters/components/ParametersPanel.vue';
import { QForm, useQuasar } from 'quasar';
import { useItems } from 'src/modules/dashboard/modules/items/composables/useItems';
import { UpdateItemInput } from 'src/types/graphql';
import { validationHelper } from 'src/validationHelper';
import { DeepNullable } from 'ts-essentials';
import { onMounted, reactive, ref } from 'vue';
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
const props = withDefaults(defineProps<Props>(), {
  inEditMode: false,
  itemId: undefined,
});

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
  itemParameters: [],
};

const item = reactive(resetObject);
const enableQuery = ref(false);
const tab = ref('detail');
onMounted(() => {
  if (props.inEditMode) enableQuery.value = true;
});
const form = ref<QForm>();

const {
  onResult, restart, loading, refetch,
} = useItemQuery({
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
    item.itemParameters = reqItem.itemParameters;
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
        void refetch();
      }
    });
  } else {
    delete item.id;
    delete item.images;
    delete item.itemParameters;
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
      <q-tabs
        v-model="tab"
        active-color="primary"
        align="justify"
        indicator-color="primary"
        narrow-indicator
      >
        <q-tab
          :label="$t('dashboard.items.tabs.label.detail')"
          name="detail"
        />
        <q-tab
          :disable="!props.inEditMode"
          :label="$t('dashboard.items.tabs.label.images')"
          name="images"
        />
        <q-tab
          :disable="!props.inEditMode"
          :label="$t('dashboard.items.tabs.label.parameters')"
          name="parameters"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel
          class="bg-grey-3"
          name="detail"
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
                  <ItemCategorySelect
                    v-model="item.categoryId"
                    required
                  />
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
        </q-tab-panel>

        <q-tab-panel
          :disable="!props.inEditMode"
          class="bg-grey-3"
          name="images"
        >
          <editItemImages
            v-model="item.images"
            :in-edit-mode="props.inEditMode"
          />
        </q-tab-panel>

        <q-tab-panel
          :disable="!props.inEditMode"
          class="bg-grey-3"
          name="parameters"
        >
          <Parameters v-model="item.itemParameters" />
        </q-tab-panel>
      </q-tab-panels>
    </q-form>
  </dashboard-page>
</template>
