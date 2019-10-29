<template>
    <div class="page-container">
        <h1>Echo Messenger</h1>
        <div><router-link to="/dashboard">Dashboard</router-link></div>
        <div><router-link to="/profile">Profile</router-link></div>
        <div><router-link to="/">Home</router-link></div>
    </div>
</template>

<script>

    export default {
        name: "Dashboard",
        data: () => ({

        }),
        methods: {

        },
        created() {

        }
    }
</script>

<style>

</style>