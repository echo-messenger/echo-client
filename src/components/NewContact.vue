<template>
    <v-container>
        <v-row>
            <v-col>
                <v-text-field
                        v-model="newEmail"
                        placeholder="email"
                        append-outer-icon="mdi-checkbox-marked-circle"
                        v-on:click:append-outer="newContact"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from "axios/index";

    export default {
        name: "NewContact",
        data: () => ({
            newEmail: "",
            userId: "",
            newUserId: ""
        }),
        methods: {
            newContact() {
                if (this.newEmail !== "") {
                    axios.get("https://echo-servlet.herokuapp.com/userE/" + this.newEmail)
                        .then((response) => {
                            this.newUserId = response.data.id;
                        }).catch(() => {

                    }).then(() => {
                            console.log("creating new contact: " + this.userId + ", " + this.newUserId);
                            axios.post("https://echo-servlet.herokuapp.com/contact", {
                                user1Id: this.userId,
                                user2Id: this.newUserId
                            }).then(() => {
                                    this.$root.$emit('contacts updated');
                                }
                            ).catch(() => {
                                console.log("create contact error");
                            });
                        }
                    )
                }
            },
        },
        created() {
            this.userId = this.$cookies.get("userId");
        }
    }
</script>