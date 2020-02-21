<template>
    <div>
        <v-layout>
            <v-row>
                <v-col align="center">
                    <v-list-item-avatar size="200px">
                        <v-img src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png"></v-img>
                    </v-list-item-avatar>
                    <v-layout justify-center>
                        <v-simple-table align-self="center">
                            <tr v-if="!editNameF">
                                <td>Name:</td>
                                <td>{{firstName}} {{lastName}}</td>
                                <td><v-btn outlined small v-on:click="editName">Edit</v-btn></td>
                            </tr>
                            <tr v-else>
                                <td>Name:</td>
                                <td><v-text-field v-model="firstName"></v-text-field></td>
                                <td><v-text-field v-model="lastName"></v-text-field></td>
                                <td><v-btn outlined small v-on:click="saveName">Save</v-btn></td>
                            </tr>
                            <tr v-if="!editEmailF">
                                <td>Email:</td>
                                <td>{{email}}</td>
                                <td><v-btn outlined small v-on:click="editEmail">Edit</v-btn></td>
                            </tr>
                            <tr v-else>
                                <td>Email:</td>
                                <td> <v-text-field v-model="email"></v-text-field></td>
                                <td><v-btn outlined small v-on:click="saveEmail">Save</v-btn></td>
                            </tr>
<!--                            <tr v-if="!editPasswordF">-->
<!--                                <td>Password:</td>-->
<!--                                <td>************</td>-->
<!--                                <td><v-btn outlined small v-on:click="editPassword">Edit</v-btn></td>-->
<!--                            </tr>-->
<!--                            <tr v-else>-->
<!--                                <td>Password:</td>-->
<!--                                <td><v-text-field v-model="password"></v-text-field></td>-->
<!--                                <td><v-btn outlined small v-on:click="savePassword">Save</v-btn></td>-->
<!--                            </tr>-->
                        </v-simple-table>
                    </v-layout>
                </v-col>
            </v-row>
        </v-layout>
    </div>
</template>

<script>
    import axios from "axios/index";

    export default {
        name: "Profile",
        data: () => ({
            user: {},
            firstName: "",
            lastName: "",
            email:"",
            password: "",
            editNameF: false,
            editEmailF: false,
            editPasswordF: false,
        }),
        methods: {
            getUser() {
                let userId = this.$cookies.get('userId');
                axios
                    .get("http://localhost:8082/user/" + userId)
                    .then((response) => {
                        this.user = response.data;
                        this.firstName = this.user.firstName;
                        this.lastName = this.user.lastName;
                        this.email = this.user.email;
                        this.password = this.user.password;
                        this.$emit("success");
                    })
                    .catch(() => {
                    });
            },
            saveName () {
                this.editName();
                axios.put("http://localhost:8082/user/" + this.user.id, {
                    "userId": this.user.id,
                    "firstName": this.firstName,
                    "lastName": this.lastName,
                    "email": this.user.email
                }).then((response) => {
                    console.log(
                        "[Profile.vue] changed name " + JSON.stringify(response.data)
                    );
                    this.$root.$emit('profile updated');
                }).catch(() => {
                    console.log("save name error");
                });
            },
            saveEmail () {
                this.editEmail();
                axios.put("http://localhost:8082/user/" + this.user.id, {
                    userId: this.user.id,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.email
                }).then((response) => {
                    console.log(
                        "[Profile.vue] changed email " + JSON.stringify(response.data)
                    );
                    this.$root.$emit('profile updated');
                }).catch(() => {
                    console.log("save email error");
                });
            },
            savePassword () {
                this.editPassword();
                // TODO
            },
            editName() {
                this.editNameF = !this.editNameF;
            },
            editEmail() {
                this.editEmailF = !this.editEmailF;
            },
            editPassword() {
                this.editPasswordF = !this.editPasswordF;
            }
        },
        created() {
            this.user = this.getUser()
        }
    }
</script>