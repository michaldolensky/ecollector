import { useQuery, useResult } from '@vue/apollo-composable';
import { GET_ITEM } from 'src/apollo/dashboard/itemQueries';
import { IGetItem, Item, ItemDataSingle } from 'src/module/useItems';
import { reactive, watch } from 'vue';

export const useItem = () => {
  const modifyItem = reactive<Partial<Item>>({
    id: 0,
    images: [],
    internalNumber: '',
    longDesc: '',
    name: '',
    numberForExchange: 0,
    numberInCollection: 0,
    shortDesc: '',
  });

  const {
    variables, result,
  } = useQuery<ItemDataSingle, IGetItem>(GET_ITEM, {
    id: 17,
  });

  const item = useResult(result, null, (data) => data.item);

  const selectItem = (id:number) => {
    variables.value = {
      id,
    };
  };

  const setAsMainImage = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Object.assign(modifyItem, useResult(result, null, (data) => data.item).value!);
    // console.log(isReadonly(modifyItem.value.images[0].path));

    if (modifyItem.images !== undefined) {
      const images2 = modifyItem.images.map((value) => {
        const a = {
          id: 0,
          main: false,
          path: 'asd',
        };
        a.path = 'k4154465';
        a.main = value.main;
        a.id = value.id;

        return a;
      });
      modifyItem.images = images2;

      console.log(images2);
    }
  };

  watch([item], (va) => {
    console.log(va);
  });

  return {
    selectItem,
    setAsMainImage,
    state: modifyItem,
  };
};
