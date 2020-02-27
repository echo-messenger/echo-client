<template>
    <v-container>
<!--        <v-simple-table align-self="center">-->
<!--            <tr>-->
<!--                <td>Name:</td>-->
<!--                <td>{{contact.firstName}} {{contact.lastName}}</td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--                <td>Email:</td>-->
<!--                <td>{{contact.email}}</td>-->
<!--            </tr>-->
<!--        </v-simple-table>-->
        <v-card style="margin-top: 70px">
            <v-col class="center-stuff">
                <v-row align=center justify=center>
                    <v-list-item-avatar size="200px">
                        <v-img :src=contact.profilePicture></v-img>
                    </v-list-item-avatar>
                </v-row>
                <v-row align=center justify=space-around>
                    <v-col>Name:</v-col>
                    <v-col >{{contact.firstName}}</v-col>
                    <v-col>{{contact.lastName}}</v-col>
                </v-row>
                <v-row align=center justify=space-around>
                    <v-col>Email:</v-col>
                    <v-col >{{contact.email}}</v-col>
                </v-row>
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
            userId: ""
        }),
        methods: {
            getContact() {
                this.contactId = this.$route.params.contactId;
                axios.get("https://echo-servlet.herokuapp.com/user/" + this.contactId)
                    .then((response) => {
                        this.contact = response.data;
                        console.log(JSON.stringify(this.contact))
                    }).catch(() => {

                });
            },
        },
        created() {
            this.userId = this.$cookies.get('userId');
            this.getContact();
        },
        mounted() {
            this.$root.$on("changed contact card", () => {
                console.log("changing contact");
                this.getContact();
            })
        }
    }
</script>