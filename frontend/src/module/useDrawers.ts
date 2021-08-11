import { Ref, ref } from 'vue';

const drawerActive = ref(true);

export interface DrawerState{
  drawerState: Ref<boolean>,
  toggleDrawer: () => void;
}

const useDrawers = () => {
  const toggleDrawer = () => {
    drawerActive.value = !drawerActive.value;
  };

  const drawerState: DrawerState = {
    drawerState: drawerActive,
    toggleDrawer,
  };

  return drawerState;
};

export default useDrawers;
