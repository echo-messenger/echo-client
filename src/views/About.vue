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
            <h1>This is an about page</h1>
        </v-content>
    </div>
</template>
