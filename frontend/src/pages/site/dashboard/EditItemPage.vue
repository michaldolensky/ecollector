<template>
  <q-page
    class="bg-grey-2"
    padding
    q-pa-md
  >
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
                v-model="name"
                label="Outlined"
                outlined
              />
            </q-card-section>
            <q-card-section>
              <q-input
                v-model="text1"
                filled
                outlined
                type="textarea"
              />
            </q-card-section>
            <q-card-section>
              <q-editor
                v-model="editor"
                min-height="5rem"
                outlined
              />
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
                :factory="factoryFn"
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
            <q-card-section>
              added to colection
              internalNumber
              countInStock
              availableForExchange
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ItemDashboard',
  components: {},
  setup() {
    // const item = reactive<Item>({
    //   name: 'string',
    // });

    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    const factoryFn = () => ({
      url: 'http://localhost:3000/images?siteId=1&itemId=17',
      method: 'POST',
      fieldName: 'images',
    });

    return {
      // ...toRefs(item),
      factoryFn,
    };
  },
});
</script>
