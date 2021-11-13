import { createPinia } from 'pinia';
import { boot } from 'quasar/wrappers';

export default boot(({ app, router }) => {
  const pinia = createPinia();
  pinia.use(() => ({ router }));

  app.use(pinia);
});
