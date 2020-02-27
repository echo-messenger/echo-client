<template>
    <v-container>
        <v-card style="margin-top: 70px">
            <v-col class="center-stuff">
                <v-row align=center justify=center>
                    <v-list-item-avatar size="200px">
                        <v-img :src=editedPhoto></v-img>
                    </v-list-item-avatar>
                </v-row>
                <v-row align=center justify=center>
                    <v-col>
                        <v-row align=center justify=center>
                            <v-btn v-if="!editPhotoF" outlined small v-on:click="editPhoto">Change Profile Picture
                            </v-btn>
                            <v-btn v-if="editPhotoF" outlined small v-on:click="savePhoto">Save Profile Picture</v-btn>
                            <v-btn v-if="editPhotoF" outlined small v-on:click="cancelPhotoChange">cancel</v-btn>
                        </v-row>
                        <v-row align=center justify=center>
                            <v-text-field v-if="editPhotoF" v-model="editedPhoto"></v-text-field>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row align=center justify=space-around>
                    <v-col>Name:</v-col>
                    <v-col v-if="!editNameF">{{firstName}}</v-col>
                    <v-col v-if="!editNameF">{{lastName}}</v-col>
                    <v-col v-if="editNameF">
                        <v-text-field v-model="firstName"></v-text-field>
                    </v-col>
                    <v-col v-if="editNameF">
                        <v-text-field v-model="lastName"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn v-if="!editNameF" outlined small v-on:click="editName">Edit</v-btn>
                        <v-btn v-if="editNameF" outlined small v-on:click="saveName">Save</v-btn>
                    </v-col>
                </v-row>
                <v-row align=center justify=space-around>
                    <v-col>Email:</v-col>
                    <v-col >
                        <div v-if="!editEmailF">{{email}}</div>
                        <v-text-field v-if="editEmailF" v-model="email"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn v-if="!editEmailF" outlined small v-on:click="editEmail">Edit</v-btn>
                        <v-btn v-if="editEmailF" outlined small v-on:click="saveEmail">Save</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-card>
    </v-container>
</template>

<script>
    import axios from "axios/index";

    export default {
        name: "Profile",
        data: () => ({
            user: {},
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            photo: "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
            editedPhoto: "",
            editNameF: false,
            editEmailF: false,
            editPhotoF: false,
            editPasswordF: false,
        }),
        methods: {
            getUser() {
                let userId = this.$cookies.get('userId');
                axios
                    .get("https://echo-servlet.herokuapp.com/user/" + userId)
                    .then((response) => {
                        this.user = response.data;
                        this.firstName = this.user.firstName;
                        this.lastName = this.user.lastName;
                        this.email = this.user.email;
                        this.password = this.user.hashedPassword;
                        this.photo = this.user.profilePicture;
                        this.editedPhoto = this.user.profilePicture;
                        this.$emit("success");
                    })
                    .catch(() => {
                    });
            },
            savePhoto() {
                this.editName();
                axios.put("https://echo-servlet.herokuapp.com/user/" + this.user.id, {
                    "userId": this.user.id,
                    "firstName": this.firstName,
                    "lastName": this.lastName,
                    "email": this.user.email,
                    "hashedPassword": this.password,
                    "profilePicture": this.editedPhoto
                }).then((response) => {
                    console.log(
                        "[Profile.vue] changed photo " + JSON.stringify(response.data)
                    );
                    this.editPhoto();
                    this.$root.$emit('profile updated');
                }).catch(() => {
                    console.log("save photo error");
                });
            },
            saveName() {
                this.editName();
                axios.put("https://echo-servlet.herokuapp.com/user/" + this.user.id, {
                    "userId": this.user.id,
                    "firstName": this.firstName,
                    "lastName": this.lastName,
                    "email": this.user.email,
                    "hashedPassword": this.password,
                    "profilePicture": this.photo
                }).then((response) => {
                    console.log(
                        "[Profile.vue] changed name " + JSON.stringify(response.data)
                    );
                    this.$root.$emit('profile updated');
                }).catch(() => {
                    console.log("save name error");
                });
            },
            saveEmail() {
                this.editEmail();
                axios.put("https://echo-servlet.herokuapp.com/user/" + this.user.id, {
                    userId: this.user.id,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.email,
                    hashedPassword: this.password,
                    profilePicture: this.photo
                }).then((response) => {
                    console.log(
                        "[Profile.vue] changed email " + JSON.stringify(response.data)
                    );
                    this.$root.$emit('profile updated');
                }).catch(() => {
                    console.log("save email error");
                });
            },
            cancelPhotoChange() {
                this.editedPhoto = this.photo;
                this.editPhoto();
            },
            editName() {
                this.editNameF = !this.editNameF;
            },
            editPhoto() {
                this.editPhotoF = !this.editPhotoF;
            },
            editEmail() {
                this.editEmailF = !this.editEmailF;
            },
        },
        created() {
            this.user = this.getUser()
        }
    }
</script>

<style>
    .center-stuff {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
    }
</style>