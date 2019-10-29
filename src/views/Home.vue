<template>
    <div>
        <v-app-bar app height="100" color="#f3b79a">
            <v-toolbar-title class="headline text-uppercase">
                <img src="../assets/logo.png" alt="icon" width="50">
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text>
                <span class="mr-2"><router-link to="/">Home</router-link></span>
            </v-btn>
            <v-btn text>
                <span class="mr-2"><router-link to="/about">About</router-link></span>
            </v-btn>
        </v-app-bar>
        <v-content>
            <h1>This is a home page</h1>
            <v-btn text>
                <span class="mr-2"><router-link to="/dashboard">Get Started</router-link></span>
            </v-btn>
        </v-content>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data: () => ({}),
        methods: {},
        created() {

        }
    }
</script>

<style>
    .top-bar {
        display: flex;
        align-items: center;
        /*justify-content: space-between;*/
        background-color: #f3b79a;
        height: 110px;
        padding: 10px;
    }


</style>