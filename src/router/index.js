import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Dashboard from '../views/Dashboard'
import Profile from '../components/Profile'
import Conversations from '../components/Conversations'
import Messages from '../components/Messages'
import NewMessage from '../components/NewMessage'
import Contacts from '../components/Contacts'
import ContactCard from '../components/ContactCard'
import NewContact from '../components/NewContact'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/sign-in',
        name: 'sign-in',
        component: SignIn
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: SignUp
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
                component: Conversations,
                children: [
                    {
                        path: '/dashboard/conversations/compose-message',
                        name: 'compose-message',
                        component: NewMessage
                    },
                    {
                        path: '/dashboard/conversations/messages/:conversationid',
                        name: 'messages',
                        component: Messages
                    }
                ]
            },
            {
                path: '/dashboard/profile',
                name: 'profile',
                component: Profile
            },
            {
                path: '/dashboard/contacts',
                name: 'contacts',
                component: Contacts,
                children: [
                    {
                        path: '/dashboard/contacts/add-contact',
                        name: 'add-contact',
                        component: NewContact
                    },
                    {
                        path: '/dashboard/contacts/:contactId',
                        name: 'contactcard',
                        component: ContactCard
                    }
                ]
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
