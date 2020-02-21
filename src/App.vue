<template>
    <v-app>
        <router-view></router-view>
    </v-app>
</template>

<script>
    import Vue from "vue";
    import Vuetify, {
        VApp, VAppBar, VToolbarTitle, VSpacer, VBtn, VCard, VRow, VCol,
        VContainer, VContent, VLayout, VNavigationDrawer, VListItem, VListItemAvatar,
        VListItemTitle, VDivider, VListItemContent, VTextField
    } from 'vuetify/lib';
    import VueChatScroll from "vue-chat-scroll";


    Vue.use(Vuetify, {
        components: {
            VApp, VAppBar, VToolbarTitle, VSpacer, VBtn,
            VCard, VRow, VCol, VContainer, VContent, VLayout,
            VNavigationDrawer, VListItem, VListItemAvatar,
            VListItemTitle, VDivider, VListItemContent, VTextField,

        },
    });
    Vue.use(VueChatScroll);
    export default {
        name: 'App',
        data: () => ({

        }),
        created() {

        }
    };
</script>

<style>
    html {
        width: 100%;
        height: 100%;
        clip: auto;
        position: absolute;
        overflow: hidden;
    }
</style>
