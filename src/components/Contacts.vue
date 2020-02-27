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
                <div class="contacts_list">
                    <v-row v-for="(contact, index) in contacts" v-bind:key="index">
                        <v-list-item v-on:click="changeContact(contact.id)">
                            <v-list-item-content>
                                <v-list-item-title>{{ contact.firstName }}</v-list-item-title>
                                <v-divider></v-divider>
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
            contacts: [
                {
                    "id": "-1224066212",
                    "firstName": "shan",
                    "lastName": "mar",
                    "email": "shan@mar.com",
                    "hashedPassword": "1234",
                    "profilePicture": null
                },
                {
                    "id": "-1224066212",
                    "firstName": "spence",
                    "lastName": "mar",
                    "email": "shan@mar.com",
                    "hashedPassword": "1234",
                    "profilePicture": null
                },
                {
                    "id": "-1224066212",
                    "firstName": "emma",
                    "lastName": "mar",
                    "email": "shan@mar.com",
                    "hashedPassword": "1234",
                    "profilePicture": null
                },
                {
                    "id": "-1224066212",
                    "firstName": "emily",
                    "lastName": "mar",
                    "email": "shan@mar.com",
                    "hashedPassword": "1234",
                    "profilePicture": null
                },
                {
                    "id": "-1224066212",
                    "firstName": "ben",
                    "lastName": "mar",
                    "email": "shan@mar.com",
                    "hashedPassword": "1234",
                    "profilePicture": null
                },
                {
                    "id": "-1224066212",
                    "firstName": "mom",
                    "lastName": "mar",
                    "email": "shan@mar.com",
                    "hashedPassword": "1234",
                    "profilePicture": null
                },
                {
                    "id": "-1224066212",
                    "firstName": "dad",
                    "lastName": "mar",
                    "email": "shan@mar.com",
                    "hashedPassword": "1234",
                    "profilePicture": null
                },
                {
                    "id": "-1224066212",
                    "firstName": "po",
                    "lastName": "mar",
                    "email": "shan@mar.com",
                    "hashedPassword": "1234",
                    "profilePicture": null
                },
                {
                    "id": "-1224066212",
                    "firstName": "leslie",
                    "lastName": "mar",
                    "email": "shan@mar.com",
                    "hashedPassword": "1234",
                    "profilePicture": null
                },
                {
                    "id": "-1224066212",
                    "firstName": "tom",
                    "lastName": "mar",
                    "email": "shan@mar.com",
                    "hashedPassword": "1234",
                    "profilePicture": null
                },
                {
                    "id": "-1224066212",
                    "firstName": "ron",
                    "lastName": "mar",
                    "email": "shan@mar.com",
                    "hashedPassword": "1234",
                    "profilePicture": null
                },
                {
                    "id": "-1224066212",
                    "firstName": "andy",
                    "lastName": "mar",
                    "email": "shan@mar.com",
                    "hashedPassword": "1234",
                    "profilePicture": null
                },
                {
                    "id": "-1224066212",
                    "firstName": "donna",
                    "lastName": "mar",
                    "email": "shan@mar.com",
                    "hashedPassword": "1234",
                    "profilePicture": null
                },
                {
                    "id": "-1224066212",
                    "firstName": "april",
                    "lastName": "mar",
                    "email": "shan@mar.com",
                    "hashedPassword": "1234",
                    "profilePicture": null
                },
                {
                    "id": "-1224066212",
                    "firstName": "chris",
                    "lastName": "mar",
                    "email": "shan@mar.com",
                    "hashedPassword": "1234",
                    "profilePicture": null
                },
            ],
            userId: ""
        }),
        methods: {
            getContacts() {
                axios.get("https://echo-servlet.herokuapp.com/contacts/" + this.userId)
                    .then((response) => {
                        // this.contacts = response.data;
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
            this.getContacts();
        },
        mounted() {
            this.$root.$on("contacts updated", () => {
                console.log("received message");
                this.getContacts();
            })
        }
    }
</script>

<style>
    .contacts_list {
        /*align-self: center;*/
        position: fixed;
        min-height: 80%;
        max-height: 80%;
        min-width: 30%;
        max-width: 30%;
        padding: 10px;
        overflow-y: scroll;
        /*border-top: solid gray .5px;*/
    }
</style>