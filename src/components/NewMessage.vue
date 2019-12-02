<template>
    <v-container>
        <v-row>
            <v-col>
                <v-combobox
                        v-model="selection"
                        :items="contacts"
                        label="To:"
                        placeholder="Type the name of a person"
                        multiple
                        append-outer-icon="mdi-checkbox-marked-circle"
                        v-on:click:append-outer="newConversation"
                ></v-combobox>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from "axios/index";
    import router from '../router';
    export default {
        name: "NewMessage",
        data: () => ({
            contacts: [],
            selection: "",
            convId: "",
            userId: "",
            firstName: "",
            lastName: ""
        }),
        methods: {
            getContacts() {
                axios.get("http://localhost:8082/contacts/" + this.userId)
                    .then((response) => {
                        response.data.map(user => {
                            let name = user.firstName + " " + user.lastName;
                            let val = user.id;
                            this.contacts.push({text: name, value: val});
                        });
                        this.$emit("success");
                        console.log(
                            "[NewMessage.vue] retrieved contacts" + JSON.stringify(this.contacts)
                        );
                    })
                    .catch(() => {
                    });
            },
            newConversation() {
                if (this.selection !== "") {
                    let users = this.selection.slice();
                    users.push({text: this.firstName + " " + this.lastName, value: this.userId});
                    let res = this.doesConversationExist(users);
                    if (res !== null) {
                        router.replace('/dashboard/conversations/messages/' + res)
                    } else {
                        let name = "";
                        for (let i = 0; i < users.length; i++) {
                            name += users[i].text;
                            if (i < users.length - 1) {
                                name += ", ";
                            }
                        }
                        axios.post("http://localhost:8082/conversation", {
                            name: name
                        }).then((response) => {
                            console.log(
                                "new conversation: " + JSON.stringify(response.data)
                            );
                            this.convId = response.data.id;
                            console.log("ID first print: " + this.convId);
                            console.log("ID second print: " + this.convId);
                            if (this.convId !== "") {
                                users.map(user => {
                                    axios.post("http://localhost:8082/inbox", {
                                        userId: user.value,
                                        conversationId: this.convId
                                    }).then((response) => {
                                        console.log(
                                            "[Conversations.vue] added to inbox" + JSON.stringify(response.data)
                                        );
                                    }).catch(() => {
                                        console.log("inbox addition error");
                                    });
                                });
                            }
                            this.convId = "";
                        }).then(() => {
                                this.$root.$emit('added conversation');
                            }
                        ).catch(() => {
                            console.log("create conversation error");
                        });
                    }
                }
            },
            doesConversationExist(users) {
                users = users.map(user => user.value);
                axios.post("http://localhost:8082/existing-conversation", {
                    userIds: users,
                }).then((response) => {
                    console.log(response.data)
                    return response.data;
                }).catch(() => {
                    console.log("");
                });
            }
        },
        created() {
            this.userId = this.$cookies.get("userId");
            this.firstName = this.$cookies.get("firstName");
            this.lastName = this.$cookies.get("lastName");
            this.getContacts();
        }
    }
</script>