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
                    <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
                </v-list-item-avatar>
                <v-list-item-title>John Smith</v-list-item-title>
                <v-btn icon @click.stop="mini = !mini">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
                <router-link to="/dashboard/conversations" style="text-decoration: none">
                    <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>{{'mdi-chat'}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Conversations</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link to="/dashboard/profile" style="text-decoration: none">
                    <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>{{'mdi-account'}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Profile</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link to="/dashboard/contacts" style="text-decoration: none">
                    <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>{{'mdi-account-group-outline'}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Contacts</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
            </v-list>
            <template v-slot:append>
                <router-link to="/" style="text-decoration: none">
                    <div class="pa-2">
                        <v-btn v-on:click="logout" block>Logout</v-btn>
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

    export default {
        name: "Dashboard",
        data() {
            return {
                drawer: true,
                mini: true,
            }
        },
        methods: {
            logout() {
                this.$cookies.remove('userId');
            }
        },
        created() {

        }
    }
</script>
