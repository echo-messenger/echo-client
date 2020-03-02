<template>
    <v-container>
        <v-navigation-drawer
                v-if="conversation.group"
                v-model="drawer"
                :mini-variant="mini"
                permanent
                right
                app
                mini-variant-width="0"
                style="padding: 10px"
        >
            <v-text-field label="Name This Conversation"
                          append-outer-icon="mdi-checkbox-marked-circle"
                          v-on:click:append-outer="rename"
                          v-model="name"/>
            <div v-for="(user, key) in conversation.userNames" v-bind:key=key>{{user}}</div>
        </v-navigation-drawer>
        <v-row align="center" justify="center" class="chat-banner">
            <div>{{convName}}</div>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>

            <v-btn v-if="conversation.group" icon @click.stop="mini = !mini">
                <v-icon>mdi-alert-circle</v-icon>
            </v-btn>
        </v-row>
        <div class="chat-container" v-chat-scroll>
            <div class="message-content">
                <div v-for="(message, index) in messages" v-bind:key="index">
                    <div v-if="message.senderId===userId">
                        <div class="mine">
                            <div class="box-text">{{message.messageContent}}</div>
                            <div class="time">{{getDate(message.timestamp)}}</div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="yours">
                            <div class="box-text">{{message.messageContent}}</div>
                            <div class="time">{{getDate(message.timestamp)}}</div>
                        </div>
                    </div>
                </div>
                <div class="chat-input-form">
                    <input v-model="message" class="chat-input">
                    <button v-on:click="send">
                        <v-icon>mdi-arrow-up-circle-outline</v-icon>
                    </button>
                </div>
            </div>
        </div>
    </v-container>
</template>

<script>
    import axios from "axios/index";
    import SockJS from "sockjs-client";
    import Stomp from "webstomp-client";
    import moment from "moment";

    export default {
        name: "Messages",
        data: () => ({
            conversationId: "",
            conversation: {},
            messages: [],
            name: "",
            drawer: true,
            mini: true,
            message: "",
            userId: "",
            connected: false,
            convName: ""
        }),
        methods: {
            getConversation() {
                this.conversationId = this.$route.params.conversationid;
                axios.get("http://localhost:8082/conversation/" + this.conversationId)
                    .then((response) => {
                        this.conversation = response.data;
                        this.convName = this.conversation.name;
                        this.name = this.conversation.name;
                    }).catch(() => {

                });
            },
            rename() {
                axios.put("http://localhost:8082/conversation/" + this.conversationId, {
                    id: this.conversationId,
                    name: this.name
                }).then((response) => {
                    this.conversation = response.data;
                    this.convName = this.name;
                    this.$root.$emit('conversation updated');
                }).catch(() => {
                });
            },
            getMessages() {
                axios.get("http://localhost:8082/messages/" + this.conversationId)
                    .then((response) => {
                        this.messages = response.data;
                    }).catch(() => {

                });
            },
            send() {
                if (this.message !== "" && this.stompClient && this.stompClient.connected) {
                    let time = Date.now();
                    const msg = {
                        conversationId: this.conversationId,
                        senderId: this.userId,
                        messageContent: this.message,
                        timestamp: time
                    };
                    this.stompClient.send("/app/hello", JSON.stringify(msg), {});
                    this.$root.$emit('conversation updated');
                    this.message = "";
                }
            },
            connect() {
                this.socket = new SockJS("http://localhost:8082/gs-guide-websocket/");

                this.stompClient = Stomp.over(this.socket);
                this.stompClient.connect(
                    {},
                    () => {
                        this.connected = true;
                        this.stompClient.subscribe("/topic/greetings", tick => {
                            let newMessage = JSON.parse(tick.body);
                            if (newMessage.conversationId === this.conversationId) {
                                console.log(newMessage)
                                this.messages.push(newMessage);
                            }
                        });
                    },
                    error => {
                        console.log("ERROR: " + JSON.stringify(error));
                        this.connected = false;
                    }
                );
            },
            getDate(date) {
                return moment(date).format("hh:mm");
            },
        },
        created() {
            this.userId = this.$cookies.get('userId');
            this.getConversation();
            this.getMessages();
            this.connect();

        },
        mounted() {
            this.$root.$on("changed conversation", () => {
                console.log("changing conversation");
                this.getConversation();
                this.getMessages();
            })
        }
    }
</script>


<style>
    .container {
        padding: 0px;
    }

    .chat-banner {
        min-height: 80px;
        background: #FFFFFE;
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
        font-size: 15px;
        line-height: 18px;
        color: #2D313F;
        padding: 20px 25px;
        border-bottom: 1px solid #BDCCD7;
        border-radius: 0 6px 0 0;
    }

    .chat-container {
        align-self: center;
        position: relative;
        height: 515px;
        width: auto;
        padding: 10px;
        /*right: 0;*/
        overflow-y: scroll;
    }

    .message-content {
        border-radius: 7px;
        width: 100%;
        height: 100%;
        /*float: center;*/
    }

    .yours {
        text-align: left;
    }

    .yours .time {
        right: 0;
    }

    .mine {
        text-align: right;
    }

    .mine .time {
        left: 0;
    }

    .yours .box-text {
        background: #f0f2f4;
        display: inline-block;
        padding: 20px 15px;
        padding-right: 50px;
        font-size: 16px;
        color: #535357;
        border-radius: 7px;
        max-width: 60%;
        margin-top: 10px;
        text-align: left;
        position: relative;
        margin-bottom: 20px;
        word-wrap: break-word;
    }

    .mine .box-text {
        background: lightblue;
        display: inline-block;
        padding: 20px 15px;
        padding-right: 50px;
        font-size: 16px;
        color: #535357;
        border-radius: 7px;
        max-width: 60%;
        margin-top: 10px;
        text-align: left;
        position: relative;
        margin-bottom: 20px;
        word-wrap: break-word;
    }

    .mine .time {
        bottom: -25px;
        font-size: 13px;
        color: #939397;
        margin-top: -18px;
    }

    .yours .time {
        bottom: -25px;
        font-size: 13px;
        color: #939397;
        margin-top: -18px;
    }

    .chat-input {
        /*width: 100%;*/
        background: #FFFFFF;
        border: none;
        outline: none;
        resize: none;
        border-radius: 0 0 6px 0;
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
        font-size: 16px;
        color: #333;
        padding: 20px;

        margin-top: 5px;
    }

    .chat-input-form {
        width: 100%;
        background: #FFFFFF;
        display: flex;
        box-shadow: 0px -1px 0px rgba(189, 204, 215, 0.544362);
        bottom: 0;
        position: fixed;

        height: 75px;
        margin: 10px;
        padding: 20px 15px;
    }
</style>