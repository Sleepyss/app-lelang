import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/LoginP.vue'
import Dashboard from '../components/DashboardP.vue'

// Users
import IndexUser from '../components/Users/IndexUsers.vue'
import TambahUser from '../components/Users/TambahUsers.vue'
import EditUser from '../components/Users/EditUsers.vue'
import DetailUser from '../components/Users/DetailUsers.vue'

// Barang
import IndexBarang from '../components/Barang/IndexBarang.vue'
import TambahBarang from '../components/Barang/TambahBarang.vue'
import EditBarang from '../components/Barang/EditBarang.vue'
import DetailBarang from '../components/Barang/DetailBarang.vue'

// Lelang
import IndexLelang from '../components/Lelang/IndexLelang.vue'
import TambahLelang from '../components/Lelang/TambahLelang.vue'
import EditLelang from '../components/Lelang/EditLelang.vue'
import DetailLelang from '../components/Lelang/DetailLelang.vue'

// Transaksi
import IndexTransaksi from '../components/Transaksi/IndexTransaksi.vue'
import TambahTransaksi from '../components/Transaksi/TambahTransaksi.vue'
import DetailTransaksi from '../components/Transaksi/DetailTransaksi.vue'


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

    // Users

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

    // Barang

    {
        path: '/barang',
        name: 'indexbarang',
        component: IndexBarang,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/barang/tambah',
        name: 'tambahbarang',
        component: TambahBarang,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/barang/:id',
        name: 'editbarang',
        component: EditBarang,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/barang/:id',
        name: 'detailbarang',
        component: DetailBarang,
        meta: {
            requireAuth: true
        }
    },

    // Lelang

    {
        path: '/lelang',
        name: 'indexlelang',
        component: IndexLelang,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/lelang/tambah',
        name: 'tambahlelang',
        component: TambahLelang,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/lelang/:id',
        name: 'editlelang',
        component: EditLelang,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/lelang/:id',
        name: 'detaillelang',
        component: DetailLelang,
        meta: {
            requireAuth: true
        }
    },

    // Transaksi

    {
        path: '/transaksi',
        name: 'indextransaksi',
        component: IndexTransaksi,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/transaksi/tambah',
        name: 'tambahtransaksi',
        component: TambahTransaksi,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/transaksi/:id',
        name: 'detailtransaksi',
        component: DetailTransaksi,
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