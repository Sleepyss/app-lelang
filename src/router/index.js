import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/LoginP.vue'
import Dashboard from '../components/DashboardP.vue'

// Users
import IndexUser from '../components/Users/IndexUsers.vue'
import TambahUser from '../components/Users/TambahUsers.vue'
import EditUser from '../components/Users/EditUsers.vue'
import DetailUser from '../components/Users/DetailUsers.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/users',
        name: 'indexuser',
        component: IndexUser,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/users/tambah',
        name: 'tambahuser',
        component: TambahUser,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/users/:id',
        name: 'edituser',
        component: EditUser,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/users/:id',
        name: 'detailuser',
        component: DetailUser,
        meta: {
            requireAuth: true
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (localStorage.getItem('auth')) {
            next()
        } else {
            next('/login')
        }
    }
    next()
})

export default router