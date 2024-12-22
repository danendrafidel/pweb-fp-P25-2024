import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import OperatorView from '@/views/operator/OperatorView.vue';
import AdminView from '@/views/admin/AdminView.vue';
import SummaryView from '@/views/admin/SummaryView.vue';
import OperatorListView from '@/views/admin/OperatorListView.vue';
import AddFormView from '@/views/admin/barang/AddFormView.vue';
import EditFormView from '@/views/admin/barang/EditFormView.vue';
import AddOperatorView from '@/views/admin/operator/AddOperatorView.vue';
import EditOperatorView from '@/views/admin/operator/EditOperatorView.vue';
import BarangPinjamView from '@/views/operator/BarangPinjamView.vue';
import OperatorSummaryView from '@/views/operator/SummaryView.vue';

const routes = [
  { path: '/', name: 'Login', component: LoginView },
  // ADMIN
  { 
    path: '/admin', 
    name: 'AdminDashboard', 
    component: AdminView,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/all-operator',
    name: 'AdminOperator',
    component: OperatorListView,
    meta: { requiresAuth: true, role: 'admin'},
  },
  {
    path: '/admin/summary',
    name: 'AdminSummary',
    component: SummaryView,
    meta: { requiresAuth: true, role: 'admin'},
  },
  {
    path: '/admin/create-barang',
    name: 'AdminCreateBarang',
    component: AddFormView,
    meta: { requiresAuth: true, role: 'admin'}
  },
  {
      path: '/admin/edit-barang',
      name: 'AdminEditBarang',
      component: EditFormView,
  },
  {
    path: '/admin/create-operator',
    name: 'AdminCreateOperator',
    component: AddOperatorView,
    meta: { requiresAuth: true, role: 'admin'}
  },
  {
    path: '/admin/edit-operator',
    name: 'AdminEditOperator',
    component: EditOperatorView,
    meta: { requiresAuth: true, role: 'admin'}
  },

  // OPERATOR
  { 
    path: '/operator/book-equipment', 
    name: 'OperatorDashboard', 
    component: OperatorView,
    meta: { requiresAuth: true, role: 'operator' },
  },
  { 
    path: '/operator/all-equipment', 
    name: 'OperatorDashboardEquipment', 
    component: BarangPinjamView,
    meta: { requiresAuth: true, role: 'operator' },
  },
  { 
    path: '/operator/summary', 
    name: 'OperatorDashboardSummary', 
    component: OperatorSummaryView,
    meta: { requiresAuth: true, role: 'operator' },
  },
];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');
  
  // Redirect to login if the route requires authentication and no token is found
  if (to.meta.requiresAuth && !token) {
    return next('/');
  }

  if (to.path === '/' && token) {
    if (userRole === 'admin') {
      return next('/admin');
    } else if (userRole === 'operator') {
      return next('/operator');
    }
  }

  if (to.meta.requiresAuth) {
    if (!userRole || to.meta.role !== userRole) {
      return next('/');
    }
  }

  next();
});

export default router;
