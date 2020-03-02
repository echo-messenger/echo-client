<template>
    <v-card style="height: 100%">
        <v-navigation-drawer
                v-model="drawer"
                :mini-variant="mini"
                permanent
                app
        >
            <v-list-item>
                <v-list-item-avatar @click.stop="mini = !mini">
                    <v-img :src=user.profilePicture></v-img>
                </v-list-item-avatar>
                <v-list-item-title class="font-weight-bold">{{user.firstName}} {{user.lastName}}</v-list-item-title>
                <v-btn icon @click.stop="mini = !mini">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-item link v-on:click="changeToConversations">
                    <v-list-item-icon v-if="conversations">
                        <v-icon style="color: #f3b79a">{{'mdi-chat'}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-icon v-else>
                        <v-icon>{{'mdi-chat'}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Conversations</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link v-on:click="changeToProfile">
                    <v-list-item-icon v-if="profile">
                        <v-icon style="color: #f3b79a">{{'mdi-account'}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-icon v-else>
                        <v-icon>{{'mdi-account'}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Profile</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link v-on:click="changeToContacts">
                    <v-list-item-icon v-if="contacts">
                        <v-icon style="color: #f3b79a">{{'mdi-account-group-outline'}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-icon v-else>
                        <v-icon>{{'mdi-account-group-outline'}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Contacts</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <router-link to="/" style="text-decoration: none">
                    <div class="pa-2">
                        <v-btn v-on:click="logout" color="#f3b79a" block>Logout</v-btn>
                    </div>
                </router-link>
            </template>
        </v-navigation-drawer>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-card>
</template>

<script>
    import axios from "axios/index";
    import router from '../router';

    export default {
        name: "Dashboard",
        data() {
            return {
                drawer: true,
                mini: true,
                user: {},
                contactPath: "/dashboard/contacts/",
                conversations: true,
                profile: false,
                contacts: false
            }
        },
        methods: {
            logout() {
                this.$cookies.remove('userId');
            },
            getUser() {
                let userId = this.$cookies.get('userId');
                axios
                    .get("http://localhost:8082/user/" + userId)
                    .then((response) => {
                        this.user = response.data;
                        this.$emit("success");
                    })
                    .catch(() => {
                    });
            },
            changeToConversations() {
                if (!this.conversations)
                    router.push("/dashboard/conversations");
                this.conversations = true;
                this.profile = false;
                this.contacts = false;
            },
            changeToProfile() {
                if (!this.profile)
                    router.push("/dashboard/profile");
                this.conversations = false;
                this.profile = true;
                this.contacts = false;
            },
            changeToContacts() {
                if (!this.contacts)
                    router.push(this.contactPath);
                this.conversations = false;
                this.profile = false;
                this.contacts = true;
            }
        },
        created() {
            let url = window.location.href.toString().split("/");
            this.conversations = url.includes("conversations");
            this.contacts = url.includes("profile");
            this.profile = url.includes("contacts");
            if (this.$cookies.get('userId') === null) {
                router.replace('/')
            }
            this.getUser();
            this.contactPath = "/dashboard/contacts/" + this.$cookies.get('userId');

        },
        mounted() {
            this.$root.$on("profile updated", () => {
                let url = window.location.href.toString().split("/");
                this.conversations = url.includes("conversations");
                this.contacts = url.includes("profile");
                this.profile = url.includes("contacts");
                this.getUser();
                this.contactPath = "/dashboard/contacts/" + this.$cookies.get('userId');
            })
        }
    }
</script>

<style>
    .no-scroll {
        overflow: hidden;
    }
</style>
