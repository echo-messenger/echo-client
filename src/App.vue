<template>
    <v-app>
        <!--    <v-app-bar app>-->
        <!--      <v-toolbar-title class="headline text-uppercase">-->
        <!--        <span>Vuetify</span>-->
        <!--        <span class="font-weight-light">MATERIAL DESIGN</span>-->
        <!--      </v-toolbar-title>-->
        <!--      <v-spacer></v-spacer>-->
        <!--      <v-btn-->
        <!--        text-->
        <!--        href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
        <!--        target="_blank"-->
        <!--      >-->
        <!--        <span class="mr-2">Latest Release</span>-->
        <!--      </v-btn>-->
        <!--    </v-app-bar>-->
        <router-view></router-view>
    </v-app>
    <!--  <router-view></router-view>-->
</template>

<script>
    import Vue from "vue";
    import Vuetify, {
        VApp, VAppBar, VToolbarTitle, VSpacer, VBtn, VCard, VRow, VCol, VContainer, VContent
    } from 'vuetify/lib';

    Vue.use(Vuetify, {
        components: {
            VApp,
            VAppBar,
            VToolbarTitle,
            VSpacer,
            VBtn,
            VCard, VRow, VCol, VContainer, VContent
        },
    });
    export default {
        name: 'App',
        data: () => ({
            //
        }),
    };
</script>
