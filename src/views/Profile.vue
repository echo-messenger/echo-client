<template>
    <div>
        <div>
            this be my profile
            {{user}}
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "Profile",
        data: () => ({
            user: null
        }),
        methods: {
            getUser() {
                axios
                    .get("http://localhost:8082/user/1905173657")
                    .then((response) => {
                        this.user = response.data;
                        this.$emit("success");
                    })
                    .catch(() => {
                    });
            },
        },
        created() {
            this.user = this.getUser()
        }
    }
</script>