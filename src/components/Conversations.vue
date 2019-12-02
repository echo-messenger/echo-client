<template>
    <v-container>
        <v-row>
            <v-col>
                <v-row>
                    <v-col>
                        <div>Conversations</div>
                    </v-col>
                    <v-col>
                        <router-link to="/dashboard/conversations/compose-message" style="text-decoration: none">
                            <v-icon>fas fa-edit</v-icon>
                        </router-link>
                    </v-col>
                </v-row>
                <v-row v-for="(conv, index) in inbox" v-bind:key="index">
<!--                    <router-link-->
<!--                            v-on:click="changeConversation(conv.conversationId)"-->
<!--                            :to="{ name: 'messages', params: { conversationid: conv.conversationId } }"-->
<!--                            style="text-decoration: none">-->
<!--                        {{ conv.name }}-->
<!--                    </router-link>-->
                    <div v-on:click="changeConversation(conv.conversationId)">
                        {{ conv.name }}
                    </div>
                </v-row>
            </v-col>
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
        name: "Conversations",
        data: () => ({
            inbox: [],
            userId: ""
        }),
        methods: {
            getInbox() {
                axios.get("http://localhost:8082/inboxes/" + this.userId)
                    .then((response) => {
                        this.inbox = response.data;
                        this.$emit("success");
                        console.log(
                            "[Conversations.vue] retrieved inbox" + JSON.stringify(response.data)
                        );
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
                }
            }
        },
        created() {
            this.userId = this.$cookies.get("userId");
            this.getInbox();
        },
        mounted() {
            this.$root.$on("added conversation", () => {
                console.log("received message");
                this.getInbox();
            })
        }
    }
</script>