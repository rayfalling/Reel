<!--suppress HtmlUnknownTarget -->
<template>
    <div id="app">
        <div class="background" :style="{'background-color':bodyBackground}">
            <img class="background-image " :src="backgroundImage">
            <div :style="{'background-image':backgroundImage}" class="background-image-filter"/>
            <div v-if="config.background.blur" class="background-image-filter background-image-blur"/>
            <div v-if="config.background.opacity" class="background-image-filter background-image-opacity"/>
        </div>
        <Index/>
    </div>
</template>

<script>
    import Index from './components/Index.vue'

    export default {
        name: 'App',
        components: {
            Index
        },
        data() {
            return {
                backgroundImage: require('./assets/placeholder.jpg'),
                bodyBackground: '#000',
                config: {
                    background: {
                        blur: false,
                        opacity: false,
                    },
                    mode: "light"
                }
            }
        }
    }
</script>

<style>
    body {
        margin: 0;
        padding: 0;
        overflow: hidden !important;
    }

    #app {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
    }

    .background {
        z-index: -1;
        width: 100%;
        height: 100%;
        line-height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        overflow: hidden;
    }

    .background-image {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .background-image-filter {
        filter: unset;
        width: 120%;
        height: 120%;
        position: absolute;
        top: -10%;
        left: -10%;
    }

    .background-image-blur {
        backdrop-filter: blur(8px);
    }

    .background-image-opacity {
        backdrop-filter: opacity(30%);
    }
</style>
