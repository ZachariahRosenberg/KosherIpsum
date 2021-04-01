<template>
    <div class="home">
        <div class="container">
            <!-- TITLE -->
            <div class="gutter">gutter</div>
            <div class="section">
                <h1 class="primary-font">Kosher Ipsum</h1>
                <h4 class="secondary-font">This is our subtitle!</h4>
            </div>
            <div class="gutter2">gutter</div>

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
                <IpsumOptions @set-output-text='setOutputText' />
            </div>

            <!-- GENERATE TEXT -->
            <div class='section' v-if="showOutput">
                <ipsum-output></ipsum-output>
            </div>

        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import IpsumOptions from '@/components/IpsumOptions';
    import IpsumOutput  from '@/components/IpsumOutput';

    export default {
        name: 'Home',

        components: {
            IpsumOptions,
            IpsumOutput
        },

        methods: {
            setOutputText(text){
                this.outputText = text;
                this.showOutput = true;
            }
        },

        data() {
            return {
                showOutput: false,
                outputText: ""
            }
        },

        computed: {

        }
    }
</script>

<style lang="scss">

    h1 {
        font-size: 4em;
        margin: 10px;
    }

    h2 {
        font-size: 3em;
        margin: 10px;
    }

    h4 {
        font-size: 1.5em;
        margin: 10px;
    }

    button {
        position: relative;
        display: block;
        background-color: #f1c232ff;
        margin: 30px auto;
        padding: 0;
        overflow: hidden;
        outline: none;
        border-width: 0;
        border-radius: 2px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
        width: 250px;

        transition: background-color .3s;

        :hover, :focus {
            background-color: #d5ac2eff;
        }

        > * {
            position: relative;
        }

        span {
            display: block;
            padding: 12px 24px;
            color: white;
            font-size: 1.5em;
            font-family: 'Akaya Kanadaka', cursive;
        }

        :before {
            content: "";

            position: absolute;
            top: 50%;
            left: 50%;

            display: block;
            width: 0;
            padding-top: 0;

            border-radius: 100%;

            background-color: rgba(236, 240, 241, .3);

            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }

        :active:before {
            width: 120%;
            padding-top: 120%;
            
            transition: width .2s ease-out, padding-top .2s ease-out;
        }
    }

    .home {
        background-color: #3c78d8ff;
        color: white;
        font-family: 'Akaya Kanadaka', cursive;
        font-size: 1.5em;
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