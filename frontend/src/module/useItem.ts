import { useQuery, useResult } from '@vue/apollo-composable';
import { GET_ITEM } from 'src/apollo/dashboard/itemQueries';
import { IGetItem, Item, ItemDataSingle } from 'src/module/useItems';
import { reactive } from 'vue';

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

    if (modifyItem.images !== undefined) {
      modifyItem.images = modifyItem.images.map((value) => {
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
    }
  };

  // watch([item], (va) => {
  //   console.log(va);
  // });

  return {
    selectItem,
    setAsMainImage,
    state: modifyItem,
  };
};
