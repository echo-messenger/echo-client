<template>
    <v-container>
        <v-row>
            <v-col>
                <v-row>
                    <v-col>
                        <div>Contacts</div>
                    </v-col>
                    <v-col>
                        <router-link to="/dashboard/contacts/add-contact" style="text-decoration: none">
                            <v-icon>mdi-plus-circle</v-icon>
                        </router-link>
                    </v-col>
                </v-row>
                <v-row v-for="(contact, index) in contacts" v-bind:key="index">
                    <v-list-item v-on:click="changeContact(contact.id)">
                        <v-list-item-content>
                            <v-list-item-title>{{ contact.firstName }}</v-list-item-title>
                            <v-divider></v-divider>
                        </v-list-item-content>
                    </v-list-item>
                </v-row>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col>
                <router-view></router-view>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from "axios/index";
    import router from '../router';

    export default {
        name: "Contacts",
        data: () => ({
            contacts: [],
            userId: ""
        }),
        methods: {
            getInbox() {
                axios.get("http://localhost:8082/contacts/" + this.userId)
                    .then((response) => {
                        this.contacts = response.data;
                        this.$emit("success");
                        console.log(
                            "[Contacts.vue] retrieved contacts" + JSON.stringify(response.data)
                        );
                    })
                    .catch(() => {
                    });
            },
            changeContact(res) {
                let url = window.location.href.toString().split("/");
                let contactId = url[url.length - 1];
                if (contactId !== res) {
                    router.replace('/dashboard/contacts/' + res);
                    this.$root.$emit('changed contact card');
                    contactId = res;
                }
            },
        },
        created() {
            this.userId = this.$cookies.get("userId");
            this.getInbox();
        },
        mounted() {
            this.$root.$on("contacts updated", () => {
                console.log("received message");
                this.getInbox();
            })
        }
    }
</script>