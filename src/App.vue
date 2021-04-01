<template>
    <router-view/>
</template>

<style lang="scss">
#app {
    background-color: #3c78d8ff;
    font-family: 'Akaya Kanadaka', cursive;
    font-size: 1.5em;
    color: white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

body {
    margin: 0px;
}

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
</style>
