'use strict';
import router from '@/router';

async function goTo (routeName, query) {
  await router.push({ name: routeName, query });
}

async function goBack () {
  await router.back();
}

export { goTo, goBack };
