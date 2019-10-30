import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard'
import Profile from '../components/Profile'
import Conversations from '../components/Conversations'
import Contacts from '../components/Contacts'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        children: [
            {
                path: '/dashboard/conversations',
                name: 'conversations',
                component: Conversations
            },
            {
                path: '/dashboard/profile',
                name: 'profile',
                component: Profile
            },
            {
                path: '/dashboard/contacts',
                name: 'contacts',
                component: Contacts
            }
        ]
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
