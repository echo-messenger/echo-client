<template>
    <v-container>
        <v-simple-table align-self="center">
            <tr>
                <td>Name:</td>
                <td>{{contact.firstName}} {{contact.lastName}}</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td>{{contact.email}}</td>
            </tr>
        </v-simple-table>
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