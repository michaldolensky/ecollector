<script lang="ts" setup>
import { useVModel } from '@vueuse/core';

interface Props {
  modelValue: string
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const value = useVModel(props, 'modelValue', emit);

</script>
<template>
  <q-editor
    v-model="value"
    :dense="$q.screen.lt.md"
    :fonts="{
      arial: 'Arial',
      arial_black: 'Arial Black',
      comic_sans: 'Comic Sans MS',
      courier_new: 'Courier New',
      impact: 'Impact',
      lucida_grande: 'Lucida Grande',
      times_new_roman: 'Times New Roman',
      verdana: 'Verdana'
    }"
    :toolbar="[
      ['left','center','right','justify'],
      ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript','removeFormat'],
      [ 'hr', 'link'],
      [
        {
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: [
            'p',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'code'
          ]
        },
        {
          label: $q.lang.editor.fontSize,
          icon: $q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'size-1',
            'size-2',
            'size-3',
            'size-4',
            'size-5',
          ]
        },
      ],
      [ 'unordered', 'ordered', 'outdent', 'indent'],
      ['undo', 'redo'],
      ['fullscreen']
    ]"
    min-height="15rem"
    outlined
  />
</template>
