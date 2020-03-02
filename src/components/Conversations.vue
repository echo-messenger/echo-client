<template>
    <v-container fluid>
        <v-row>
            <v-col style="max-width: 300px;">
                <v-row align="center" justify="center" style="padding: 0 5px 0 5px">
                    <v-col>
                        <div class="font-weight-black headline">Conversations</div>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-col>
                        <router-link to="/dashboard/conversations/compose-message" style="text-decoration: none">
                            <v-icon style="color: black;">fas fa-edit</v-icon>
                        </router-link>
                    </v-col>
                </v-row>
                <div class="conversation-list">
                    <v-row v-for="(conv, index) in inbox" v-bind:key="index">
                        <v-list-item v-if="currentConversation === conv.conversationId"
                                     class="current-selection conv-list-item"
                                     v-on:click="changeConversation(conv.conversationId)">
                            <v-list-item-content>
                                <v-list-item-title v-if="conv.name.length < 20">{{ conv.name }}</v-list-item-title>
                                <v-list-item-title v-else>{{ conv.name.substring(0,20)+"..." }}</v-list-item-title>
                                <p class="prev">{{conv.lastSender}}: {{conv.lastMessage}} -- {{getDate(conv.timestamp)}}</p>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-else class="conv-list-item" v-on:click="changeConversation(conv.conversationId)">
                            <v-list-item-content>
                                <v-list-item-title v-if="conv.name.length < 20">{{ conv.name }}</v-list-item-title>
                                <v-list-item-title v-else>{{ conv.name.substring(0,20)+"..." }}</v-list-item-title>
                                <p class="prev">{{conv.lastSender}}: {{conv.lastMessage}} -- {{getDate(conv.timestamp)}}</p>
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
    import moment from "moment";

    export default {
        name: "Conversations",
        data: () => ({
            inbox: [],
            userId: "",
            currentConversation: ""
        }),
        methods: {
            getDate(date) {
                return moment(date).format("hh:mm");
            },
            getInbox() {
                return axios.get("http://localhost:8082/inboxes/" + this.userId)
                    .then((response) => {
                        console.log(response.data)
                        this.inbox = response.data;
                        this.$emit("success");
                    })
                    .catch(() => {
                    });
            },
            changeConversation(res) {
                let url = window.location.href.toString().split("/");
                let conversationId = url[url.length - 1];
                if (conversationId !== res) {
                    router.replace('/dashboard/conversations/messages/' + res);
                    this.$root.$emit('changed conversation');
                    conversationId = res;
                    this.currentConversation = conversationId
                }
            },
        },
        created() {
            this.userId = this.$cookies.get("userId");
            this.getInbox().then(() => {
                let url = window.location.href.toString().split("/");
                let last = url[url.length - 1];
                if (last === "conversations" && this.inbox.length > 0) {
                    this.currentConversation = this.inbox[0].conversationId;
                    router.replace('/dashboard/conversations/messages/' + this.currentConversation);
                    this.$root.$emit('changed conversation');
                } else if (url[url.length - 1] !== "conversations" && this.inbox[0].conversationId) {
                    this.currentConversation = last;
                }
            })

        },
        mounted() {
            this.$root.$on("conversation updated", () => {
                this.getInbox().then(() => {
                    let url = window.location.href.toString().split("/");
                    let last = url[url.length - 1];
                    if (last === "conversations" && this.inbox.length > 0) {
                        this.currentConversation = this.inbox[0].conversationId;
                        router.replace('/dashboard/conversations/messages/' + this.currentConversation);
                        this.$root.$emit('changed conversation');
                    } else if (url[url.length - 1] !== "conversations" && this.inbox[0].conversationId) {
                        this.currentConversation = last;
                    }
                })
            })
        }
    }
</script>

<style>
    .prev {
        font-size: 14px;
        color: #8d8d91;
    }

    .conversation-list {
        position: fixed;
        min-height: 600px;
        max-height: 600px;
        min-width: 287px;
        max-width: 287px;
        padding: 10px;
        padding-top: 20px;
        overflow-y: auto;
    }


    .current-selection {
        background-color: #f3b79a;
    }
</style>