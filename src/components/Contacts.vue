<template>
    <v-container fluid>
        <v-row>
            <v-col style="max-width: 300px;">
                <v-row align="center" justify="center" style="padding: 0 5px 0 5px">
                    <v-col>
                        <div class="font-weight-black headline">Contacts</div>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-col>
                        <router-link to="/dashboard/contacts/add-contact" style="text-decoration: none;">
                            <v-icon style="color: black;">mdi-plus-circle</v-icon>
                        </router-link>
                    </v-col>
                </v-row>
                <div v-if="noContacts" >
                    You have no contacts :(
                </div>
                <div v-else class="contacts_list">
                    <v-row v-for="(contact, index) in contacts" v-bind:key="index">
                        <v-list-item v-if="currentContact === contact.id" class="current-selection contact-list-item" v-on:click="changeContact(contact.id)">
                            <v-list-item-avatar>
                                <v-img :src=contact.profilePicture></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{ contact.firstName }} {{contact.lastName}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-else class="contact-list-item" v-on:click="changeContact(contact.id)">
                            <v-list-item-avatar>
                                <v-img :src=contact.profilePicture></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{ contact.firstName }} {{contact.lastName}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-row>
                </div>
            </v-col>
            <v-divider style="min-height: 600px" vertical></v-divider>
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
            noContacts: false,
            contacts: [],
            userId: "",
            currentContact: ""
        }),
        methods: {
            getContacts() {
                axios.get("http://localhost:8082/contacts/" + this.userId)
                    .then((response) => {
                        this.contacts = response.data;
                        if (response.data > 0) {
                            this.noContacts = false;
                        }
                        this.$emit("success");
                    })
                    .catch(() => {});
            },
            changeContact(res) {
                let url = window.location.href.toString().split("/");
                let contactId = url[url.length - 1];
                if (contactId !== res) {
                    router.push('/dashboard/contacts/' + res);
                    this.$root.$emit("changed contact card");
                    contactId = res;
                    this.currentContact = contactId;
                }
            },
        },
        created() {
            let url = window.location.href.toString().split("/");
            this.currentContact = url[url.length - 1];
            this.userId = this.$cookies.get("userId");
            this.getContacts();
        },
        mounted() {
            this.$root.$on("contacts updated", () => {
                this.getContacts();
            })
        }
    }
</script>

<style>
    .contacts_list {
        position: fixed;
        min-height: 600px;
        max-height: 600px;
        min-width: 287px;
        max-width: 287px;
        padding: 10px;
        overflow-y: auto;
    }

    .contact-list-item {
        border-bottom: #000000;
    }

    .current-selection {
        background-color: #f3b79a;
    }
</style>