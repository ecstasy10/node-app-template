import { useSessionStore } from '@/store/session';
import { createRouter, createWebHistory } from 'vue-router';
import ls from '@/composables/localStorage';

/** Session **/
const SessionLayout = import('@/layouts/SessionLayout');
const RegisterPage = import('@/components/session/register/RegisterPage');
const LoginPage = import('@/components/session/login/LoginPage');

/** Home **/
const DefaultLayout = import('@/layouts/DefaultLayout');
const HomePage = import('@/components/home/HomePage');

const authenticated = ls.get('authenticated');

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      if (authenticated) {
        return { name: 'Home'  };
      } else {
        return { name: 'Login' };
      }
    },
  },
  {
    path: '/session',
    name: 'SessionLayout',
    component: () => SessionLayout,
    children: [
      {
        path: 'register',
        name: 'Register',
        component: () => RegisterPage,
      },
      {
        path: 'login',
        name: 'Login',
        component: () => LoginPage,
      },
    ]
  },
  {
    path: '',
    name: 'DefaultLayout',
    meta: {
      requiresAuth: true,
    },
    component: () => DefaultLayout,
    redirect: { name: 'Home' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => HomePage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authenticated = ls.get('authenticated');
  const store = useSessionStore();
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth);
  if (!authenticated && requiresAuth) {
    await store.logout();
  }
  next();
});

export default router;
