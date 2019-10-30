<template>
    <div>
        <v-app-bar height="100" color="#f3b79a">
            <v-toolbar-title class="headline text-uppercase">
                <img src="../assets/logo.svg" alt="icon" width="120">
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text>
               <router-link to="/" style="color: white; text-decoration: none; font-weight: bold; padding: 10px">Home</router-link>
            </v-btn>
            <v-btn text>
                <router-link to="/about" style="color: white; text-decoration: none; font-weight: bold; padding: 10px">About</router-link>
            </v-btn>
        </v-app-bar>
        <v-content>
            <v-row style="padding-left: 15%" wrap>
                <v-col style="padding-top: 7%">
                    <v-row>
                        <h1 class="display-4 font-weight-thin">
                            Echo
                        </h1>
                    </v-row>
                    <v-row style="padding-top: 5%">
                        <p class="headline font-weight-regular">
                            collaborate | inspire | accomplish
                        </p>
                    </v-row>
                    <v-row style="padding-top: 10%">
                        <v-btn color="#f3b79a">
                            <router-link to="/dashboard" style="color: white; text-decoration: none; font-weight: bold; padding: 10px">
                                Get Started
                            </router-link>
                        </v-btn>
                    </v-row>
                </v-col>
                <v-col style="padding-top: 5%">
                    <img src="../assets/laptop.png" height="70%"/>
                </v-col>
            </v-row>
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
