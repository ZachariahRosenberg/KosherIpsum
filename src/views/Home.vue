<template>
    <div class="home">
        <div class="container">

            <div class="gutter">gutter</div>
            <div class="section">
                <h1 class="primary-font">Kosher Ipsum</h1>
                <h4 class="secondary-font">This is our subtitle!</h4>
            </div>
            <div class="gutter2">gutter</div>

            <div class="section">
                <h1 class="primary-font">
                    This is our large header
                    <br />
                    Text? Don’t you love it?
                </h1>
                <h4 class="secondary-font">
                    I know Right?
                    It's mamash the best...
                </h4>
            </div>

            <div class="section">
                <div class='row'>
                    <input type="number" id="quantity" name="quantity" min="1" max="5" />
                    <p>Paragraphs</p>
                </div>
                <div class='row'>
                    <input type="radio" id="radioLong" />
                    <p>Long</p>
                    <input type="radio" id="radioMedium" />
                    <p>Medium</p>
                    <input type="radio" id="radioShort" />
                    <p>Short</p>
                </div>
                <div class='row'>
                    <input type="checkbox" id='checkOne' />
                    <p>This is option "one"</p>
                </div>
                <div class='row'>
                    <input type="checkbox" id='checkTwo' />
                    <p>This is option "two"</p>
                </div>
            </div>

            <div class='section'>
                <button type="button">
                    <span>Generate</span>
                </button>
            </div>

        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'Home',
        components: {
            HelloWorld
        }
    }
</script>

<style lang="scss" scoped>
    .home {
        background-color: #3c78d8ff;
        color: white;
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
    }

    .gutter {
        grid-area: gutter;
        background-color: red;
    }
    .gutter2 {
        grid-area: gutter2;
        background-color: red;
    }

    .row {
        display: flex;
        justify-content: center;
        align-items: baseline;

        > * {
            margin: 5px
        }
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
</style>