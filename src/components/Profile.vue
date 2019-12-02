<template>
    <div>
        <v-layout>
            <v-row>
                <v-col align="center">
                    <v-list-item-avatar size="200px">
                        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
                    </v-list-item-avatar>
                    <v-layout justify-center>
                        <v-simple-table align-self="center">
                            <tr>
                                <td>Name:</td>
                                <td>{{firstName}} {{lastName}}</td>
                                <td><v-btn outlined small>Edit</v-btn></td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{{email}}</td>
                                <td><v-btn outlined small>Edit</v-btn></td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td>************</td>
                                <td><v-btn outlined small>Edit</v-btn></td>
                            </tr>


                            <tr>
                                <td>Name:</td>
                                <td>
                                    <v-text-field v-model="firstName"></v-text-field>
                                    <v-text-field v-model="lastName"></v-text-field>
                                </td>
                                <td><v-btn outlined small>Edit</v-btn></td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td> <v-text-field v-model="email"></v-text-field></td>
                                <td><v-btn outlined small>Edit</v-btn></td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td><v-text-field v-model="password"></v-text-field></td>
                                <td><v-btn outlined small>Edit</v-btn></td>
                            </tr>
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
            password: ""
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
        },
        created() {
            this.user = this.getUser()
        }
    }
</script>