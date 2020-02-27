<template>
    <v-container>
        <v-navigation-drawer
                v-model="drawer"
                :mini-variant="mini"
                permanent
                right
                app
                mini-variant-width="0"
        >
            <v-text-field label="Name This Conversation"
                          append-outer-icon="mdi-checkbox-marked-circle"
                          v-on:click:append-outer="rename"
                          v-model="name"/>
            <div v-for="(user, key) in conversation.userNames" v-bind:key=key>{{user}}</div>
        </v-navigation-drawer>
        <v-row>
            <v-col>
                <div>{{conversation.name}}</div>
            </v-col>
            <v-col>
                <v-btn icon @click.stop="mini = !mini">
                    <v-icon>mdi-alert-circle</v-icon>
                </v-btn>
            </v-col>
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
                <div class="message-form">
                    <input v-model="message">
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
            connected: false
        }),
        methods: {
            getConversation() {
                this.conversationId = this.$route.params.conversationid;
                axios.get("https://echo-servlet.herokuapp.com/conversation/" + this.conversationId)
                    .then((response) => {
                        this.conversation = response.data;
                        this.name = this.conversation.name;
                    }).catch(() => {

                });
            },
            rename() {
                axios.put("https://echo-servlet.herokuapp.com/conversation/" + this.conversationId, {
                    id: this.conversationId,
                    name: this.name
                }).then((response) => {
                    this.conversation = response.data;
                    this.$root.$emit('conversation updated');
                }).catch(() => {

                });
            },
            getMessages() {
                axios.get("https://echo-servlet.herokuapp.com/messages/" + this.conversationId)
                    .then((response) => {
                        this.messages = response.data;
                    }).catch(() => {

                });
            },
            send() {
                console.log("Send message:" + this.message);
                if (this.stompClient && this.stompClient.connected) {
                    let time = Date.now();
                    const msg = {
                        conversationId: this.conversationId,
                        senderId: this.userId,
                        messageContent: this.message,
                        timestamp: time
                    };
                    console.log(JSON.stringify(msg));
                    this.stompClient.send("/app/hello", JSON.stringify(msg), {});
                    this.message = "";
                }
            },
            connect() {
                this.socket = new SockJS("https://echo-servlet.herokuapp.com/gs-guide-websocket/");

                this.stompClient = Stomp.over(this.socket);
                this.stompClient.connect(
                    {},
                    frame => {
                        this.connected = true;
                        this.stompClient.subscribe("/topic/greetings", tick => {
                            let newMessage = JSON.parse(tick.body);
                            if (newMessage.conversationId === this.conversationId) {
                                console.log(frame);
                                // console.log("TICKING " + JSON.stringify(newMessage));
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

    .chat-container {
        align-self: center;
        position: fixed;
        min-height: 66%;
        max-height: 66%;
        min-width: 66%;
        max-width: 66%;
        padding: 10px;
        overflow-y: scroll;
        border-top: solid gray .5px ;
    }

    .message-content {
        border-radius: 7px;
        width: 100%;
        height: 100%;
        float: center;
        /* position: relative; */
        /*line-height: 5px;*/
        /* margin-left: 15px;*/
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

    .message-form {
        height: 75px;
        margin: 10px;
        padding: 20px 15px;
        bottom: 0;
        position: fixed;
    }

    .message-form input {
        border-color: #939397;
        border-style: solid;
        border-radius: 5px;
        font-size: 16px;
        margin-top: 5px;
    }
</style>