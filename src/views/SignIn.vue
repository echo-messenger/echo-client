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
                        <v-text-field v-model="email" :hint="emailError" persistent-hint
                                      placeholder="Email Address"></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field v-model="password" :hint="passwordError" persistent-hint type="password"
                                      placeholder="Password"></v-text-field>
                    </v-row>
                    <v-row style="padding-top: 5%">
                        <v-btn color="#f3b79a" v-on:click="signIn">
                            Sign In
                        </v-btn>
                    </v-row>
                    <v-row style="padding-top: 10%">
                        <router-link to="/sign-up" style="text-decoration: none;">
                            Sign Up
                        </router-link>
                    </v-row>
                </v-col>
                <v-col style="padding-top: 5%">
                    <img src="../assets/laptop.png" style="height: 500px; padding-right: 100px"/>
                </v-col>
            </v-row>
        </v-content>
    </div>
</template>

<script>
    import router from '../router';
    import axios from "axios/index";

    export default {
        name: "SignIn",
        data: () => ({
            email: "",
            password: "",
            emailMissing: false,
            passwordMissing: false,
            wrongEmail: false,
            wrongPassword: false,
            emailError: "",
            passwordError: ""
        }),
        methods: {
            checkEmailExists() {
                axios.get("https://echo-servlet.herokuapp.com/userE/" + this.email)
                    .then((res) => {
                        // console.log("res: " + JSON.stringify(res.data))
                        if (res.data === "") {
                            this.wrongEmail = true;
                            this.emailError = "No user found with this email";
                            return;
                        }
                        this.wrongEmail = false;
                        this.emailError = "";
                    }).catch(() => {
                    this.wrongEmail = true;
                    this.emailError = "No user found with this email";
                })
            },
            signIn() {
                this.emailMissing = this.email === "";
                this.emailError = this.email === "" ? "Required" : "";
                if (this.emailMissing) return;

                this.passwordMissing = this.password === "";
                this.passwordError = this.password === "" ? "Required" : "";
                if (this.passwordMissing) return;

                this.checkEmailExists();
                if (this.wrongEmail) return;


                axios.post("https://echo-servlet.herokuapp.com/signin", {
                    "email": this.email,
                    "plainPassword": this.password
                }).then((response) => {
                    if (response.data !== "") {
                        console.log("signed in: " + JSON.stringify(response.data));
                        this.$cookies.set("userId", response.data.id);
                        this.$cookies.set("firstName", response.data.firstName);
                        this.$cookies.set("lastName", response.data.lastName);
                        router.replace('/dashboard/conversations')
                    } else {
                        this.passwordError = "Password is incorrect"
                    }
                }).catch(() => {

                })
            }

        },
        created() {

        }
    }
</script>

<style>

</style>