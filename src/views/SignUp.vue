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
                        <v-text-field v-model="firstName" :hint="firstNameError" persistent-hint
                                      placeholder="First Name"></v-text-field>
                        <v-text-field v-model="lastName" :hint="lastNameError" persistent-hint
                                      placeholder="Last Name"></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field v-model="email" :hint="emailError" persistent-hint
                                      placeholder="Email Address"></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field v-model="password" :hint="passwordError" persistent-hint type="password"
                                      placeholder="Password"></v-text-field>
                    </v-row>
                    <v-row style="padding-top: 5%">
                        <v-btn color="#f3b79a" v-on:click="createAccount">
                            Sign Up
                        </v-btn>
                    </v-row>
                    <v-row style="padding-top: 10%">
                        <router-link to="/sign-in" style="text-decoration: none;">
                            Sign In
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
    import axios from "axios/index";
    import router from '../router'

    export default {
        name: "SignUp",
        data: () => ({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            firstNameError: "",
            lastNameError: "",
            emailError: "",
            passwordError: "",
            emailExists: false
        }),
        methods: {
            createAccount() {
                this.firstNameError = this.firstName === "" ? "Required" : "";
                this.lastNameError = this.lastName === "" ? "Required" : "";
                this.emailError = this.email === "" ? "Required" : "";
                this.passwordError = this.password === "" ? "Required" : "";

                if (this.firstName === "" || this.lastName === "" || this.email === "" || this.password === "") {
                    return;
                }

                axios.get("http://localhost:8082/userE/" + this.email.toLowerCase())
                    .then((response) => {
                        this.emailError = response.data === "" ? "" : "Account with this email already exists";
                        if (response.data === "") {
                            axios.post("http://localhost:8082/user", {
                                "firstName": this.firstName,
                                "lastName": this.lastName,
                                "email": this.email.toLowerCase(),
                                "plainPassword": this.password,
                                "profilePicture": "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png"
                            }).then((response) => {
                                console.log(
                                    "new user: " + JSON.stringify(response.data)
                                );
                                this.$cookies.set("userId", response.data.id);
                                this.$cookies.set("firstName", response.data.firstName);
                                this.$cookies.set("lastName", response.data.lastName);
                                router.replace('/dashboard/conversations')
                            }).catch(() => {
                                console.log("user creation error");
                            });
                        }
                    });
            }
        },
        created() {

        }
    }
</script>
