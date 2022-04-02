import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index.js'

import Login from '../components/LoginP.vue'
import Dashboard from '../components/DashboardP.vue'
import DashboardM from '../components/Masyarakat/DashboardMP.vue'

// Admin & Petugas

// Users
import IndexUser from '../components/Users/IndexUsers.vue'
import TambahUser from '../components/Users/TambahUsers.vue'
import EditUser from '../components/Users/EditUsers.vue'
import DetailUser from '../components/Users/DetailUsers.vue'
import TambahDetailUser from '../components/Users/TambahDetailUser.vue'


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

// Report
import ReportTransaksi from '../components/Report/IndexReport.vue'

// Masyarakat
import TambahDetailM from '../components/Masyarakat/TambahDetailM.vue'
import RegisterMasyarakat from '../components/Masyarakat/RegisterM.vue'

// Masyarakat - Lelang
import DetailLelangM from '../components/Masyarakat/Lelang/DetailLelangM.vue'
import IndexTransaksiM from '../components/Masyarakat/Transaksi/IndexTransaksiM.vue'

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
            requiresAuth: true
        }
    },
    {
        path: '/dashboard',
        name: 'dashboardmasyarakat',
        component: DashboardM,
        meta: {
            requiresAuth: true
        }
    },

    // Users

    {
        path: '/users',
        name: 'indexuser',
        component: IndexUser,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/users/tambah',
        name: 'tambahuser',
        component: TambahUser,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/users/:id',
        name: 'edituser',
        component: EditUser,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/users/detail/:id',
        name: 'detailuser',
        component: DetailUser,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/users/tambah/detail/:id',
        name: 'tambahdetailuser',
        component: TambahDetailUser,
        meta: {
            requiresAuth: true
        }
    },

    // Barang

    {
        path: '/barang',
        name: 'indexbarang',
        component: IndexBarang,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/barang/tambah',
        name: 'tambahbarang',
        component: TambahBarang,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/barang/:id',
        name: 'editbarang',
        component: EditBarang,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/barang/:id',
        name: 'detailbarang',
        component: DetailBarang,
        meta: {
            requiresAuth: true
        }
    },

    // Lelang

    {
        path: '/lelang',
        name: 'indexlelang',
        component: IndexLelang,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/lelang/tambah',
        name: 'tambahlelang',
        component: TambahLelang,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/lelang/edit/:id',
        name: 'editlelang',
        component: EditLelang,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/lelang/detail/:id',
        name: 'detaillelang',
        component: DetailLelang,
        meta: {
            requiresAuth: true
        }
    },

    // Transaksi

    {
        path: '/transaksi',
        name: 'indextransaksi',
        component: IndexTransaksi,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/transaksi/tambah/:id',
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
            requiresAuth: true
        }
    },

    // Report
    {
        path: '/report',
        name: 'reporttransaksi',
        component: ReportTransaksi,
        meta: {
            requiresAuth: true
        }
    },

    // Masyarakat - Lelang
    {
        path: '/detail/:id',
        name: 'detaillelangm',
        component: DetailLelangM,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/register',
        name: 'registermasyarakat',
        component: RegisterMasyarakat,
    },
    {
        path: '/tambah/detail/:id',
        name: 'tambahdetailm',
        component: TambahDetailM,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/transaksim',
        name: 'indextransaksim',
        component: IndexTransaksiM,
        meta: {
            requiresAuth: true
        }
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (store.state.token) {
            next()
        } else {
            next('/login')
        }
    }
    next()
})

export default router