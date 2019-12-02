<template>
    <div>Message with {{conversation.name}}</div>
</template>

<script>
    import axios from "axios/index";
    export default {
        name: "Messages",
        data: () => ({
            conversationId: "",
            conversation: {}
        }),
        methods: {
            getConversation() {
                this.conversationId = this.$route.params.conversationid;
                axios.get("http://localhost:8082/conversation/" + this.conversationId)
                    .then((response) => {
                        this.conversation = response.data;
                    }).catch(() => {

                });
            }
        },
        created() {
            this.getConversation();
        },
        mounted() {
            this.$root.$on("changed conversation", () => {
                console.log("changing conversation");
                this.getConversation();
            })
        }
    }
</script>