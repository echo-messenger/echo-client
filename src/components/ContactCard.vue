<template>
    <v-container>
        <v-card style="margin-top: 70px">
            <v-col class="center-stuff">
                <v-row align=center justify=center>
                    <v-list-item-avatar size="200px">
                        <v-img :src=contact.profilePicture></v-img>
                    </v-list-item-avatar>
                </v-row>
                <v-row align=center justify=space-around>
                    <v-col>Name: {{contact.firstName}} {{contact.lastName}}</v-col>
                </v-row>
                <v-row align=center justify=space-around>
                    <v-col>Email: {{contact.email}}</v-col>
                </v-row>
<!--                <v-row>-->
<!--                    <v-btn v-if="userId !== currentContact"-->
<!--                           color="#f3b79a" small-->
<!--                           v-on:click="goToMessages(contact.id)">Message {{contact.firstName}}</v-btn>-->
<!--                </v-row>-->
            </v-col>
        </v-card>
    </v-container>
</template>

<script>
    import axios from "axios/index";

    export default {
        name: "ContactCard",
        data: () => ({
            contactId: "",
            contact: {},
            name: "",
            userId: "",
            currentContact: ""
        }),
        methods: {
            getContact() {
                this.contactId = this.$route.params.contactId;
                axios.get("http://localhost:8082/user/" + this.contactId)
                    .then((response) => {
                        this.contact = response.data;
                    }).catch(() => {
                });
            },
            goToMessages(userId) {
                // router.push('/dashboard/contacts/' + res);
                console.log(userId)
            }
        },
        created() {
            let url = window.location.href.toString().split("/");
            this.currentContact = url[url.length - 1];
            this.userId = this.$cookies.get('userId');
            this.getContact();
        },
        mounted() {
            this.$root.$on("changed contact card", () => {
                let url = window.location.href.toString().split("/");
                this.currentContact = url[url.length - 1];
                this.userId = this.$cookies.get('userId');
                this.getContact();
            })
        }
    }
</script>