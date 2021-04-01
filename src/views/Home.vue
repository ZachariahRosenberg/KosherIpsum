<template>
    <div class="home">
        <div class="container">
            <!-- TITLE -->
            <div class="section">
                <h1 class="primary-font">Kosher Ipsum</h1>
                <h4 class="secondary-font">This is our subtitle!</h4>
            </div>

            <!-- Catchline -->
            <div class="section">
                <h2 class="primary-font">
                    So you want a shot of pshat?
                </h2>
                <h4 class="secondary-font">
                    So you think you have some hotshot website that needs a bissell yiddish?  Well bubbeleh, a gut glik to you.
                </h4>
            </div>

            <!-- Options -->
            <div class="section">
                <IpsumOptions />
            </div>

            <!-- GENERATE TEXT -->
            <div class='section' v-if="showIpsumText">
                <ipsum-output></ipsum-output>
            </div>

        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import IpsumOptions from '@/components/IpsumOptions';
    import IpsumOutput  from '@/components/IpsumOutput';

    import { mapState } from 'vuex';

    export default {
        name: 'Home',

        components: {
            IpsumOptions,
            IpsumOutput
        },

        computed: mapState([
            'showIpsumText'
        ])
    }
</script>

<style lang="scss">

    .home {
    }
    .primary-font {
        color: #ffd966;
    }
    .secondary-font {
        color: white;
    }

    .container {
        display: grid;
        grid-template-columns: [gutter] 10% [main] auto [gutter2] 10%;
        grid-template-areas: "gutter main gutter2";
    }

    .section {
        grid-column-start: main;
        margin: 25px;
    }

    .gutter {
        grid-area: gutter;
        background-color: red;
    }
    .gutter2 {
        grid-area: gutter2;
        background-color: red;
    }
</style>