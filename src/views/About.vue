<template>
    <div>
        <v-app-bar height="100" color="#f3b79a">
            <v-toolbar-title class="headline text-uppercase">
                <img src="../assets/logo.svg" alt="icon" width="120">
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text>
                <router-link to="/" style="color: white; text-decoration: none; font-weight: bold; padding: 10px">Home
                </router-link>
            </v-btn>
            <v-btn text>
                <router-link to="/about" style="color: white; text-decoration: none; font-weight: bold; padding: 10px">
                    About
                </router-link>
            </v-btn>
        </v-app-bar>
        <v-content>
            <h1>This is an About page!</h1>
        </v-content>
    </div>
</template>

