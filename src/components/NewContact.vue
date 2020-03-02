<template>
    <v-container>
        <v-row>
            <v-col>
                <v-text-field
                        class="icon-color"
                        v-model="newEmail"
                        placeholder="email"
                        append-outer-icon="mdi-checkbox-marked-circle"
                        v-on:click:append-outer="newContact"
                ></v-text-field>
                <p style="color: red">{{errorMessage}}</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from "axios/index";
    import router from '../router';

    export default {
        name: "NewContact",
        data: () => ({
            newEmail: "",
            userId: "",
            newUserId: "",
            errorMessage: ""
        }),
        methods: {
            newContact() {
                if (this.newEmail !== "") {
                    axios.get("http://localhost:8082/userE/" + this.newEmail)
                        .then((response) => {
                            if (response.data === "") {
                                this.errorMessage = "No user with this email exists!";
                                return;
                            }
                            this.newUserId = response.data.id;
                        }).catch(() => {

                    }).then(() => {
                            axios.post("http://localhost:8082/contact", {
                                user1Id: this.userId,
                                user2Id: this.newUserId
                            }).then((res) => {
                                    if (res.data === "") {
                                        this.errorMessage = "This contact already exists!"
                                    } else {
                                        console.log("creating new contact: " + this.userId + ", " + this.newUserId);
                                        this.$root.$emit('contacts updated');
                                        router.replace('/dashboard/contacts/' + this.newUserId);
                                    }
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

<style>
    .icon-color .v-icon {
        color: #f3b79a;
    }
</style>