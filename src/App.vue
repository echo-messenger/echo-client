<template>
    <div class="page-container">
        <div>
            hello! this is from the frontend
        </div>
        <div>
            {{test}}
        </div>
    </div>
</template>

<script>
    import axios from "axios";


    export default {
        name: "App",
        data: () => ({
            test: ""
        }),
        methods: {

            getTest() {
                axios
                    .get("http://localhost:8080/")
                    .then((response) => {
                        this.test = response.data;
                        console.log("success");
                        this.$emit("success");
                        console.log(this.test)
                    })
                    .catch(() => {
                        console.log("catch");
                    });
            },
        },
        created() {
            this.getTest()

        }
    };
</script>

<style lang="scss" scoped>

</style>

